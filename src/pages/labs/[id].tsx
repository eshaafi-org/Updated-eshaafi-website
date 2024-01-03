import AddressBar from "@/components/AddressBar";
import Image from "next/image";
import labIcon from "../../../public/images/labIcon.png"
import { Text14, Text16, Text22, Text24 } from "@/components/Typography";
import Button from "@/components/Button";
import { FaFilePrescription } from "react-icons/fa6";
import style from "@/styles/labs.module.scss"
import { FaSearch } from "react-icons/fa";
import { tests } from "@/helper/labTest"
import Link from "next/link";

export default function Test() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/labs/id` },
    ];
    return (
        <section className="container">
            <span>
                <h2>Chughtai Lab</h2>
                <AddressBar links={links} />
            </span>
            <div className="mt-4 d-flex justify-content-between align-items-start">
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
                <Button className={`${style.uploadButton} d-flex align-items-center`}>
                    <FaFilePrescription style={{ width: '18px', height: '22px', color: '#98D0F9' }} />
                    Upload Prescription
                </Button>
            </div>
            <div className={`${style.search} mt-4 px-1`}>
                <input
                    placeholder="Search for tests here"
                />
                <FaSearch className={style.searchIcon} />
            </div>
            <ul className={`${style.cart} mt-3`}>
                {tests.map((test: any, index: any) => (
                    <li key={index} className={style.cartDetail}>
                        <Text22>{test.testName}</Text22>
                        <Text16>{test.testDetail}</Text16>
                        <Text14>{test.testPrice}</Text14>
                        <Button className={`${style.cartButton} mt-2`}>Add to Cart</Button>
                    </li>
                ))}
            </ul>
            <Link href={""}>
            </Link>
        </section>
    )
}
