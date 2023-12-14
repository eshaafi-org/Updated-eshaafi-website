import AddressBar from '@/components/AddressBar'
import {plans} from '@/helper/plans'
import { useRouter } from 'next/router'

export default function SubscribePlans() {
let links = [
    { name: "Home", link: "/" },
    { name: "My Plans", link: "/subscriptions" },
    { name: "Subscribe Plan", link: ` ` },
  ];

    return (
        <section className="container">
            <span>
                <h2>Select Payment Method</h2>
                <AddressBar links={links} />
            </span>
        </section>
    )
}