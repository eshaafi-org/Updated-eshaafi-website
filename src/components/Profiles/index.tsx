/* eslint-disable react-hooks/exhaustive-deps */
import style from "./Profile.module.scss";
import { useEffect, useReducer, memo } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaUserCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import AddProfile from "./AddProfile.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getProfilesData } from "./profilesSlicer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// import { AppDispatch } from "@/redux/store";
// import
export const logout = async (dispatch: any, router: any, userAuth: any) => {
  await axios
    .post(BASE_URL + `/auth/signOut`, {
      access_token: userAuth.AccessToken,
      type: 1,
      uuid: userAuth.uuid,
    })
    .then((res) => {
      dispatch({ type: "loginModalSlice/clearAuth" });
      localStorage.removeItem("user");
      router.push("/");
    })
    .catch((err) => {
      dispatch({ type: "loginModalSlice/clearAuth" });
      localStorage.removeItem("user");
    });
};
// reducer for state managements
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LOADING_FALSE": {
      return {
        ...state,
        loading: false,
      };
    }
    case "RESPONSE": {
      return {
        ...state,
        loading: false,
        profiles: [action.payload.self, ...action.payload.profiles],
      };
    }
    case "SET_PROFILES": {
      return {
        ...state,
        profiles: action.payload,
      };
    }

    default: {
      return {
        [action.target.name]: action.target.value,
      };
    }
  }
};
const Profiles = memo(function ProfilesComponent({
  patient,
  setPatient,
  styling = style.profilesContainer,
  deleteProfile,
  setEdit,
}: {
  patient: any;
  setPatient: any;
  styling?: any;
  deleteProfile?: any;
  setEdit?: any;
}) {
  const router = useRouter();
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const { profiles, loading } = useSelector(
    (state: any) => state.getProfilesListReducer
  );
  const [states, setStates] = useReducer(reducer, {
    loading: false,
    profiles: [],
  });
  // getting profiles details
  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(getProfilesData());
    }
    // console.log(profiles);
    // setPatient(profiles[0]);
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      const initialProfile = profiles[0];
      const initialProfileId = initialProfile?.profileId || initialProfile?.patientId || "";
      setPatient({
        ...initialProfile,
        profileId: initialProfileId,
        patientId: initialProfileId,
      });
    }
  }, [profiles]);

  return (
    <section className={styling === "" ? style.profilesContainer : styling}>
      {loading ? (
        <div
          className="d-flex col-gap-1 mt-4 row-gap-1"
          style={{ flexDirection: styling ? "row" : "column" }}
        >
          <p className="d-flex flex-column card-text placeholder-glow justify-content-center align-items-start row-gap-1">
            <span
              className="placeholder col-7"
              style={{ width: 60, height: 60, borderRadius: 50 }}
            ></span>
            {!styling ? <span className="placeholder col-12"></span> : ""}
          </p>
          <p className="d-flex flex-column card-text placeholder-glow justify-content-center align-items-start row-gap-1">
            <span
              className="placeholder col-7"
              style={{ width: 60, height: 60, borderRadius: 50 }}
            ></span>
            {!styling ? <span className="placeholder col-12"></span> : ""}
          </p>
        </div>
      ) : (
        <ul className={style.profileList}>
          {profiles.map((itm: any, indx: any) => (
            <li key={indx}>
              <input
                type="radio"
                className={style.btnCheck}
                name="profile"
                id={itm.profileId}
                value={itm.profileId}
                onClick={(e: any) => {
                  const selectedProfileId = e.target.value;
                  const isSameProfile =
                    patient?.patientId === selectedProfileId ||
                    patient?.profileId === selectedProfileId;

                  if (isSameProfile) {
                    setPatient({
                      profileId: "",
                      patientId: "",
                      name: "",
                      relation: "",
                      location: "",
                      gender: "",
                      dob: "",
                      phone_no: "",
                    });
                  } else {
                    setPatient({
                      profileId: selectedProfileId,
                      patientId: selectedProfileId,
                      name: itm.name,
                      relation: itm.relation,
                      location: itm.location,
                      gender: itm.gender,
                      dob: itm.dob,
                      phone_no: itm.phone_no === undefined ? "" : itm.phone_no,
                      url: itm.url,
                    });
                    if (setEdit) {
                      setEdit(false);
                    }
                  }
                }}
              />
              <label
                className={`${
                  style.labelrdioclassProfile
                } d-flex flex-column justify-content-center align-items-center text-center ${
                  patient?.profileId === itm.profileId
                    ? style.labelActiveProfile
                    : ""
                }`}
                htmlFor={itm.profileId}
              >
                {itm.url ? (
                  <Image
                    src={itm.url}
                    width={72}
                    height={72}
                    alt={itm.name}
                    style={{ borderRadius: 50 }}
                    className={style.paymentProfileImage}
                  />
                ) : (
                  <FaUserCircle className={style.profileIcon} />
                )}
                <span className="text-capitalize">
                  <p className="text-dark">
                    {itm.name.length <= 5 ? itm.name : `${itm.name}`}
                  </p>
                  {styling !== style.profileContainer && <p>{itm.relation}</p>}
                </span>
                {patient?.profileId === itm.profileId && (
                  <FaCheck className={style.icon} />
                )}
              </label>
            </li>
          ))}
          <AddProfile
            setProfile={setStates}
            toast={toast}
            check={styling ? true : false}
          />
        </ul>
      )}
      <ToastContainer />
    </section>
  );
});
export default Profiles;
