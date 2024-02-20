import AddressBar from "@/components/AddressBar";
import Head from "next/head";
import Button from "@/components/Button";
import style from "@/styles/labs.module.scss";
import FQuest from "@/views/Doctor/FQuest";
import { labPackagesFAQs } from "@/helper/FAQData";
import { Text24, Text28, Text22, Text14 } from "@/components/Typography";
import Image from "next/image";
import packageIcon from "../../../../public/images/packageIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { Key } from "react";
import { useRouter } from "next/router";
import { addPackageToCart, addToCart } from "@/views/Labs/labCartSlicer";
import { ToastContainer, toast } from "react-toastify";
let links = [
  { name: "Home", link: "/" },
  { name: "Lab Tests", link: "/labs" },
  { name: "Packages", link: `/labs/packages` },
];
export default function Packages() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const {
    loading,
    value: { PacakgeResponse },
  } = useSelector((state: any) => state.getLabHomeReducer);
  const selectedPackage = PacakgeResponse.find((packageItem: any) => packageItem.pId === id);
  const { packages, cart } = useSelector((state: any) => state.labCartReducer)
  const handleAddPackageToCart = (item: any) => {
    const user = localStorage.getItem("user");
    if (user) {
      const itemId = item.pId;
      const isAlreadyInCart = packages?.some((cartItem: any) => cartItem.pId === itemId);
      // Dispatch the addToCart action from the cart slice
      if (!isAlreadyInCart) {
        // Dispatch the addToCart action from the cart slice
        dispatch(addPackageToCart({ ...item, quantity: 1, totalPackPrice: item.charges, subTotalPackPrice: item.subCharges, }));
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
  const handleAddToCart = (item: any) => {
    const user = localStorage.getItem("user");
    if (user) {
      const itemId = item.Sk;
      const isAlreadyInCart = cart.some((cartItem: any) => cartItem.Sk === itemId);
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
              <Text24>{selectedPackage?.subscriptionName}</Text24>
              <p>{selectedPackage?.noOfTests}{" Test Included"}</p>
              <span className="d-flex gap-2">
                <Text14 className={style.blueColor}>Rs.{selectedPackage?.charges}</Text14>
                <Text14 className={style.fadeColor}>Rs.{selectedPackage?.subCharges}</Text14>
              </span>
            </span>
          </div>
          <Button variant="contained" onClick={() => handleAddPackageToCart(selectedPackage)}>Book All Tests</Button>
        </div>
        <div className={style.testsListContainer}>
          <Text28 className="text-dark fw-bold">Select Test</Text28>
          <ul className={style.testsList}>
            {/* {["", "", "", "", ""].map((result, indx) => ( */}
            {(selectedPackage?.selectTest || []).map((result: any, indx: Key) => (
              <li key={indx} className={style.cartDetail}>
                {/* Display the search results here */}
                <Text22 className="text-dark fw-bold text-capitalize">
                  {result.MedicineName}
                </Text22>
                <span className="d-flex gap-2">
                  <Text14 className={style.blueColor}>Rs.{result.productPrice}</Text14>
                  <Text14 className={style.fadeColor}>Rs.{result.subPrice}</Text14>
                </span>
                <Button
                  variant="contained"
                  className={`${style.cartButton} mt-2`}
                  onClick={() => handleAddToCart(result)}
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
      <ToastContainer />
    </>
  );
}
