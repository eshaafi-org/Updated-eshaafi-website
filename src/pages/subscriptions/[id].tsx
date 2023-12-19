import { useState, useEffect } from "react";
import AddressBar from "@/components/AddressBar";
import { plans } from "@/helper/plans";
import Summary from "@/views/Subscription/Summary";
import PaymentMethod from "@/views/Subscription/Payment";
import { useRouter } from "next/router";

export default function SubscribePlans() {
  const params = useRouter();
  const { id } = params.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>("");
  const [method, setMethod] = useState<string>("-");
  const [response, setResponse] = useState<any>({});

  const planId = typeof id === "string" ? parseInt(id, 10) : undefined;
  const selectedPlan = plans.find((plan) => plan.id === planId);

  let links = [
    { name: "Home", link: "/" },
    { name: "My Plans", link: "/subscriptions" },
    { name: "Subscribe Plan", link: `/subscriptions/${id}` },
  ];
  return (
    <section className="container">
      <span>
        <h2>Select Payment Method</h2>
        <AddressBar links={links} />
      </span>
      <div className="d-flex align-items-start col-gap-1 position-relative w-100 justify-content-between">
        <PaymentMethod
          response={response}
          paymentId={paymentId}
          setPaymentId={setPaymentId}
          setMethod={setMethod}
          navigations={links}
        />
        <Summary plan={selectedPlan} loading={loading} />
      </div>
    </section>
  );
}
