/* eslint-disable react-hooks/exhaustive-deps */
import AddressBar from '@/components/AddressBar'
import Profiles from '@/components/Profiles'
import Head from 'next/head'
import React, { useEffect, useState, useRef } from 'react'
import Button from "@/components/Button";
import style from "@/styles/health.module.scss";
import { Text20 } from '@/components/Typography';
import axios from 'axios';
import { BASE_URL, headers } from '@/helper/CONST';
import { ToastContainer, toast } from 'react-toastify';
import Chart from 'chart.js/auto';
interface Profile {
    profileId?: string;
}
export default function BodyOxygen() {
    //Address Bar Links
    const links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
        { name: "Blood Oxygen Saturation", link: "/healthtracker/bodytemperature" },
    ]
    // Helper function to format date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // Gets the date in YYYY-MM-DD format
        const time = now.toTimeString().split(' ')[0].substring(0, 5); // Gets the time in HH:MM format
        return { date, time };
    };

    // Initialize state
    const { date: currentDate, time: currentTime } = getCurrentDateTime();
    const [profile, setProfile] = useState<Profile>({})
    const [oxygen, setOxygen] = useState('')
    const [date, setDate] = useState(currentDate)
    const [time, setTime] = useState(currentTime)
    const [lower, setLower] = useState('')
    const chartContainerRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart<"line", any[], string> | null>(null)
    // get data body Oxygen API function
    const bodyOxygen = () => {
        const id = profile?.profileId
        axios
            .get(BASE_URL + `/new/users/healthtracker/${id}/type/bodyOxygen`, {
                headers: headers(),
            })
            .then((res) => {
                setOxygen(res.data.response)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // Handle Add data Api Function
    const handleAdd = () => {
        const id = profile?.profileId
        const data = {
            datetime: `${date}T${time}`,
            type: "bodyOxygen",
            upper: "0",
            lower: lower,
        }
        axios
            .post(BASE_URL + `/new/users/healthtracker/${id}`, data, {
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
    // chart Data
    function updateChart(data: any) {
        if (!chartContainerRef.current) return; // Guard clause

        // If there's an existing chart, destroy it
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create a new chart instance
        chartRef.current = new Chart(chartContainerRef.current, {
            type: 'line',
            data: {
                labels: data.Items.map((item: any) => item.Sk), // Adapt this to your data structure
                datasets: [{
                    label: 'Blood Oxygen Saturation %',
                    data: data.Items.map((item: any) => item.lower), // Adapt this to your data structure
                    borderColor: '#EE6002',
                    tension: 0.1
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }
    // UseEffact for API call
    useEffect(() => {
        if (profile.profileId) {
            bodyOxygen();
        }
    }, [profile.profileId]);
    useEffect(() => {
        if (oxygen) {
            updateChart(oxygen);
        }

        // Cleanup function to destroy chart instance when component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [oxygen]);
    return (
        <>
            <section className="container">
                <Head>
                    <title>Health Tracker | Blood Oxygen Saturation</title>
                </Head>
                <span>
                    <h2>Health Tracker</h2>
                    <AddressBar links={links} />
                </span>
                <Profiles patient={profile} setPatient={setProfile} />
                <div className='d-flex'>
                    <div className='w-100'><canvas ref={chartContainerRef}></canvas></div>
                    <div className={`${style.bloodPressureForm} p-3`}>
                        <Text20 style={{ color: "#3F3F3F" }}>Add Blood Oxygen Saturation</Text20>
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
                            {/* Blood Oxygen Saturation%  input */}
                            <span className='d-flex flex-column w-100 my-3'>
                                <label>Blood Oxygen Saturation %</label>
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
