/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import AddressBar from "@/components/AddressBar";
import Summary from "@/views/Subscription/Summary";
import style from "@/styles/bookSubscription.module.scss";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import { getSubscriptionPlans } from "@/views/Subscription/planListSlicer";

export default function SubscribePlans() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, value } = useSelector((state: any) => state.planListReducer);

  let links = [
    { name: "Home", link: "/" },
    { name: "My Plans", link: "/subscriptions" },
    { name: "Subscribe Plan", link: `/subscriptions/${id}` },
  ];
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (value.length === 0 && !loading) {
      dispatch(getSubscriptionPlans());
    }
  }, []);
  const planId = typeof id === "string" ? id : undefined;
  const selectedPlan = value.find((category: { plansList: any[] }) =>
    category.plansList.some((plan) => plan.pId === planId)
  )
  return (
    <>
      <Head>
        <title>eShaafi | Payment</title>
      </Head>
      <section className="container">
        <span>
          <h2>Select Payment Method</h2>
          <AddressBar links={links} />
        </span>
        <div className="d-flex align-items-start col-gap-1 position-relative w-100 justify-content-between">
          <div className={style.payment}>
            <h3 className="text-dark pt-4">Payment Method</h3>
            <ul
              className={`d-flex flex-column row-gap-1 col-gap-2 w-100 mt-2 ${style.paymentMethodList}`}
            >
              <li
                className={`${style.paymentMethodItem} border rounded w-100 p-3 d-flex align-items-center`}
              >
                <input
                  type="radio"
                  id="creditDebitCard"
                  name="paymentMethod"
                  checked
                  // style={{ width: "24px", height: "24px" }}
                />
                <label
                  htmlFor="creditDebitCard"
                  className={style.paymentMethodLabel}
                >
                  JazzCash / EasyPaisa / Debit Card
                </label>
              </li>
            </ul>
          </div>
          <Summary
            plan={selectedPlan}
            loading={loading}
          />
        </div>
      </section>
    </>
  );
}
