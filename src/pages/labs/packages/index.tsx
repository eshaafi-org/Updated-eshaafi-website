import { CardsSkeletonLoader } from "@/components/SkeletonLoader";
import packageIcon from "../../../../public/images/packageIcon.png";
import { Text14, Text16, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { MdCall } from "react-icons/md";
import Head from "next/head";
import AddressBar from "@/components/AddressBar";
import Image from "next/image";
let links = [
    { name: "Home", link: "/" },
    { name: "Lab Tests", link: "/labs" },
    { name: "Packages", link: `/labs/packages` },
];
export default function Packages() {
    const {
        loading,
        value: { PacakgeResponse },
    } = useSelector((state: any) => state.getLabHomeReducer);
    return (
        <>
            <Head>
                <title>eShaafi | Labs</title>
            </Head>
            {loading ? (
                <div className="container">
                    <CardsSkeletonLoader />
                </div>
            ) : (
                <section className="container pt-0">
                    <span>
                        <h2>Packages</h2>
                        <AddressBar links={links} />
                    </span>
                    <Text28 className="fw-bold text-dark">Select Lab</Text28>
                    <div className={style.package}>
                        <ul className={style.packageList}>
                            {PacakgeResponse.map((item: any, indx: number) => (
                                <li key={indx} className={style.labslist}>
                                    <div className="d-flex gap-2">
                                        <Image src={item.url ? item.url : packageIcon} alt="Labs Icon" />
                                        <span className={style.packageText}>
                                            <Text24 className="fw-bold text-dark">
                                                {item.subscriptionName}
                                            </Text24>
                                            <Text16>Includes {item.noOfTests} tests</Text16>
                                            <span className="d-flex gap-2">
                                                <Text14 className={style.blueColor}>Rs.{item.charges}</Text14>
                                                <Text14 className={style.fadeColor}>Rs.{item.subCharges}</Text14>
                                            </span>
                                        </span>
                                    </div>
                                    <div className={style.packageButton}>
                                        <Button variant="contained" className="">Book Package</Button>
                                        <Button className="border">
                                            <Link href={"/labs/packages/" + item.pId} className="">
                                                Select Test
                                            </Link>
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={style.helpline}>
                                <Text16 className={`${style.blackColor} fw-bold`}>Need Help Booking Test?</Text16>
                            <Text14>Our customer support is here for your help</Text14>
                            <Button variant="contained" className="d-flex align-items-center gap-1 p-2">
                                <Link href={"tel:042-3230479"}>
                                    <MdCall style={{ height: '24px', width: "24px" }} /> Call Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
