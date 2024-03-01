/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddressBar from "@/components/AddressBar";
import Image from "next/image";
import labIcon from "../../../public/images/labIcon.png"
import { Text14, Text16, Text22, Text24 } from "@/components/Typography";
import Button from "@/components/Button";
import { FaFilePrescription } from "react-icons/fa6";
import style from "@/styles/labs.module.scss"
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { useEffect, useState } from "react";
import FQuest from "@/views/Doctor/FQuest";
import { labFAQs } from "@/helper/FAQData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/views/Labs/labCartSlicer";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { CardsSkeletonLoader, SkeletonLoader } from "@/components/SkeletonLoader";
import Link from "next/link";

export default function Test() {
    const router = useRouter();
    const { id } = router.query;
    const getLabName = () => {
        if (id === 'IDC-Lab') {
            return 'IDC Lab';
        } else if (id === 'Chughtai-Lab') {
            return 'Chughtai Lab';
        } else {
            // Handle other cases or return a default value
            return 'Unknown Lab';
        }
    };
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: `${getLabName()}`, link: `/labs/${id}` },
    ];
    const value = useSelector((state: any) => state.labCartReducer.cart)
    const [test, setTest] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    const handleSearch = () => {
        const labSlug = id === 'Chughtai-Lab' ? 'Chughtai Lab' : (id === 'IDC-Lab' ? 'IDC LAB' : '');
        axios
            .get(BASE_URL + `/lab/patients/labs/test`, {
                headers: headers(),
                params: {
                    name: searchQuery,
                    vendor: labSlug,
                },
            })
            .then((res) => {
                setSearchResults(res.data.response.Items);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        // Check if id is valid and not an empty string
        if (id && id !== '') {
            setLoading(true)
            const labSlug = id === 'Chughtai-Lab' ? 'Chughtai Lab' : (id === 'IDC-Lab' ? 'IDC LAB' : '');

            axios
                .get(BASE_URL + `/lab/patients/labs/test?vendor=${labSlug}`, {
                    headers: headers(),
                })
                .then((res) => {
                    setTest(res.data.response.Items);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false)
                });
        }
    }, [id]);
    const handleAddToCart = (item: any) => {
        const user = localStorage.getItem("user");
        if (user) {
            const itemId = item.Sk;
            const isAlreadyInCart = value.some((cartItem: any) => cartItem.Sk === itemId);
            // Dispatch the addToCart action from the cart slice
            if (!isAlreadyInCart) {
                // Dispatch the addToCart action from the cart slice
                dispatch(addToCart({ ...item, quantity: 1, totalPrice: item.productPrice, subTotalPrice: item.subPrice, }));
                toast("Test Added to Cart ", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success",
                });
            } else {
                // Show a message or notification indicating that the test is already in the cart
                toast("Test is already in the Cart", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "warning",
                });
            }
        } else {
            // If user is not present, dispatch the login modal action
            dispatch({ type: "loginModalSlice/signIn" });
        }
    };
    useEffect(() => {
        if (searchQuery.length >= 1) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);
    return (
        <>
            <Head>
                <title>eShaafi | Labs</title>
            </Head>
            {loading ? (
                <div className="container">
                    <SkeletonLoader />
                    <CardsSkeletonLoader />
                </div>
            ) : (
                <section className="container">
                    <span>
                        <h2>{getLabName()}</h2>
                        <AddressBar links={links} />
                    </span>
                    <div className={`${style.labDetail} mt-4 d-flex justify-content-between align-items-start`}>
                        <div className="d-flex col-gap-1 align-items-center">
                            <Image
                                src={labIcon}
                                alt="labIcon"
                                height={100}
                                width={100}
                            />
                            <span>
                                <Text24>{getLabName()}</Text24>
                                <Text16>1200+ Tests</Text16>
                                <Text14>Available 00:00am - 00:00pm</Text14>
                            </span>
                        </div>
                        <Link href={"/labs/upload"}>
                            <Button variant="contained" className={"d-flex align-items-center col-gap-0-5"}>
                                <FaFilePrescription style={{ width: '18px', height: '22px', color: '#98D0F9', borderRadius: "6px" }} />
                                Upload Prescription
                            </Button>
                        </Link>
                    </div>
                    <div className={`${style.search} mt-4`}>
                        <input
                            placeholder="Search for tests here"
                            value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            onChange={(e) => {setSearchQuery(e.target.value)}}
                        />
                        <FaSearch className={style.searchIcon} />
                    </div>
                    <ul className={`${style.cart} mt-3 pb-4`}>
                        {searchQuery ? (
                            // Display search results when a search query is present
                            searchResults.map((result: any, index: any) => (
                                <li key={index} className={style.cartDetail}>
                                    <Text22 className={style.blackColor}>{result.MedicineName}</Text22>
                                    <span className="d-flex gap-1">
                                        <Text14 className={style.blueColor}>Rs.{result.productPrice}</Text14>
                                        <Text14 className={style.fadeColor}>Rs.{result.subPrice}</Text14>
                                    </span>
                                    <Button
                                        variant="outlined"
                                        className={`${style.cartButton} mt-2`}
                                        onClick={() => handleAddToCart(result)}
                                    >
                                        Add to Cart
                                    </Button>
                                </li>
                            ))
                        ) : (
                            // Display test data when there's no search query
                            test.map((tests: any, index: any) => (
                                <li key={index} className={style.cartDetail}>
                                    <Text22 className={style.blackColor}>{tests.MedicineName}</Text22>
                                    <span className="d-flex gap-1">
                                        <Text14 className={style.blueColor}>Rs.{tests.productPrice}</Text14>
                                        <Text14 className={style.fadeColor}>Rs.{tests.subPrice}</Text14>
                                    </span>
                                    <Button
                                        variant="outlined"
                                        className={`${style.cartButton} mt-2`}
                                        onClick={() => handleAddToCart(tests)}
                                    >
                                        Add to Cart
                                    </Button>
                                </li>
                            ))
                        )}
                    </ul>
                    <FQuest quests={labFAQs} heading={"Frequently Asked Questions"} />
                </section>
            )}
            <ToastContainer />
        </>
    )
}
