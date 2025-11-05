/* eslint-disable react-hooks/exhaustive-deps */
import AddressBar from '@/components/AddressBar'
import Profiles from '@/components/Profiles'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Button from "@/components/Button";
import style from "@/styles/health.module.scss";
import { Text20 } from '@/components/Typography';
import axios from 'axios';
import { BASE_URL, headers } from '@/helper/CONST';
import { ToastContainer, toast } from 'react-toastify';
interface Profile {
    profileId?: string;
}
export default function BodyTemperature() {
    //Address Bar Links
    const links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
        { name: "Body Temperature", link: "/healthtracker/bodytemperature" },
    ]
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // Gets the date in YYYY-MM-DD format
        const time = now.toTimeString().split(' ')[0].substring(0, 5); // Gets the time in HH:MM format
        return { date, time };
    };

    // Initialize state
    const { date: currentDate, time: currentTime } = getCurrentDateTime();
    const [profile, setProfile] = useState<Profile>({})
    const [bloodPressure, setBloodPressure] = useState('')
    const [date, setDate] = useState(currentDate)
    const [time, setTime] = useState(currentTime)
    const [lower, setLower] = useState('')
    // get body Tempe API function
    const bodyTemp = () => {
        const id = profile?.profileId
        axios
            .get(BASE_URL + `/new/users/healthtracker/${id}/type/bodyTemp`, {
                headers: headers(),
            })
            .then((res) => {
                setBloodPressure(res.data.response.Items)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleAdd = () => {
        const id = profile?.profileId
        const data = {
            datetime: `${date}T${time}`,
            type: "bodyTemp",
            upper: "0",
            lower: lower,
        }
        axios
            .post(BASE_URL + `/new/users/healthtracker/${id}`,data, {
                headers: headers(),
            })
            .then((res) => {
                toast(res.data.response.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success",
                });
                setDate('')
                setLower('')
                setTime('')
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (profile.profileId) {
            bodyTemp();
        }
    }, [profile.profileId]);
    return (
        <>
            <section className="container">
                <Head>
                    <title>Health Tracker | Body Temperature</title>
                </Head>
                <span>
                    <h2>Health Tracker</h2>
                    <AddressBar links={links} />
                </span>
                <Profiles patient={profile} setPatient={setProfile} />
                <div>
                    <div></div>
                    <div className={`${style.bloodPressureForm} p-3`}>
                        <Text20 style={{ color: "#3F3F3F" }}>Add Body Temperature</Text20>
                        <form>
                            {/* Height input */}
                            <div className='my-3'>
                                <span className='d-flex flex-column w-100'>
                                    <label>Select Date</label>
                                    <input className={style.bloodPressureField} value={date}
                                        type='date' onChange={(e) => setDate(e.target.value)} />
                                </span>
                            </div>
                            <div className='mb-3'>
                                <span className='d-flex flex-column w-100'>
                                    <label>Select Time</label>
                                    <input className={style.bloodPressureField} value={time}
                                        type='time' onChange={(e) => setTime(e.target.value)} />
                                </span>
                            </div>
                            {/* Body Temperature (°C)  input */}
                            <span className='d-flex flex-column w-100 my-3'>
                                <label>Body Temperature (°C) </label>
                                <input className={style.bloodPressureField} type='number' value={lower} onChange={(e) => setLower(e.target.value)} />
                            </span>
                            {/* Calculate BMI button */}
                            <Button variant="contained" className={`${style.bmiCalculate} w-100 mt-3 p-3`} onClick={handleAdd}>Save</Button>
                        </form>
                    </div>
                </div>
            </section>

            <ToastContainer />
        </>
    )
}
