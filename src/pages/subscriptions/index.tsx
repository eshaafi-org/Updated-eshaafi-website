"use client";
import Head from "next/head";
import style from "@/styles/subscription.module.scss";
import { Heading24, Heading40, Text16, Text12 } from "@/components/Typography";
import GetApp from "@/views/Home/GetApp";
import SubscriptionPlans from "@/views/Subscription/Plans";
import Mission from "@/views/Home/Mission";
import useDispatch from "react-redux";
import Hero from "@/views/Home/Hero";
import subscriptionImg from "../../../public/images/subscriptionPlans.png";
import FQuest from "@/views/Doctor/FQuest";
export default function Subscriptions() {
  return (
    <>
      <Head>
        <title>eShaafi | Subscriptions</title>
      </Head>
      <main>
        <Hero
          heading={"Avail Subscriptions Plans by eShaafi"}
          text={
            "Subscribe to our plans to avail discounts and exclusive offers"
          }
          img={subscriptionImg}
          link=""
        />
        <SubscriptionPlans />
        <Mission
          heading={"Benefits"}
          subHeading={"Why subscribe to our plans?"}
          text={
            "eShaafi's subscription plans are designed with your convenience in mind. We understand the importance of uninterrupted access to telehealth services, and that's why we offer exclusive discounts as part of our plans. With eShaafi, you get a one-stop solution for all your healthcare needs."
          }
        />
        <FQuest
          heading="Frequently Asked Questions"
          quests={[
            {
              heading: "What is eShaafi's subscription plan?",
              text: `eShaafi's subscription plan is a membership program that
                  offers exclusive benefits and discounts for accessing
                  telehealth services and addressing healthcare needs. `,
            },
            {
              heading: "Can I cancel my subscription at any time?",
              text: `Yes, you have the flexibility to cancel your eShaafi
                  subscription at any time, and there are no long-term
                  commitments.`,
            },
            {
              heading: "What benefits do I get with these plans?",
              text: ` With an eShaafi subscription, you can enjoy uninterrupted
                  access to telehealth services, receive exclusive discounts on
                  healthcare consultations, prescriptions, and more, all in one
                  place.`,
            },
          ]}
        />
        <GetApp color="#EDF6FE" />
      </main>
    </>
  );
}
