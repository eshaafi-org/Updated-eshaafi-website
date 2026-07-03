/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL, headers } from "@/helper/CONST";
import { isSafari } from "@/helper/notifications";
import { AGORA_CONFIG } from "@/components/VideoCall/agoraConfig";

const AgoraVideoCall = dynamic(
  () => import("@/components/VideoCall/AgoraVideoCall"),
  { ssr: false }
);

/**
 * Dedicated video-call page: /call/[appointmentId]
 *
 * Every "accept call" path (in-app popup, service-worker notification click,
 * Timer's Join button) simply navigates here. This page has ONE job: fetch a
 * fresh Agora token from the backend and join the call. No URL-param dances,
 * no sessionStorage handoffs, no modal races — the backend is the single
 * source of truth for whether a call is live.
 *
 *  - Doctor is calling / consultation active  -> token returned -> join.
 *  - No active call (stale link, reload after end) -> backend errors -> show
 *    a clear message with a Retry and a Back-to-appointment button.
 */
export default function CallPage() {
  const router = useRouter();
  const { id } = router.query;
  const appointmentId = Array.isArray(id) ? id[0] : id;

  const [token, setToken] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isFetching = useRef(false);

  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const { profiles } = useSelector((state: any) => state.getProfilesListReducer);
  const currentProfile = profiles?.[0];

  // Fix tokens corrupted by URL decoding (spaces instead of +)
  const fixCorruptedToken = (raw?: string | null): string | null => {
    if (!raw) return null;
    return raw.replace(/ /g, "+");
  };

  // Agora RTC token format: '006' + 32-char appId + rest
  const getAppIdFromToken = (raw?: string | null): string | null => {
    if (!raw) return null;
    if (raw.startsWith("006") && raw.length > 35) return raw.slice(3, 35);
    return null;
  };

  const sanitizeAppId = (raw?: string | null): string | null => {
    if (!raw || typeof raw !== "string" || raw.trim() === "") return null;
    const onlyHex = raw.replace(/[^0-9a-fA-F]/g, "").toLowerCase();
    if (onlyHex.length >= 32) return onlyHex.slice(0, 32);
    return null;
  };

  // Valid Agora RTC tokens start with '006' and are 100+ chars.
  const isTokenValid = (raw?: string | null): boolean =>
    !!raw && raw.startsWith("006") && raw.length >= 100;

  const applyToken = (rawToken: string, rawAppId?: string | null) => {
    const fixedToken = fixCorruptedToken(rawToken) as string;
    const finalAppId =
      sanitizeAppId(rawAppId) || sanitizeAppId(getAppIdFromToken(fixedToken));
    setAppId(finalAppId);
    setToken(fixedToken);
    // Stop any ringtone / popup still active anywhere in the app.
    window.dispatchEvent(new Event("call_started"));
  };

  const joinCall = async () => {
    if (!appointmentId || isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    setError(null);

    // 1) Prefer the token delivered in the call notification itself (stored by
    //    every producer as incomingCallData). This is the path that has always
    //    worked; the backend fetch below is the fallback.
    try {
      const stored = sessionStorage.getItem("incomingCallData");
      if (stored) {
        const data = JSON.parse(stored);
        const storedToken = fixCorruptedToken(data?.agoraToken);
        if (data?.appointmentId === appointmentId && isTokenValid(storedToken)) {
          applyToken(storedToken as string, data?.appId);
          setLoading(false);
          isFetching.current = false;
          return;
        }
      }
    } catch (e) {
      /* fall through to backend */
    }

    // 2) Fallback: ask the backend for a token.
    try {
      const response = await axios.get(
        `${BASE_URL}/appointment/${appointmentId}/startConsultation`,
        { headers: headers() }
      );

      const rawToken = response.data?.response?.token;
      if (!rawToken) throw new Error("No token received from backend");

      applyToken(rawToken, response.data?.response?.appId);
    } catch (err: any) {
      console.error("[CallPage] Failed to get call token:", err?.response?.data || err);
      setError(
        err?.response?.data?.response?.message ||
          "Could not connect to the call. The doctor may not be calling right now."
      );
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    if (!router.isReady || !appointmentId) return;
    joinCall();
  }, [router.isReady, appointmentId]);

  const handleCallEnd = () => {
    setToken(null);
    setAppId(null);
    try {
      sessionStorage.removeItem("incomingCallData");
    } catch (e) {
      /* ignore */
    }
    window.dispatchEvent(new Event("call_dismissed"));
    router.replace(`/appointments/${appointmentId}`);
  };

  return (
    <>
      <Head>
        <title>eShaafi | Video Call</title>
      </Head>

      {token && (!isSafari() || appId) ? (
        <div style={{ position: "fixed", inset: 0, zIndex: 1050, background: "#000" }}>
          <AgoraVideoCall
            appId={isSafari() ? (appId as string) : AGORA_CONFIG.APP_ID}
            channelName={appointmentId as string}
            token={token}
            onCallEnd={handleCallEnd}
            profileId={currentProfile?.profileId || userAuth?.uuid || "0"}
            appointmentId={appointmentId || ""}
          />
        </div>
      ) : (
        <section
          className="container"
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "4px solid #d1d5db",
                  borderTopColor: "#009B94",
                  borderRadius: "50%",
                  animation: "spin 0.9s linear infinite",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "#374151", fontWeight: 600 }}>Connecting to your call…</p>
            </>
          ) : (
            <>
              <p style={{ color: "#374151", fontWeight: 600, maxWidth: 420 }}>{error}</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={joinCall}
                  style={{
                    background: "#009B94",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Retry
                </button>
                <button
                  onClick={() => router.replace(`/appointments/${appointmentId}`)}
                  style={{
                    background: "#e5e7eb",
                    color: "#374151",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Back to Appointment
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
