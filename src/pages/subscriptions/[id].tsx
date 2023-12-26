'use clientS'
import { useState } from "react";
import AddressBar from "@/components/AddressBar";
import { plans } from "@/helper/plans";
import Summary from "@/views/Subscription/Summary";
import style from '@/styles/bookSubscription.module.scss'
import { useRouter } from "next/router";

export default function SubscribePlans() {
  const params = useRouter();
  const { id } = params.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>("Credit/Debit Card");

  const planId = typeof id === "string" ? parseInt(id, 10) : undefined;
  const selectedPlan = plans.find((plan) => plan.id === planId);

  let links = [
    { name: "Home", link: "/" },
    { name: "My Plans", link: "/subscriptions" },
    { name: "Subscribe Plan", link: `/subscriptions/${id}` },
  ];

  const handlePaymentMethodChange = (method: string) => {
    setSelectedMethod((prevMethod) => (prevMethod === method ? null : method));
  };

  return (
    <section className="container">
      <span>
        <h2>Select Payment Method</h2>
        <AddressBar links={links} />
      </span>
      <div className="d-flex align-items-start col-gap-1 position-relative w-100 justify-content-between">
        <div className={style.payment}>
          <h3 className="text-dark">Payment Method </h3>
          <ul className={`d-flex flex-column row-gap-1 col-gap-2 w-100 mt-4 ${style.paymentMethodList}`}>
            <li className={`${style.paymentMethodItem} border rounded w-100 p-3 d-flex align-items-center`}>
              <input
                type="radio"
                id="creditDebitCard"
                name="paymentMethod"
                onChange={() => handlePaymentMethodChange("Credit/Debit Card")}
                checked={selectedMethod === "Credit/Debit Card"}
                style={{ width: '24px', height: '24px' }}
              />
              <label htmlFor="creditDebitCard" className={style.paymentMethodLabel}>
                Credit/Debit Card
              </label>
            </li>
            <li className={`${style.paymentMethodItem} border rounded w-100 p-3 d-flex align-items-center`}>
              <input
                type="radio"
                id="jazzCash"
                name="paymentMethod"
                onChange={() => handlePaymentMethodChange("Jazz Cash")}
                checked={selectedMethod === "Jazz Cash"}
                style={{ width: '24px', height: '24px' }}
              />
              <label htmlFor="jazzCash" className={style.paymentMethodLabel}>
                Jazz Cash
              </label>
            </li>
          </ul>
        </div>
        <Summary plan={selectedPlan} loading={loading} selectedMethod={selectedMethod}/>
      </div>
    </section>
  );
}
