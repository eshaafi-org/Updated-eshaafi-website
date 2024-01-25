"use client";
import AddressBar from '@/components/AddressBar';
import React, { useState } from 'react'
import style from "@/styles/health.module.scss"
import Head from 'next/head';
import { InputField } from '@/components/InputField';
import Button from '@/components/Button';
import { Text20 } from '@/components/Typography';
export default function Bmi() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
        { name: "BMI", link: "/healthtracker/bmi" },
    ];
    // States
    const [gender, setGender] = useState('')
    const [heightFeet, setHeightFeet] = useState('')
    const [heightInch, setHeightInch] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    return (
        <section className='container'>
            <Head>
                <title>Health Tracker | BMI</title>
            </Head>
            <span>
                <h2>{"Health Tracker"}</h2>
                <AddressBar links={links} />
            </span>
            <div className={style.bmiData}>
                <div className={style.bmiTracker}>
                    <div></div>
                    <div></div>
                </div>
                <div className={`${style.bmiForm} p-3`}>
                    <Text20 style={{ color: "#3F3F3F" }}>Calculate BMI</Text20>
                    <form>
                        <div className="my-3">
                            <label>Gender</label>
                            <select className={`${style.bmiOptionField} w-100 p-3 rounded`} value={gender} onChange={(e: any) => setGender(e.target.value)}>
                                <option value="">Select Option</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='d-flex col-gap-0-5 mb-3'>
                            <span className='d-flex flex-column w-100'>
                                <label>Height (feet)</label>
                                <InputField className={style.bmiInputField} value={heightFeet} onChange={(e: any) => setHeightFeet(e.target.value)} />
                            </span>
                            <span className='d-flex flex-column w-100'>
                                <label>Inch</label>
                                <InputField className={style.bmiInputField} value={heightInch} onChange={(e: any) => setHeightInch(e.target.value)} />
                            </span>
                        </div>
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Weight (kg)</label>
                            <InputField className={style.bmiInputField} value={weight} onChange={(e: any) => setWeight(e.target.value)} />
                        </span>
                        <span className='d-flex flex-column w-100 my-3'>
                            <label>Age</label>
                            <InputField className={style.bmiInputField} value={age} onChange={(e: any) => setAge(e.target.value)} />
                        </span>
                        <Button className={`${style.bmiCalculate} w-100 mt-3 p-3`}>Calculate BMI</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
