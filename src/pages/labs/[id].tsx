"use client";
import AddressBar from "@/components/AddressBar";
import Image from "next/image";
import labIcon from "../../../public/images/labIcon.png"
import { Text14, Text16, Text22, Text24 } from "@/components/Typography";
import Button from "@/components/Button";
import { FaFilePrescription } from "react-icons/fa6";
import style from "@/styles/labs.module.scss"
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import { useEffect, useState } from "react";
import FQuest from "@/views/Doctor/FQuest";
import { labFAQs } from "@/helper/FAQData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/views/Labs/labCartSlicer";

export default function Test() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/labs/id` },
    ];
    const [test, setTest] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    const handleSearch = () => {
        axios
            .get(BASE_URL + "/lab/patients/labs/test", {
                headers: headers(),
                params: {
                    name: searchQuery,
                },
            })
            .then((res) => {
                setSearchResults(res.data.response.Items);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const getLabTest = () => {
        axios
            .get(BASE_URL + "/lab/patients/labs/test", {
                headers: headers(),
            })
            .then((res) => {
                setTest(res.data.response.Items);
            })
            // .catch((error) => console.log(error));
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getLabTest()
    }, [])
    const handleAddToCart = (item: any) => {
        // Dispatch the addToCart action from the cart slice
        dispatch(addToCart(item));
    };
    console
    return (
        <section className="container">
            <span>
                <h2>Chughtai Lab</h2>
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
                        <Text24>Chughtai Lab</Text24>
                        <Text16>1200+ Tests</Text16>
                        <Text14>Available 00:00am - 00:00pm</Text14>
                    </span>
                </div>
                <Button variant="contained" className={"d-flex align-items-center col-gap-0-5"}>
                    <FaFilePrescription style={{ width: '18px', height: '22px', color: '#98D0F9' }} />
                    Upload Prescription
                </Button>
            </div>
            <div className={`${style.search} mt-4`}>
                <input
                    placeholder="Search for tests here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <FaSearch className={style.searchIcon} />
            </div>
            <ul className={`${style.cart} mt-3`}>
                {searchQuery ? (
                    // Display search results when a search query is present
                    searchResults.map((result: any, index: any) => (
                        <li key={index} className={style.cartDetail}>
                            {/* Display the search results here */}
                            <Text22>{result.MedicineName}</Text22>
                            <Text16>{result.category}</Text16>
                            <Text14>{result.productPrice}</Text14>
                            <Button
                                variant="contained"
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
                            <Text22>{tests.MedicineName}</Text22>
                            <Text16>{tests.category}</Text16>
                            <Text14>{tests.productPrice}</Text14>
                            <Button
                                variant="contained"
                                className={`${style.cartButton} mt-2`}
                                onClick={() => handleAddToCart(tests)}
                            >
                                Add to Cart
                            </Button>
                        </li>
                    ))
                )}
            </ul>
            <div className="d-flex justify-content-center my-4 pb-2 border-bottom">
                <Button variant="contained">
                    Load More
                </Button>
            </div>
                <FQuest quests={labFAQs} heading={"Frequently Asked Questions"} />
        </section>
    )
}
