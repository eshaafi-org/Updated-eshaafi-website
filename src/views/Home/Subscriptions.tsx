import Link from "next/link";
import Image from "next/image";
import subscription from "../../../public/images/subscription.png";

export default function Subscriptions() {
  return (
    <section className="w-full bg-white">
      <div className="container">
        <div className="flex justify-between sm-flex-col sm-row-gap-1 col-gap-1">
          <div className="flex flex-col row-gap-1 items-start w-1-2 sm-w-full">
            <h3>Subscription Plans</h3>
            <h2>Subscription Plans</h2>
            <p className="text-2">
              Subscribe to eShaafi plans to experience uninterrupted
              telemedicine experience. See our plans and select any that meets
              your preference.{" "}
            </p>
            <Link href={"/"} className="linkBtn">
              View All Plans
            </Link>
          </div>
          <span>
            <Image
              src={subscription}
              alt="subscription plans"
              style={{ width: "100%", height: "auto" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
