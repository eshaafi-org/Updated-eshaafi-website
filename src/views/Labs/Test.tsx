import AddressBar from "@/components/AddressBar";
import Image from "next/image";

export default function Test() {
    let links = [
        { name: "Home", link: "/" },
        { name: "Lab Tests", link: "/labs" },
        { name: "Chughtai Lab", link: `/chughtai}` },
    ];
    return (
        <section className="container">
            <span>
                <h2>Chughtai Lab</h2>
                <AddressBar links={links} />
            </span>
            <div>
                <div>
                    {/* <Image /> */}
                </div>
            </div>
        </section>
    )
}
