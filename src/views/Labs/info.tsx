import { InputField } from "@/components/InputField";
import style from "@/styles/labs.module.scss";
import moment from "moment";
import Address from "./Address";
import { Text18, Text14, Text16 } from "@/components/Typography";
import inputField from "@/components/InputField/Input.module.scss";

export default function Info({ typeTest,
    setTypeTest,
    address,
    setAddress,
    patientName,
    setPatientName,
    time, setTime,
    date, setDate,
    labName, setLabName,
    labOptions
}: {
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
    labOptions: any
}) {
    return (
        <>
            <form className={style.prescriptionForm}>
                <div className={style.collectionForm}>
                    <Text16 className="fw-bold text-dark">Select Preference</Text16>
                    <div className={style.collectionOptions}>
                        <label
                            htmlFor="lab"
                            className={`${style.labelrdioclass} d-flex align-items-center row-gap-2`}
                        >
                            <input
                                type="radio"
                                id="lab"
                                name="typeTest"
                                value={"labVisit"}
                                className={style.btnCheck}
                                onChange={(e) => setTypeTest(e.target.value)}
                                checked={typeTest === "labVisit"}
                            />
                            <span
                                className={
                                    typeTest === "labVisit"
                                        ? style.typeActive
                                        : style.typeCircle
                                }
                            >
                                <Text14 className="fw-500">Lab Visit</Text14>
                            </span>
                        </label>
                        <label
                            htmlFor="home"
                            className={`${style.labelrdioclass} d-flex align-items-center row-gap-2`}
                        >
                            <input
                                type="radio"
                                onChange={(e) => setTypeTest(e.target.value)}
                                id="home"
                                name="typeTest"
                                value={"homeSample"}
                                className={style.btnCheck}
                                checked={typeTest === "homeSample"}
                            />
                            <span
                                className={
                                    typeTest === "homeSample"
                                        ? style.typeActive
                                        : style.typeCircle
                                }
                            >
                                <Text14 className="fw-500">Home Sampling</Text14>
                            </span>
                        </label>
                    </div>
                </div>

                <div className={style.formFieldsContainer}>
                    <div className={style.formFields}>
                        <div className={style.formGroup}>
                            <label htmlFor="patientName" className="fw-500 text-dark">
                                Patient Name
                            </label>
                            <InputField
                                placeHolder="Enter patient name"
                                className={style.inputFieldStyle}
                                name="patientName"
                                value={patientName}
                                onChange={(e: any) => setPatientName(e.target.value)}
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="date" className="fw-500 text-dark">
                                Select Date
                            </label>
                            <input
                                placeholder="Select Date"
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                min={moment().format("YYYY-MM-DD")}
                                className={`${inputField.inputField} ${style.inputFieldStyle}`}
                                onChange={(e: any) => setDate(e.target.value)}
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="time" className="fw-500 text-dark">
                                Select Time
                            </label>
                            <input
                                placeholder="Select Time"
                                type="time"
                                id="time"
                                name="time"
                                value={time}
                                className={`${inputField.inputField} ${style.inputFieldStyle}`}
                                onChange={(e: any) => setTime(e.target.value)}
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label htmlFor="labName" className="fw-500 text-dark">
                                Select Lab
                            </label>
                            <select
                                id="labName"
                                name="labName"
                                value={labName}
                                onChange={(e) => setLabName(e.target.value)}
                                className={`${style.labField} ${style.inputFieldStyle}`}
                            >
                                <option value="" disabled>
                                    Select Lab
                                </option>
                                {labOptions.includes("Chughtai Lab") && (
                                    <option value="chugtai">Chughtai Lab</option>
                                )}
                                {labOptions.includes("IDC Lab") && (
                                    <option value="idc">IDC Lab</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {typeTest === "homeSample" && (
                    <Address address={address} setAddress={setAddress} />
                )}

                <div className={style.paymentMethodContainer}>
                    <Text16 className="fw-bold text-dark mb-3">Payment Method</Text16>
                    <div className={style.paymentMethod}>
                        <input
                            type="radio"
                            id="paymentCod"
                            className={style.btnCheck}
                            name="paymentId"
                            defaultChecked
                        />
                        <label
                            htmlFor="paymentCod"
                            className={`${style.labelrdioclass} d-flex align-items-center p-3 row-gap-2`}
                        >
                            <span className={style.paymentActive}>
                                <Text16 className="text-dark fw-bold">
                                    Cash on Delivery
                                </Text16>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={style.notes}></div>
            </form>
        </>
    )
}

