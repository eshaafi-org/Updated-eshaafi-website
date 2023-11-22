/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
// dependencies
import * as React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
import RecordTable from "./RecordTable";
// import { useSelector } from "react-redux";
// import { API_CONSTANTS } from "../../../helper/DOC_API_CONST";
// import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
// style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: "50%",
  borderRadius: 2,
};

export default function MedicalRecord({ text, icon, url }) {
  const patientId = useSelector(
    (state) => state.consultationReducer.value?.patientId
  );
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [record, setRecord] = React.useState([]);
  const getMedicalRecords = () => {
    setLoading(true);
    axios
      .get(
        `${API_CONSTANTS.BASEURL}/doctors/appointment/records/${patientId}/type/${url}`,
        {
          headers: API_CONSTANTS.headers(),
        }
      )
      .then((res) => {
        setRecord(res.data.response.Items ? res.data.response.Items : []);
        setLoading(false);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <RecordTable record={record} url={url} onClose={handleClose} />
    </>
  );
}
