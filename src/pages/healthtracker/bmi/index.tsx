/*
Author: Zeeshan Naseeb 
Date: 29-March-2024
file: Health Tracker / BMI.
*/
import React, { useState } from 'react';
import style from "@/styles/health.module.scss";
import Button from '@/components/Button';
import { Text11, Text14, Text16, Text20, Text22 } from '@/components/Typography';
import AddressBar from '@/components/AddressBar';
import Head from 'next/head';
// import { SimpleGauge } from "react-gauges";

export default function Bmi() {
    // State variables
    const [gender, setGender] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInch, setHeightInch] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiResult, setBmiResult] = useState<number | null>(null)
    // Handle heightInch input with maximum limit
    const handleHeightInchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/\D/, ''); // Remove non-numeric characters
        const clampedValue = Math.min(parseInt(inputValue, 10) || 0, 12); // Ensure the value is at most 12
        setHeightInch(clampedValue.toString());
    };
    // Calculate BMI
    const calculateBMI = () => {
        const heightMeters = ((parseInt(heightFeet) || 0) * 0.3048) + ((parseInt(heightInch) || 0) * 0.0254);
        const weightKg = parseInt(weight) || 0;
        const bmi = weightKg / (heightMeters * heightMeters);
        setBmiResult(bmi);
    }
    // Get BMI message based on the result
    const getBmiMessage = () => {
        if (bmiResult === null) return "Calculate Your BMI";

        if (bmiResult < 18.5) return "You Are Under Weight";
        if (bmiResult <= 24.9) return "Your Body Weight is Normal";
        if (bmiResult <= 30.1) return "You Are Over Weight";
        return "You Are Obese";
    }
    // Check if the form is complete for enabling the button
    const isDisabled = !(gender && heightFeet && heightInch && age && weight);
    return (
        <section className='container'>
            <Head>
                <title>Health Tracker | BMI</title>
            </Head>
            <span>
                <h2>Health Tracker</h2>
                <AddressBar links={[
                    { name: "Home", link: "/" },
                    { name: "Health Tracker", link: "/healthtracker" },
                    { name: "BMI", link: "/healthtracker/bmi" },
                ]} />
            </span>
            <div className={style.bmiData}>
                <div className={style.bmiTracker}>
                    <div>
                        {/* <SimpleGauge value={20} borderType="square" indicatorVisible={false} /> */}
                    </div>
                    <div className={`${style.bmiResult} d-flex flex-column row-gap-1`}>
                        {/* Display details */}
                        <div className={`${style.bmiResultDetail} d-flex justify-content-between p-3`}>
                            <div>
                                <span className='d-flex align-items-end justify-content-center'>
                                    <Text22 className={style.resultText}>{bmiResult !== null ? age : "0"}</Text22>
                                    <Text11 className={style.resultText}>Years</Text11>
                                </span>
                                <Text14>Age</Text14>
                            </div>
                            <div className={style.bmiDetailBorder}></div>
                            <div>
                                <span className='d-flex align-items-end'>
                                    <Text22 className={style.resultText}>{bmiResult !== null ? heightFeet : 0}</Text22>
                                    <Text11 className={style.resultText}>ft</Text11>
                                    <Text22 className={style.resultText}>{bmiResult !== null ? heightInch : 0}</Text22>
                                    <Text11 className={style.resultText}>in</Text11>
                                </span>
                                <Text14>Height</Text14>
                            </div>
                            <div className={style.bmiDetailBorder}></div>
                            <div>
                                <span className='d-flex align-items-end'>
                                    <Text22 className={style.resultText}>{bmiResult !== null ? weight : 0}</Text22>
                                    <Text11 className={style.resultText}>kg</Text11>
                                </span>
                                <Text14>Weight</Text14>
                            </div>
                        </div>
                        {/* Display BMI result */}
                        <div className='d-flex flex-column col-gap-0-5 align-items-center'>
                            <Text14>Normal BMI result 18.5 to 24.9</Text14>
                            <Text16 className={style.resultText}>{getBmiMessage()}</Text16>
                        </div>
                    </div>
                </div>
                {/* BMI Form */}
                <div className={`${style.bmiForm} p-3`}>
                    <Text20 style={{ color: "#3F3F3F" }}>Calculate BMI</Text20>
                    <form>
                        {/* Gender selection */}
                        <div className="my-3">
                            <label>Gender</label>
                            <select className={`${style.bmiOptionField} w-100 p-3 rounded`}
                                value={gender}
                                onChange={(e: any) => setGender(e.target.value)}>
                                <option value="">Select Option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* Height input */}
                        <div className='d-flex col-gap-0-5 mb-3'>
                            <span className='d-flex flex-column w-100'>
                                <label>Height (feet)</label>
                                <input className={style.bmiInputField}
                                    type='text'
                                    pattern="\d*"
                                    value={heightFeet}
                                    onChange={(e: any) => setHeightFeet(e.target.value.replace(/\D/, ''))} />
                            </span>
                            <span className='d-flex flex-column w-100'>
                                <label>Inch</label>
                                <input className={style.bmiInputField}
                                    type='text'
                                    pattern="\d*"
                                    value={heightInch}
                                    onChange={handleHeightInchChange} />
                            </span>
                        </div>
                        {/* Weight input */}
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Weight (kg)</label>
                            <input className={style.bmiInputField}
                                type='text'
                                pattern="\d*"
                                value={weight}
                                onChange={(e: any) => setWeight(e.target.value.replace(/\D/, ''))} />
                        </span>
                        {/* Age input */}
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Age</label>
                            <input className={style.bmiInputField}
                                type='text'
                                pattern="\d*"
                                value={age}
                                onChange={(e: any) => setAge(e.target.value.replace(/\D/, ''))} />
                        </span>
                        {/* Calculate BMI button */}
                        <Button variant="contained" className={`${style.bmiCalculate} w-100 mt-3 p-3`} disabled={isDisabled} onClick={calculateBMI}>Calculate BMI</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
