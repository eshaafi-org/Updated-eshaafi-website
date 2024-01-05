import { Text24, Text12 } from "@/components/Typography";
import styles from "./Header.module.scss";
import { RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";

export default function Cart({ setShowCart }: { setShowCart: any }) {
  return (
    <section
      className={styles.cartContainer}
      onClick={() => setShowCart(false)}
    >
      <div className={styles.cartSection}>
        <div className={styles.cartAction}>
          <Text24 className="text-dark">Cart</Text24>
          <Button className="text-dark fs-3">
            <RxCross2 />
          </Button>
        </div>
        <ul className={styles.cartItems}></ul>
        <div className={styles.cartDetails}>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Text24 className="text-dark fw-bold">Subtotal</Text24>
            <Text24 className="text-dark fw-bold">0.Rs</Text24>
          </div>
          <Text12 className="mb-4 mt-2">
            Discounts and promo codes are applied at checkout
          </Text12>
          <Button variant="contained" className="w-100">
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </section>
  );
}
