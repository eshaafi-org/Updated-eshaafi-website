import style from "./Profile.module.scss";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL, headers } from "@/helper/CONST";
import { FaUserCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import AddProfile from "./AddProfile.jsx";

// reducer for state managements
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: true,
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
export default function Profiles({
  patient,
  setPatient,
  styling = style.profilesContainer,
}: {
  patient: any;
  setPatient: any;
  styling: any;
}) {
  const [states, setStates] = useReducer(reducer, {
    loading: false,
    profiles: [],
  });
  const { loading, profiles } = states;
  const getProfiles = () => {
    setStates({ type: "LOADING" });
    axios
      .get(BASE_URL + "/patients/profile", {
        headers: headers(),
      })
      .then((res) => {
        setStates({ type: "RESPONSE", payload: res.data.response.data });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <section className={styling}>
      {loading ? (
        <div className="d-flex col-gap-1 mt-4">
          <p className="d-flex flex-column card-text placeholder-glow justify-content-center align-items-start row-gap-1">
            <span
              className="placeholder col-7"
              style={{ width: 60, height: 60, borderRadius: 50 }}
            ></span>
            <span className="placeholder col-12"></span>
          </p>
          <p className="d-flex flex-column card-text placeholder-glow justify-content-center align-items-start row-gap-1">
            <span
              className="placeholder col-7"
              style={{ width: 60, height: 60, borderRadius: 50 }}
            ></span>
            <span className="placeholder col-12"></span>
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
                // onChange={(e) =>
                //   setPatient({
                //     patientId: e.target.value,
                //     patientName: itm.name,
                //   })
                // }
                onClick={(e: any) => {
                  if (patient.patientId === e.target.value) {
                    setPatient({
                      patientId: "",
                      patientName: "",
                    });
                  } else {
                    setPatient({
                      patientId: e.target.value,
                      patientName: itm.name,
                    });
                  }
                }}
              />
              <label
                className={`${
                  style.labelrdioclassProfile
                } d-flex flex-column justify-content-center align-items-center text-center ${
                  patient?.patientId === itm.profileId
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
                {patient?.patientId === itm.profileId && (
                  <FaCheck className={style.icon} />
                )}
              </label>
            </li>
          ))}
          <AddProfile setProfile={setStates} toast={toast} />
        </ul>
      )}
      <ToastContainer />
    </section>
  );
}
