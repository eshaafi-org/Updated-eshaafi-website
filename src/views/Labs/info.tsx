import { InputField } from "@/components/InputField";
import style from "@/styles/labs.module.scss";
import moment from "moment";
import Address from "./Address";
import { Text18 } from "@/components/Typography";
import { useState } from "react";

export default function Info({ typeTest, setTypeTest, address, setAddress, patientName, setPatientName, time, setTime, date, setDate, labName, setLabName }: {
    typeTest: string,
    setTypeTest: any,
    patientName: string,
    setPatientName: any,
    address: string,
    setAddress: any,
    time: string,
    setTime: any,
    date: string,
    setDate: any,
    labName: string
    setLabName: any,
}) {
    const [focus, setFocus] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    function handleFocus() {
        setFocus(true)
    }
    const handleBlur = () => {
        setFocus(false)
    }
    function handleFocusTime() {
        setIsFocus(true)
    }
    const handleBlurTime = () => {
        setIsFocus(false)
    }
    // Function to format date as "DD/MM/YYYY" on blur
    const formatDate = (date:any) => {
        return moment(date).format("DD/MM/YYYY");
    };

    // Function to format time as 12-hour format on blur
    const formatTime = (time:any) => {
        return moment(time, "HH:mm").format("hh:mm A");
    };
    return (
        <>
            <form
                className={style.prescriptionForm}
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
                                onChange={(e) => setTypeTest(e.target.value)}
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
                                onChange={(e) => setTypeTest(e.target.value)}
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
                        onChange={(e: any) => setPatientName(e.target.value)}
                    />
                    <InputField
                        type={focus ? "date" : "text"}
                        name="date"
                        className={style.dateField}
                        // value={date}
                        value={date ? formatDate(date) : ""}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeHolder="Select Date"
                        onChange={(e: any) => setDate(e.target.value)}
                        min={moment().format("YYYY-MM-DD")}
                    />
                    <InputField
                        type={isFocus ? "time" : "text"}
                        name="time"
                        className={style.timeField}
                        // value={time}
                        value={time ? formatTime(time) : ""}
                        onFocus={handleFocusTime}
                        onBlur={handleBlurTime}
                        placeHolder="Select Time"
                        onChange={(e: any) => setTime(e.target.value)}
                    />
                    <select
                        name="labName"
                        value={labName}
                        onChange={(e) => setLabName(e.target.value)}
                        className={`${style.labField} p-2`}
                    >
                        <option value="" disabled>
                            Select Lab
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
                    />
                    <label
                        className={`${style.labelrdioclass} d-flex  align-items-center p-3 row-gap-1`}
                    >
                        <span className={style.paymentActive}>
                            <Text18 className="text-dark fw-bold">
                                Cash on Delivery
                            </Text18>
                        </span>
                    </label>
                </div>
                <div className={style.notes}></div>
            </form>
        </>
    )
}

