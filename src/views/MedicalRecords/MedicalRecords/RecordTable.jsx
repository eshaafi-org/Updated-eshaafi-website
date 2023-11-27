// dependencies
import ImageViewer from "./ImageViewer";
import moment from "moment";
import empty from "../../../../public/images/empty.svg";
import style from "@/styles/medicalRecords.module.scss";
import Button from "@/components/Button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// name component
const NumberOfAttach = ({ attached }) => {
  return (
    <>
      <div className={`${style.attachments}`} style={{ columnGap: "5px" }}>
        {attached.slice(0, 2).map((item, index) => (
          <span key={index} className={index === 1 ? "lastAttach" : " "}>
            <img src={item} alt="" className={"attachments"} />
            {index === 1 && attached.length > 2 && (
              <p className="m-0 ms-1 attach-length" style={{ fontSize: 16 }}>
                +{attached.slice(2).length}
              </p>
            )}
          </span>
        ))}
      </div>
      <style jsx="true">{`
        .attachments {
          background: #eee;
          height: 40px;
          width: 30px;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .lastAttach {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .attach-length {
          position: absolute;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          height: 40px;
          width: 31px;
          right: 0;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};
// record item
const RecordItem = ({
  item,
  key,
  deleteRecord,
  patient,
  getMedicalRecords,
}) => {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);
  console.log(item);
  const showOptions = () => {
    setOptions(!options);
  };
  // deleting record
  const handleDelete = (id, recordId) => {
    setOptions(false);
    deleteRecord(id, recordId);
  };
  // handle Edit
  const handleEdit = () => {
    setShow(true);
    setEdit(true);
    setOptions(false);
  };
  return (
    <li key={key} className={style.recordItem}>
      <div
        className={`${style.date}`}
        style={{ color: "#1C6BA4", fontWeight: 600 }}
      >
        {moment(item.appoint_date).format("D,ddd")}
        <p style={{ color: "#1C6BA4", fontWeight: 400 }}>
          {moment(item.appoint_date).format("MMM,yyy")}
        </p>
      </div>
      <div className={`${style.profile}`}>
        <p>Profile</p>
        {item?.shared_record?.patient_name}
      </div>
      <div className={`${style.time}`}>
        <p>Time uploaded</p>
        {moment(item?.shared_record?.date).format("h:mm a")}
      </div>
      <NumberOfAttach attached={item?.shared_record?.image} />
      <ImageViewer
        images={item?.shared_record?.image}
        patientName={item?.shared_record?.patient_name}
        date={item.appoint_date}
        show={show}
        setShow={setShow}
        edit={edit}
        setEdit={setEdit}
        entryId={item?.appointmentId}
        recordId={item?.shared_record?.recordId}
        toast={toast}
        getMedicalRecords={getMedicalRecords}
      />
      <Button onClick={showOptions} className={options ? style.editActive : ""}>
        <HiOutlineDotsHorizontal />
      </Button>
      {options && (
        <div className={style.optionsDiv + " shadow rounded"}>
          <div className={style.optionContainer}>
            <Button onClick={handleEdit}>Edit</Button>
            <Button
              style={{ color: "red" }}
              onClick={() =>
                handleDelete(item.appointmentId, item?.shared_record?.recordId)
              }
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};
// record table
export default function RecordTable({
  record,
  deleteRecord,
  patient,
  getMedicalRecords,
}) {
  // const params = useParams();
  return (
    <div className="table-container">
      {record.length > 0 ? (
        <ul className={style.recordContainer}>
          {record.map((itm, key) => (
            <RecordItem
              item={itm}
              key={key}
              deleteRecord={deleteRecord}
              patient={patient}
              getMedicalRecords={getMedicalRecords}
            />
          ))}
        </ul>
      ) : (
        <div className="d-flex flex-column content-center align-items-center w-full p-2">
          <Image src={empty} alt="empty" width={200} height={200} />
          <p>No Records Uploaded</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
