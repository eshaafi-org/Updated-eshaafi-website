import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Disease from "../../Eprescription/Disease";
import style from "./style.module.scss";
import axios from "axios";
import AddMedicine from "../../Eprescription/Medicine";
import LightModeIcon from "@mui/icons-material/LightMode";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ReactTagInput from "@pathofdev/react-tag-input";
import SendIcon from "@mui/icons-material/Send";
// import { useParams } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import { API_CONSTANTS } from "../../../../helper/DOC_API_CONST";
import Toast from "../../../../components/Toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const PrescriptionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EPRESC": {
      return {
        ...state,
        e_prescription: [...state.e_prescription, action.payload],
      };
    }
    case "UPDATE_EPRESC": {
      return {
        ...state,
        e_prescription: action.payload,
      };
    }
    case "DLT_MED": {
      return {
        ...state,
        e_prescription: state.e_prescription.filter(
          (i, index) => index !== action.payload
        ),
      };
    }
    case "DOS_TAGS_ARRAY": {
      return {
        ...state,
        dosTags: action?.payload?.tags,
        instructions: action?.payload?.tags + state?.dontTags,
      };
    }
    case "DONT_TAGS_ARRAY": {
      return {
        ...state,
        dontTags: action?.payload?.tags,
        instructions: state?.dosTags + action?.payload?.tags,
      };
    }
    case "DOS_AND_DONTS": {
      return {
        ...state,
        dosTags: action.payload?.dos,
        dontTags: action.payload?.donts,
        instructions: action?.payload?.dos + ", " + action?.payload?.donts,
      };
    }
    case "LOADING_TRUE": {
      return {
        ...state,
        loadingState: true,
      };
    }
    case "LOADING_FALSE": {
      return {
        ...state,
        loadingState: false,
      };
    }
    case "UPDATE_PRESCRIPTION": {
      return {
        ...state,
        e_prescription: action.payload?.e_prescription,
        instructions: action.payload?.instructions,
        complaints: action.payload?.complaints,
        diagnosis: action.payload?.diagnosis,
        clinicalDetails: action.payload?.clinicalDetails,
        drugAllergies: action.payload?.drugAllergies,
      };
    }
    default: {
      return {
        ...state,
        [action.target.name]: action.target.value,
      };
    }
  }
};
// eprescription component
export default function Prescription() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId")
  const eprescriptionUrl = useSelector(
    (state) => state.consultationReducer.value?.prescription_url
  )
  const [loading, setLoading] = useState(false)
  // Use the useEffect hook to fetch data when the component mounts
  const [prescription, setPrescription] = useReducer(PrescriptionReducer, {
    e_prescription: [], 
    dosTags: [],
    dontTags: [],
    complaints: "",
    diagnosis: "",
    clinicalDetails: "",
    drugAllergies: "",
    loadingState: false,
    instructions: "",
  })
  // extractign variables from object
  const {
    dosTags,
    dontTags,
    e_prescription,
    complaints,
    diagnosis,
    clinicalDetails,
    drugAllergies,
    loadingState,
    instructions,
  } = prescription;

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_CONSTANTS.BASEURL}/appointment/${appointmentId}/prescription`, {
        headers: API_CONSTANTS.headers(),
      })
      .then((res) => {
        const responseData = res.data.response.Item
        setPrescription({
          type: "UPDATE_PRESCRIPTION",
          payload: responseData, // This should be an object with fields matching your form
        }) 
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
      });
  }, [params.id])
  
  // editing medicine
  const handleEditMedicine = (values, indx) => {
    dispatch({
      type: "editMedicine/EDIT_MEDICINE",
      payload: values,
      index: indx,
    });
  };
  // handle do's tags
  const handleDoTags = (tags) => {
    setPrescription({
      type: "DOS_TAGS_ARRAY",
      payload: { tags: tags },
    });
  };
  // handle dont's tags
  const handleDontTags = (tags) => {
    setPrescription({
      type: "DONT_TAGS_ARRAY",
      payload: { tags: tags },
    });
  };
  // deleting medicine
  const handleDeleteMedicine = (indx) => {
    setPrescription({ type: "DLT_MED", payload: indx });
  };
  // adding medicine to eprescription view
  const handleAddMedicine = (medicine, indx) => {
    if (indx !== "") {
      const updatedMedicine = e_prescription.map((i, ind) => {
        if (indx === ind) {
          return {
            ...i,
            medicine_name: medicine.medicine_name,
            category: medicine.category,
            quantity: medicine.quantity,
            duration: medicine.duration,
            // tea_spoon: '',,
            // table_spoon: '',
            instruction: medicine.instruction,
            dosage_type: medicine.dosage_type,
            intake: medicine.intake,
          };
        }
        return i;
      });
      setPrescription({
        type: "UPDATE_EPRESC",
        payload: updatedMedicine,
      });
    } else {
      setPrescription({ type: "ADD_EPRESC", payload: medicine });
    }
  };
  const getDosAndDonts = (data) => {
    setPrescription({
      type: "DOS_AND_DONTS",
      payload: data,
    });
  };
  // sending data to api
  const data = {
    e_prescription,
    complaints,
    diagnosis,
    clinicalDetails,
    drugAllergies,
    instructions,
  };
  const handleUpload = () => {
    setPrescription({ type: "LOADING_TRUE" });
    axios
      .post(
        `${API_CONSTANTS.BASEURL}/appointment/${params.id}/prescription`,
        data,
        {
          headers: API_CONSTANTS.headers(),
        }
      )
      .then((res) => {
        setPrescription({ type: "LOADING_FALSE" });
        if (
          res.data.response.message ===
          "Only InProgress|Pending appointment will have a prescription"
        ) {
          throw "Only InProgress|Pending appointment will have a prescription";
        } else {
          if (!eprescriptionUrl) {
            dispatch({ type: "consultationSlicer/prescription" });
          }
          dispatch({
            type: "toastSlicer/message",
            payload: { message: res.data.response.message, variant: "success" },
          });
        }
      })
      .catch((err) => {
        setPrescription({ type: "LOADING_FALSE" });
        dispatch({
          type: "toastSlicer/message",
          payload: { message: err, variant: "warning" },
        });
      });
  };

  // useEffect(() => {
  //   if (eprescriptionUrl && fetchedData ) {
  //     // Here, you can access ePrescriptionData.e_prescription
  //     setPrescription({ type: "UPDATE_PRESCRIPTION", payload: fetchedData  });
  //   }
  // }, [eprescriptionUrl, fetchedData ]);
  return (
    <>
      <div className={style.eprescription + " " + "p-1 mt-1"}>
        <Link
          to={`/appointments/${params.id}`}
          style={{ alignSelf: "flex-start" }}
        >
          <Button variant="contained" style={{ background: "#00568A" }}>
            <KeyboardBackspaceIcon />
          </Button>
        </Link>
        <div className={style.pre_section}>
          <div className={style.medicine_sec}>
            <div className="flex justify-center w-full bg-white rounded p-1">
              <form className="w-full">
                <fieldset className={style.history}>
                  <legend className={style.legendHistory}>History</legend>
                  <div className="my-1">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Investigation"
                      variant="outlined"
                      multiline
                      maxRows={4}
                      fullWidth
                      color="primary"
                      name="complaints"
                      value={complaints}
                      onChange={setPrescription}
                    />
                  </div>
                  <div className="my-1">
                    <Box component="form" noValidate autoComplete="off">
                      <TextField
                        id="outlined-basic"
                        value={diagnosis}
                        label="Diagnosis"
                        variant="outlined"
                        name="diagnosis"
                        color="primary"
                        onChange={setPrescription}
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            e.preventDefault();
                          }
                        }}
                        fullWidth
                      />
                    </Box>
                  </div>
                  <div className="my-1">
                    <Box component="form" noValidate autoComplete="off">
                      <TextField
                        id="outlined-basic"
                        label="Clinical Details"
                        variant="outlined"
                        fullWidth
                        value={clinicalDetails}
                        name="clinicalDetails"
                        onChange={setPrescription}
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>
                  </div>
                  <div className="my-1">
                    <Box component="form" noValidate autoComplete="off">
                      <TextField
                        id="outlined-basic"
                        label="Drug Allergies"
                        variant="outlined"
                        name="drugAllergies"
                        value={drugAllergies}
                        onChange={setPrescription}
                        fullWidth
                        onKeyDown={(e) => {
                          if (e.keyCode == 13) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Box>
                  </div>
                  <div className="my-1">
                    <Disease getDosAndDonts={getDosAndDonts} />
                  </div>
                  <div className="my-1">
                    <ReactTagInput
                      tags={dosTags ? dosTags : []}
                      placeholder={`Do's`}
                      editable={true}
                      removeOnBackspace={true}
                      onChange={(newTags) => handleDoTags(newTags)}
                      className={style.reactTag}
                    />
                  </div>
                  <div className="my-1">
                    <ReactTagInput
                      tags={dontTags ? dontTags : []}
                      placeholder={`Don'ts`}
                      editable={true}
                      removeOnBackspace={true}
                      onChange={(newTags) => handleDontTags(newTags)}
                      className={style.reactTag}
                    />
                  </div>
                </fieldset>
                <AddMedicine addMedicine={handleAddMedicine} />
              </form>
            </div>
          </div>
        </div>
        <div className={style.pre_section}>
          <div className={style.medicine_sec}>
            <div className="bg-white rounded p-1">
              {loading && (
                <div className="flex w-full justify-center">
                  <div
                    className="spinner-border "
                    role="status"
                    style={{ color: "#009b94" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {loading || (
                <fieldset className={style.history}>
                  <legend className={style.legendHistory}>Summary</legend>
                  <div className="flex rounded p-1">
                    {
                      <div className="flex flex-col border p-1 rounded w-full">
                        {complaints && (
                          <div className="flex flex-col my-1">
                            <h6 className={style.summary_heading}>
                              {" "}
                              Investigation
                            </h6>
                            <p className={style.medicine_instruction}>
                              {complaints}
                            </p>
                          </div>
                        )}
                        {diagnosis && (
                          <div className="flex flex-col my-1">
                            <h6 className={style.summary_heading}>Diagnosis</h6>
                            <p className={style.medicine_instruction}>
                              {diagnosis}
                            </p>
                          </div>
                        )}
                        {clinicalDetails && (
                          <div className="flex flex-col my-1">
                            <h6 className={style.summary_heading}>
                              Clinical Details
                            </h6>
                            <p className={style.medicine_instruction}>
                              {clinicalDetails}
                            </p>
                          </div>
                        )}
                        {drugAllergies && (
                          <div className="flex flex-col my-1">
                            <h6 className={style.summary_heading}>
                              Drug Allergies
                            </h6>
                            <p className={style.medicine_instruction}>
                              {drugAllergies}
                            </p>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                  <div className="flex rounded p-1 w-full">
                    {e_prescription?.length >= 1 && (
                      <div className="flex rounded border px-1 flex-col w-full">
                        {e_prescription.map((item, index) => (
                          <div key={index} className="flex w-full my-1">
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between items-center w-full">
                                <p
                                  style={{
                                    fontSize: 13,
                                    marginTop: 15,
                                    marginBottom: 0,
                                  }}
                                >
                                  {item.medicine_name.toUpperCase()}
                                </p>
                                <div className="flex w-1-4">
                                  <Button
                                    className="custom-button mx-1"
                                    type="button"
                                    onClick={() =>
                                      handleEditMedicine(item, index)
                                    }
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    className="custom-button mx-1"
                                    type="button"
                                    onClick={() => handleDeleteMedicine(index)}
                                  >
                                    <CloseIcon />
                                  </Button>
                                </div>
                              </div>

                              <span>
                                <p className={style.medicine_timeline}>
                                  {`${item.quantity} ${item.category}`}{" "}
                                  {item.category === "Lotion" ||
                                  item.category === "Cream" ||
                                  item.category === "oil" ||
                                  item.category === "Inj" ||
                                  item.category === "Oil" ||
                                  item.category === "Spray" ||
                                  item.category === "Drops" ||
                                  item.category === "Sachet" ||
                                  item.category === "Gel" ||
                                  item.category === "facewash" ||
                                  item.category === "Balm" ||
                                  item.category === "Bandages" ||
                                  item.category === "test"
                                    ? ` `
                                    : ` For 
                                  ${item.duration} Days /${item.dosage_type} 15
                                  min meal`}
                                </p>
                              </span>
                              <p className={style.medicine_instruction}>
                                {item.instruction}
                              </p>
                              {item.category === "Lotion" ||
                                item.category === "Cream" ||
                                item.category === "oil" ||
                                item.category === "Inj" ||
                                item.category === "Oil" ||
                                item.category === "Spray" ||
                                item.category === "Drops" ||
                                item.category === "Sachet" ||
                                item.category === "Gel" ||
                                item.category === "facewash" ||
                                item.category === "Balm" ||
                                item.category === "Bandages" ||
                                item.category === "test" || (
                                  <div className="flex ml-1 w-full">
                                    {item.intake.breakfast && (
                                      <span className="flex justify-center items-center mx-1">
                                        <WbTwilightIcon
                                          style={{
                                            color: "#707683",
                                            fontSize: 30,
                                          }}
                                        />
                                        <p className={style.medicine_duration}>
                                          {item.dosage_type} Breakfast
                                        </p>
                                      </span>
                                    )}
                                    {item.intake.lunch && (
                                      <span className="flex justify-center items-center mx-1">
                                        <LightModeIcon
                                          style={{
                                            color: "#707683",
                                            fontSize: 30,
                                          }}
                                        />
                                        <p className={style.medicine_duration}>
                                          {item.dosage_type} Lunch
                                        </p>
                                      </span>
                                    )}
                                    {item.intake.dinner && (
                                      <span className="flex justify-center items-center mx-1">
                                        <DarkModeIcon
                                          style={{
                                            color: "#707683",
                                            fontSize: 30,
                                          }}
                                        />
                                        <p className={style.medicine_duration}>
                                          {item.dosage_type} Dinner
                                        </p>
                                      </span>
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {instructions && (
                    <div className="flex rounded p-1">
                      <div className="flex flex-col border p-1 rounded w-full">
                        <p className="">General Information</p>
                        <p className={style.medicine_instruction}>
                          {instructions}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="p-1">
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      onClick={handleUpload}
                      fullWidth
                      color="primary"
                      endIcon={<SendIcon />}
                      disabled={e_prescription?.length < 1}
                      loading={loadingState}
                      loadingPosition="end"
                    >
                      Upload
                    </LoadingButton>
                  </div>
                </fieldset>
              )}
            </div>
          </div>
        </div>
        <Toast />
      </div>
    </>
  );
}
