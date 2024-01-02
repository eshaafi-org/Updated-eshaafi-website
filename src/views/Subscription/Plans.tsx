"use client";
import { useState, useEffect, Key } from "react";
import style from "@/styles/subscription.module.scss";
import {
  Text22,
  Text16,
  Text28,
  Text11,
  Text18,
} from "@/components/Typography";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";
import { BASE_URL, headers } from "@/helper/CONST";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { requestPlans, receivePlans, plansError } from "./planListSlicer";
import { useRouter } from "next/router";
// View Details Modal
function DetailModal({ plan, selectedPlan }: { plan: any; selectedPlan: any }) {
  // states
  const [show, setShow] = useState(false);
  // modal open and close function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* Button where Modal open */}
      <Button className="w-100 mt-3" onClick={handleShow}>
        View Detail
      </Button>
      {/* Modal of Detail  */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={style.customModal}
      >
        <Modal.Header>
          {/* Close button on the left */}
          <Button className="btn btn-sm btn-link" onClick={handleClose}>
            <RxCross2 style={{ fontSize: "1.5rem", color: "#6c757d" }} />
          </Button>
          <div className="d-flex justify-content-center w-100">
            {/* Title in the center */}
            <Text18 className={"text-dark fw-bolder"}>View Details</Text18>
          </div>
        </Modal.Header>
        <div className="d-flex flex-column p-4">
          <Text22 className="text-dark">
            {selectedPlan?.noOfCalls} Call In
          </Text22>
          <Text28 className="text-dark">
            <span className={style.price}>Rs. {selectedPlan?.charges}</span>
          </Text28>
          <p>Make three calls in {plan?.planCategory}</p>
          <ul className="my-3">
            <Text16 className={"text-dark fw-bolder"}>What it Includes?</Text16>
            {Array.isArray(selectedPlan?.includes) &&
              selectedPlan?.includes.map((itm: string, indx: number) => (
                <li key={indx} className="m-2">
                  <IoCheckmark
                    style={{
                      color: "#0EA472",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                    }}
                  />
                  {itm}
                </li>
              ))}
          </ul>
          <Text16 className={"text-dark fw-bolder"}>Timeline</Text16>
          <div className="d-flex gap-1 mb-2 mt-1">
            <Text11 className={style.timeline}>
              {selectedPlan?.speclization}
            </Text11>
          </div>
          <Text16 className={"text-dark fw-bolder mt-1"}>
            Terms and Conditions
          </Text16>
          <p className="mt-2">{selectedPlan?.termsAndConditions}</p>
        </div>
      </Modal>
    </>
  );
}
// const plan component
function Plan({ plan }: { plan: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubscribe = (selectedPlan: { pId: any }) => {
    // Check if the user is present in local storage
    const user = localStorage.getItem("user");
    if (user) {
      // If user is present, use Link to navigate to the next page
      router.push(`/subscriptions/${selectedPlan?.pId}`);
    } else {
      // If user is not present, dispatch the login modal action
      dispatch({ type: "loginModalSlice/signIn" });
    }
  };
  return (
    <>
      {plan.plansList.map((selectedPlan: any, index: number) => (
        <li key={index} className={style.planCard}>
          <Text22 className="text-dark">
            {selectedPlan?.noOfCalls} Call Plan
          </Text22>
          <Text22 className="text-dark">
            <span className={style.price}>Rs. {selectedPlan?.charges}</span> per
            month{" "}
          </Text22>
          <Text16 className={style.saves}>
            Save Rs.{selectedPlan?.saveRupees}
          </Text16>
          <p>Make three calls in {plan?.planCategory}</p>
          <ul className="my-3">
            <Text16 className={"text-dark fw-bolder"}>What it Includes?</Text16>
            {Array.isArray(selectedPlan?.includes) &&
              selectedPlan?.includes.map((itm: string, indx: number) => (
                <li key={indx} className="my-2">
                  <IoCheckmark
                    style={{
                      color: "#0EA472",
                      fontSize: "1.5rem",
                      marginRight: "1rem",
                    }}
                  />
                  {itm}
                </li>
              ))}
          </ul>
          <Button
            className={`${style.subscribe} w-100 mt-3`}
            variant="outlined"
            onClick={() => handleSubscribe(selectedPlan)}
          >
            Subscribe Now
          </Button>
          <DetailModal plan={plan} selectedPlan={selectedPlan} />
        </li>
      ))}
    </>
  );
}
// Button in the Function
function DurationButton({
  duration,
  selectedCategory,
  onClick,
}: {
  duration: string;
  selectedCategory: string;
  onClick: () => void;
}) {
  const isActive = duration === selectedCategory;
  const buttonClassName = `${
    isActive ? style.activeButton : style.normalButton
  }`;

  return (
    <Button onClick={onClick} className={buttonClassName}>
      {duration}
    </Button>
  );
}
// Main Component rendering
export default function SubscriptionPlans() {
  const [selectedCategory, setSelectedCategory] = useState("1 month");
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.planListReducer.value);
  const plans = value;
  // const [plans, setPlans] = useState([] as { planCategory: string }[]);
  const getSubscriptionPlans = () => {
    dispatch(requestPlans());
    axios
      .get(BASE_URL + "/patients/subscription", {
        headers: headers(),
      })
      .then((res) => {
        // setPlans(res.data.response.Items);
        dispatch(receivePlans(res.data.response.Items));
      })
      // .catch((error) => console.log(error));
      .catch((error) => {
        dispatch(plansError(error));
        console.log(error);
      });
  };
  useEffect(() => {
    getSubscriptionPlans();
  }, []);
  const handleCategoryClick = ({ category }: { category: string }) => {
    setSelectedCategory(category);
  };

  const filteredPlans = plans.filter(
    (plan: { planCategory: string }) => plan.planCategory === selectedCategory
  );
  return (
    <section className="container">
      <div
        className={`${style.buttonbg} d-flex justify-content-center mb-3 gap-2`}
      >
        {[1, 3, 6, 12].map((duration) => (
          <DurationButton
            key={duration}
            duration={`${duration} month${duration > 1 ? "s" : ""}`}
            selectedCategory={selectedCategory}
            onClick={() =>
              handleCategoryClick({
                category: `${duration} month${duration > 1 ? "s" : ""}`,
              })
            }
          />
        ))}
      </div>
      <ul className={style.plansContainer}>
        {filteredPlans.map((category: any, index: Key | null | undefined) => (
          <Plan key={index} plan={category} />
        ))}
      </ul>
    </section>
  );
}
