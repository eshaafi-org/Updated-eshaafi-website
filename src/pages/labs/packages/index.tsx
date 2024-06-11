import { CardsSkeletonLoader } from "@/components/SkeletonLoader";
import packageIcon from "../../../../public/images/packageIcon.png";
import { Text14, Text16, Text24, Text28 } from "@/components/Typography";
import style from "@/styles/labs.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import { MdCall } from "react-icons/md";
import Head from "next/head";
import AddressBar from "@/components/AddressBar";
import Image from "next/image";
import { addPackageToCart } from "@/views/Labs/labCartSlicer";
import { ToastContainer, toast } from "react-toastify";
let links = [
    { name: "Home", link: "/" },
    { name: "Lab Tests", link: "/labs" },
    { name: "Packages", link: `/labs/packages` },
];
export default function Packages() {
    const dispatch = useDispatch();
    const {
        loading,
        value: { PacakgeResponse },
    } = useSelector((state: any) => state.getLabHomeReducer);
    const value = useSelector((state: any) => state.labCartReducer?.packages)
    const handleAddPackageToCart = (item: any) => {
        const user = localStorage.getItem("user");
        if (user) {
            const itemId = item.pId;
            const isAlreadyInCart = value.some((cartItem: any) => cartItem.pId === itemId);
            // Dispatch the addToCart action from the cart slice
            if (!isAlreadyInCart) {
                // Dispatch the addToCart action from the cart slice
                dispatch(addPackageToCart({ ...item, quantity: 1, totalPackPrice: item?.charges, subTotalPackPrice: item?.subCharges, }));
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
                                        <Image src={item.url ? item.url : packageIcon} alt="Labs Icon"
                                            className={style.imagePackage}
                                            width={82}
                                            height={82}
                                        />
                                        <span className={style.packageText}>
                                            <Text24 className="fw-bold text-dark">
                                                {item.subscriptionName}
                                            </Text24>
                                            <Text16>Includes {item.noOfTests} tests</Text16>
                                            <span className="d-flex gap-2">
                                                <Text14 className={style.blueColor}>Rs.{item?.charges}</Text14>
                                                <Text14 className={style.fadeColor}>Rs.{item?.subCharges}</Text14>
                                            </span>
                                        </span>
                                    </div>
                                    <div className={style.packageButton}>
                                        <Button variant="contained" onClick={() => handleAddPackageToCart(item)}>Book Package</Button>
                                        <Button className="border">
                                            <Link href={"/labs/packages/" + item.pId}>
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
                                    <Link href={"tel:03111151161"}>
                                    <MdCall style={{ height: '24px', width: "24px" }} /> Call Now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
            <ToastContainer />
        </>
    );
}
