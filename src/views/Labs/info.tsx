import { InputField } from "@/components/InputField";
import style from "@/styles/labs.module.scss";
import moment from "moment";
import { useState } from "react";
import Address from "./Address";
import { Text18 } from "@/components/Typography";

export default function Info() {
    
    const [address, setAddress] = useState("");
    const [formFields, setFormFields] = useState({
        typeTest: "",
        patientName: "",
        time: "",
        date: "",
        labName: "",
    });
    const { typeTest, patientName, time, date, labName } = formFields;
    // all the functions
    // get the form data from
    const handleFormData = (e: { target: { name: any; value: any; }; }) => {
        setFormFields((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    return(
        <>
            <form
                className={style.prescriptionForm}
                // onSubmit={uploadPrescription}
            >
                <div className={style.collectionForm}>
                    <p>Select Preference</p>
                    <div className={style.collectionOptions}>
                        <label
                            htmlFor="lab"
                            className={`${style.labelrdioclass} d-flex  align-items-center row-gap-1`}
                        >
                            <input
                                type="radio"
                                id="lab"
                                name="typeTest"
                                value={"labVisit"}
                                className={style.btnCheck}
                                onChange={handleFormData}
                            />
                            <span
                                className={
                                    typeTest === "labVisit"
                                        ? style.typeActive
                                        : style.typeCircle
                                }
                            >
                                Lab Visit
                            </span>
                        </label>
                        <label
                            htmlFor="home"
                            className={`${style.labelrdioclass} d-flex  align-items-center row-gap-1`}
                        >
                            <input
                                type="radio"
                                onChange={handleFormData}
                                id="home"
                                name="typeTest"
                                value={"homeSample"}
                                className={style.btnCheck}
                            />
                            <span
                                className={
                                    typeTest === "homeSample"
                                        ? style.typeActive
                                        : style.typeCircle
                                }
                            >
                                Home Sampling
                            </span>
                        </label>
                    </div>
                </div>
                <div className={style.formFields}>
                    <InputField
                        placeHolder="Patient Name"
                        className={style.nameField}
                        name="patientName"
                        value={patientName}
                        onChange={handleFormData}
                    />
                    <InputField
                        type="date"
                        name="date"
                        className={style.dateField}
                        value={date}
                        onChange={handleFormData}
                        min={moment().format("YYYY-MM-DD")}
                    />
                    <InputField
                        type="time"
                        name="time"
                        className={style.timeField}
                        value={time}
                        onChange={handleFormData}
                    />
                    <select
                        name="labName"
                        value={labName}
                        id=""
                        onChange={handleFormData}
                        className={style.labField}
                    >
                        <option value="" disabled>
                            --select--
                        </option>
                        <option value="chugtai">
                            Chugtai Lab
                        </option>
                        <option value="idc">
                            IDC
                        </option>
                        
                    </select>
                </div>
                {typeTest === "homeSample" && (
                    <Address address={address} setAddress={setAddress} />
                )}

                <div className={style.paymentMethod}>
                    <input
                        type="radio"
                        className={style.btnCheck}
                        name="paymentId"
                        // id={itm.paymentId}
                        // value={itm.paymentId}
                        // onClick={() => {
                        //     setPaymentId(itm.paymentId);
                        //     setMethod(itm.type);
                        // }}
                    // disabled={wallet}
                    />
                    <label
                        className={`${style.labelrdioclass} d-flex  align-items-center p-3 row-gap-1`}
                    // htmlFor={itm.paymentId}
                    >
                        <span className={style.paymentActive}>
                            <Text18 className="text-dark fw-bold">
                                Cash on Delivery
                            </Text18>
                        </span>
                    </label>
                </div>
                <div className={style.notes}></div>
                {/* <Button
                    variant="contained"
                    type="submit"
                    disabled={
                        images &&
                            typeTest &&
                            patientName &&
                            date &&
                            time &&
                            labName
                            ? false
                            : true
                    }
                >
                    Upload
                    {uploading && (
                        <>
                            <div
                                className="spinner-border text-blue spinner-border-sm ms-2"
                                role="status"
                            ></div>
                        </>
                    )}
                </Button> */}
            </form>
        </>
    )
}