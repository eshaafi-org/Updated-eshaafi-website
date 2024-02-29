/*
Author: Zeeshan Naseeb 
Date: 29-March-2024
file: Health Tracker / Blood Pressure.
*/
import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import Profiles from "@/components/Profiles";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import style from "@/styles/health.module.scss";
import { Text20 } from "@/components/Typography";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
interface Profile {
    profileId?: string;
}
export default function BloodPressure() {
    const links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
        { name: "Blood Pressure", link: "/healthtracker/bloodpressure" },
    ]
    // States 
    const [profile, setProfile] = useState<Profile>({})
    const [bloodPressure, setBloodPressure] = useState('')
    // get Blood Pressure API function
    const handleSearch = () => {
        const id = profile?.profileId
        axios
            .get(BASE_URL + `/new/users/healthtracker/${id}/type/bloodPressure`, {
                headers: headers(),
            })
            .then((res) => {
                setBloodPressure(res.data.response.Items)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (profile.profileId) {
            handleSearch();
        }
    }, [profile.profileId]);
    return (
        <section className="container">
            <Head>
                <title>Health Tracker | Blood Pressure</title>
            </Head>
            <span>
                <h2>Health Tracker</h2>
                <AddressBar links={links} />
            </span>
            <Profiles patient={profile} setPatient={setProfile} />
            <div>
                <div></div>
                <div className={`${style.bloodPressureForm} p-3`}>
                    <Text20 style={{ color: "#3F3F3F" }}>Add Blood Pressure</Text20>
                    <form>
                        {/* Height Date and Time */}
                        <div className='my-3'>
                            <span className='d-flex flex-column w-100'>
                                <label>Select Date</label>
                                <input className={style.bloodPressureField} type='date' />
                            </span>
                        </div>
                        <div className='mb-3'>
                            <span className='d-flex flex-column w-100'>
                                <label>Select Time</label>
                                <input className={style.bloodPressureField} type='time' />
                            </span>
                        </div>
                        {/* Weight input */}
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Upper pressure (mmHg)</label>
                            <input className={style.bloodPressureField} type='text' />
                        </span>
                        {/* Age input */}
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Lower pressure (mmHg)</label>
                            <input className={style.bloodPressureField} type='text' />
                        </span>
                        {/* Calculate BMI button */}
                        <Button variant="contained" className={`${style.bmiCalculate} w-100 mt-3 p-3`}>Save</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}