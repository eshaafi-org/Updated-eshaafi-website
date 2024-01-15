import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import Button from "@/components/Button";
import style from "@/styles/labs.module.scss";
import FQuest from "@/views/Doctor/FQuest";
import { labPackagesFAQs } from "@/helper/FAQData";
import { Text24, Text28, Text22, Text14 } from "@/components/Typography";
import Image from "next/image";
import packageIcon from "../../../../public/images/packageIcon.png";
let links = [
  { name: "Home", link: "/" },
  { name: "Lab Tests", link: "/labs" },
  { name: "Packages", link: `/labs/packages/id` },
];
export default function Packages() {
  return (
    <>
      <Head>
        <title>eShaafi | Labs</title>
      </Head>
      <section className="container">
        <span>
          <h2>Packages</h2>
          <AddressBar links={links} />
        </span>
        <div className={style.packageHeader}>
          <div className={style.packageDetails}>
            <Image
              src={packageIcon}
              alt="eshaafi-doctor-online-packages-lab-image"
              className={style.packageIcon}
            />
            <span>
              <Text24>{"Diabetes Plan"}</Text24>
              <p>{"20 Test Included"}</p>
            </span>
          </div>
          <Button variant="contained">Book All Tests</Button>
        </div>
        <div className={style.testsListContainer}>
          <Text28 className="text-dark fw-bold">Select Test</Text28>
          <ul className={style.testsList}>
            {["", "", "", "", ""].map((result, indx) => (
              <li key={indx} className={style.cartDetail}>
                {/* Display the search results here */}
                <Text22 className="text-dark fw-bold text-capitalize">
                  {"adfa"}
                </Text22>
                <p>{"dassff"}</p>
                <Text14 className="text-primary fw-bold">{"1000 Rs."}</Text14>
                <Button
                  variant="contained"
                  className={`${style.cartButton} mt-2`}
                  // onClick={() => handleAddToCart(result)}
                >
                  Add to Cart
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <FQuest
          quests={labPackagesFAQs}
          heading={"Frequently Asked Questions"}
        />
      </section>
    </>
  );
}
