import AddressBar from "@/components/AddressBar";
import Button from "@/components/Button";
import style from '@/styles/labs.module.scss'
import { InputField } from "@/components/InputField";
import { Text16, Text18, Text22 } from "@/components/Typography";
import cod from "../../../public/images/cod.svg"
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";


export default function Checkout() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/labs/id` },
        { name: "Checkout", link: `/labs/Checkout` },
    ];
    return (
        <section className="container">
            <span>
                <h2>Checkout</h2>
                <AddressBar links={links} />
            </span>
            <div className="d-flex justify-content-between col-gap-1">
                <div className={style.orderDetail}>
                    <h2>Order Detail</h2>
                    <div className="p-3">
                        <span className="d-flex align-items-center justify-content-between">
                            <Text22>HbA1C</Text22>
                            <Text16>Rs. 1000</Text16>
                        </span>
                        <Text16>Glycated Hb test 1X</Text16>
                    </div>
                    <div>
                        <h2>Payment Method</h2>
                        <div className="d-flex align-items-center border rounded p-3 col-gap-1 mt-3">
                            <Image
                                src={cod}
                                alt="COD"
                                width={24}
                                height={24}
                            />
                            <Text22>Cash on Delivery</Text22>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <h2>Address</h2>
                            <span className="d-flex align-items-center gap-1">
                                <FaPlus />
                                <Text16>Add New Address</Text16>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${style.summary} d-flex flex-column p-4`}>
                    <Text18>Order Summary</Text18>
                    <table className="w-100">
                        <tbody className="d-flex flex-column row-gap-4">
                            <tr>
                                <th>Tests</th>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th>Total Charges</th>
                                <td>Rs. 250</td>
                            </tr>
                            <tr>
                                <th>Payment Method</th>
                                <td>COD</td>
                            </tr>
                        </tbody>
                    </table>
                    <span className="w-100 d-flex">
                        <InputField placeHolder="Discount code or promo code" />
                        <Button className={style.applyButton}>Apply</Button>
                    </span>
                    <Button className={style.uploadButton}>Place Order</Button>
                </div>
            </div>
        </section>
    )
}
