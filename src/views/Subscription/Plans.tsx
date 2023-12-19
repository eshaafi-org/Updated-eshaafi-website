import { useState } from "react";
import style from "@/styles/subscription.module.scss";
import { plans } from "@/helper/plans";
import { Text22, Text16, Text28, Text11, Text18 } from "@/components/Typography";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
// View Details Modal
function DetailModal({ plan }: { plan: any }) {
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
          <Text22 className="text-dark">{plan.calls} Call Plan</Text22>
          <Text28 className="text-dark">
            <span className={style.price}>Rs. {plan.price}</span> per month{" "}
          </Text28>
          <p>{plan.text}</p>
          <ul className="my-3">
            <Text16 className={"text-dark fw-bolder"}>What it Includes?</Text16>
            {plan.includes.map((itm: any, indx: number) => (
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
            <Text11 className={style.timeline}>{plan.timeline}</Text11>
            <Text11 className={style.timeline}>{plan.timeline}</Text11>
          </div>
          <Text16 className={"text-dark fw-bolder mt-1"}>Terms and Conditions</Text16>
          <p className="mt-2">{plan.conditions}</p>
        </div>
      </Modal>
    </>
  )
}

// const plan component
function Plan({ key, plan }: { key: number; plan: any }) {
  return (
    <li key={key} className={style.planCard}>
      <Text22 className="text-dark">{plan.calls} Call Plan</Text22>
      <Text22 className="text-dark">
        <span className={style.price}>Rs. {plan.price}</span> per month{" "}
      </Text22>
      <Text16 className={style.saves}>Save Rs.{plan.saves}</Text16>
      <p>{plan.text}</p>
      <ul className="my-3">
        <Text16 className={"text-dark fw-bolder"}>What it Includes?</Text16>
        {plan.includes.map((itm: any, indx: number) => (
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
      <Link href={`/subscriptions/${plan.id}`}>
      <Button className={`${style.subscribe} w-100 mt-3`} variant="outlined">
        Subscribe Now
      </Button>
      </Link>
      <DetailModal plan={plan} />
    </li>
  );
}
// Button in the Function
function DurationButton({ duration, selectedDuration, onClick }: { duration: string; selectedDuration: string; onClick: () => void }) {
  const isActive = duration === selectedDuration;
  const buttonClassName = `${isActive ? style.activeButton : style.normalButton}`;

  return (
    <Button onClick={onClick} className={buttonClassName}>
      {duration}
    </Button>
  );
}
// Main Component rendering
export default function SubscriptionPlans() {
  const [selectedDuration, setSelectedDuration] = useState("1 Month");

  const handleDurationClick = (duration: string) => {
    setSelectedDuration(duration);
  };
  return (
    <section className="container">
      <div className="d-flex justify-content-center mb-3 gap-2">
        {[1, 3, 6, 12].map((duration) => (
          <DurationButton
            key={duration}
            duration={`${duration} Month${duration > 1 ? 's' : ''}`}
            selectedDuration={selectedDuration}
            onClick={() => handleDurationClick(`${duration} Month${duration > 1 ? 's' : ''}`)}
          />
        ))}
      </div>
      <ul className={style.plansContainer}>
        {plans
          .filter((plan) => plan.duration === selectedDuration)
          .map((filteredPlan: any, indx: number) => (
            <Plan key={indx} plan={filteredPlan} />
          ))}
      </ul>
    </section>
  );
}
