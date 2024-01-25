import AddressBar from '@/components/AddressBar'
import React from 'react'
import style from "@/styles/health.module.scss";
import Image from "next/image";
import BMI from "../../../public/images/BMI.svg";
import bloodPressure from "../../../public/images/bloodPressure.svg";
import bodyTemprature from "../../../public/images/bodyTemprature.svg";
import suger from "../../../public/images/suger.svg";
import weight from "../../../public/images/weight.svg";
import oxygen from "../../../public/images/oxygen.svg";
import hemoglobin from "../../../public/images/hemoglobin.svg";
import Link from 'next/link';
export default function Health() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Health Tracker", link: "/healthtracker" },
    ];
    return (
        <section className="container">
            <span>
                <h2>{"Health Tracker"}</h2>
                <AddressBar links={links} />
            </span>
            <div>
                <ul className={style.featureList}>
                    <Link href={'/healthtracker/bmi'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">BMI</h4>
                                        <p className="cardDescription text-capitalize">
                                            Calculate your BMI quick and easy!
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={BMI}
                                        alt={"BMI"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/bloodPressure'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Blood Pressure</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your blood pressure
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={bloodPressure}
                                        alt={"bloodPressure"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/sugar'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Sugar Level</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your sugar level
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={suger}
                                        alt={"Sugar"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/bodyTemprature'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Body Temperature</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your body temperature
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={bodyTemprature}
                                        alt={"body Temprature"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/bloodoxygen'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Blood Oxygen Saturation</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your blood oxygen
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={oxygen}
                                        alt={"oxygen"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/hemoglobin'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Hemoglobin</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your hemoglobin
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={hemoglobin}
                                        alt={"hemoglobin"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <Link href={'/healthtracker/weight'}>
                        <li className={style.featureItm}>
                            <div className={style.featureItemCont}>
                                <span className={style.featureText}>
                                    <span className="d-flex flex-column row-gap-0-5 ">
                                        <h4 className="cardHeading">Weight</h4>
                                        <p className="cardDescription text-capitalize">
                                            Track your weight
                                        </p>
                                    </span>
                                </span>
                                <span className={`${style.featureImage} d-flex align-items-center`}>
                                    <Image
                                        src={weight}
                                        alt={"weight"}
                                        className={style.featureImg}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        </section>
    )
}
