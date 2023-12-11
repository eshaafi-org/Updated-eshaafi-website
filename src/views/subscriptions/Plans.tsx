import style from "@/styles/subscription.module.scss";
import { plans } from "@/helper/plans";
import { Text22, Text16 } from "@/components/Typography";
import { IoCheckmark } from "react-icons/io5";
import Button from "@/components/Button";

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
      {/* <Button className="w-100 mt-3" variant="outlined">
        Subscribe Now
      </Button>
      <Button className="w-100 mt-3">View Detail</Button> */}
    </li>
  );
}
export default function SubscriptionPlans() {
  return (
    <section className="container">
      <ul className={style.plansContainer}>
        {plans.map((plan: any, indx: number) => (
          <Plan key={indx} plan={plan} />
        ))}
      </ul>
    </section>
  );
}
