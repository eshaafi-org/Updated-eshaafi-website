import AddressBar from '@/components/AddressBar'
import Profiles from '@/components/Profiles'
import Head from 'next/head'
import React, { useState } from 'react'
import Button from "@/components/Button";
import style from "@/styles/health.module.scss";
import { Text20 } from '@/components/Typography';

export default function BodyTemperature() {
    //Address Bar Links
    const links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
        { name: "Body Temperature", link: "/healthtracker/bodytemperature" },
    ]
    // States 
    const [profile, setProfile] = useState({})
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
                                    <input className={style.bloodPressureField}
                                        type='date' />
                                </span>
                            </div>
                            <div className='mb-3'>
                                <span className='d-flex flex-column w-100'>
                                    <label>Select Time</label>
                                    <input className={style.bloodPressureField}
                                        type='time' />
                                </span>
                            </div>
                            {/* Body Temperature (°C)  input */}
                            <span className='d-flex flex-column w-100 my-3'>
                                <label>Body Temperature (°C) </label>
                                <input className={style.bloodPressureField} type='text' />
                            </span>
                            {/* Calculate BMI button */}
                            <Button variant="contained" className={`${style.bmiCalculate} w-100 mt-3 p-3`}>Save</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
