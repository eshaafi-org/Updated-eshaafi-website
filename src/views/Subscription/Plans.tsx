"use client";
import { useState, useEffect } from "react";
import style from "@/styles/subscription.module.scss";
// import { plans } from "@/helper/plans";
import { Text22, Text16, Text28, Text11, Text18 } from "@/components/Typography";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";
import { BASE_URL, headers } from "@/helper/CONST";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import axios from "axios";
// View Details Modal
function DetailModal({ plan }: { plan: any }) {
  const selectedPlan = plan?.plansList?.[0];
  // states
  const [show, setShow] = useState(false);
  // modal open and close function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* Button where Modal open */}
      <Button className="w-100 mt-3" onClick={handleShow}>View Detail</Button>
      {/* Modal of Detail  */}
      <Modal show={show} onHide={handleClose} dialogClassName={style.customModal}>
        <Modal.Header>
          {/* Close button on the left */}
          <Button className="btn btn-sm btn-link" onClick={handleClose}>
            <RxCross2 style={{ fontSize: '1.5rem', color: '#6c757d' }} />
          </Button>
          <div className="d-flex justify-content-center w-100" >
            {/* Title in the center */}
            <Text18 className={"text-dark fw-bolder"}>View Details</Text18>
          </div>
        </Modal.Header>
        <div className="d-flex flex-column p-4">
          <Text22 className="text-dark">{selectedPlan?.noOfCalls} Call In</Text22>
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
            <Text11 className={style.timeline}>{selectedPlan?.speclization}</Text11>
          </div>
          <Text16 className={"text-dark fw-bolder mt-1"}>Terms and Conditions</Text16>
          <p className="mt-2">{selectedPlan?.termsAndConditions}</p>
        </div>
      </Modal>
    </>
  )
}

// const plan component
function Plan({ key, plan }: { key: number; plan: any }) {
  const selectedPlan = plan?.plansList;
  return (
    <li key={key} className={style.planCard}>
      <Text22 className="text-dark">{selectedPlan?.noOfCalls} Call Plan</Text22>
      <Text22 className="text-dark">
        <span className={style.price}>Rs. {selectedPlan?.charges}</span> per month{" "}
      </Text22>
      <Text16 className={style.saves}>Save Rs.{selectedPlan?.saveRupees}</Text16>
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
      <Link href={`/subscriptions/${selectedPlan?.pId}`}>
        <Button className={`${style.subscribe} w-100 mt-3`} variant="outlined">
          Subscribe Now
        </Button>
      </Link>
      <DetailModal plan={plan} />
    </li>
  );
}
// Button in the Function
function DurationButton({ duration, selectedCategory, onClick }: { duration: string; selectedCategory: string; onClick: () => void }) {
  const isActive = duration === selectedCategory;
  const buttonClassName = `${isActive ? style.activeButton : style.normalButton}`;

  return (
    <Button onClick={onClick} className={buttonClassName}>
      {duration}
    </Button>
  );
}
// Main Component rendering
export default function SubscriptionPlans() {
  const [selectedCategory, setSelectedCategory] = useState("1 month");
  const [plans, setPlans] = useState([] as { planCategory: string }[]);
  const getSubscriptionPlans = () => {
    axios
      .get(BASE_URL + "/patients/subscription", {
        headers: headers(),
      })
      .then((res) => {
        setPlans(res.data.response.Items);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getSubscriptionPlans();
  }, []);
  const handleCategoryClick = ({ category }: { category: string }) => {
    setSelectedCategory(category);
  };

  const filteredPlans = plans.filter((plan) => plan.planCategory === selectedCategory);
  return (
    <section className="container">
      <div className="d-flex justify-content-center mb-3 gap-2">
        {[1, 3, 6, 12].map((duration) => (
          <DurationButton
            key={duration}
            duration={`${duration} month${duration > 1 ? 's' : ''}`}
            selectedCategory={selectedCategory}
            onClick={() => handleCategoryClick({ category: `${duration} month${duration > 1 ? 's' : ''}` })}
          />
        ))}
      </div>
      <ul className={style.plansContainer}>
        {/* {plans
          .filter((plan) => plan.planCategory === selectedCategory)
          .map((filteredPlan: any, indx: number) => (
            <Plan key={indx} plan={filteredPlan} />
          ))} */}
        {filteredPlans.map((category, index) => (
          <Plan key={index} plan={category} />
        ))}
      </ul>
    </section>
  );
}
