import { useState } from "react";
import { Text24, Text12, Text16, Text14 } from "@/components/Typography";
import styles from "./Header.module.scss";
import { RxCross2 } from "react-icons/rx";
import Button from "@/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { useRouter } from "next/router";

export default function Cart({ setShowCart }: { setShowCart: any }) {
  const { cart, totalAmount } = useSelector(
    (state: any) => state.labCartReducer
  );
  const router = useRouter();
  const handleProceedToCheckout = () => {
    router.push("/checkout");
    setShowCart(false);
  };
  return (
    <section className={styles.cartContainer}>
      <div className={styles.cartSection}>
        <div className={styles.cartAction}>
          <Text24 className="text-dark">Cart</Text24>
          <Button className="text-dark fs-3" onClick={() => setShowCart(false)}>
            <RxCross2 />
          </Button>
        </div>
        <ul className={styles.cartItems}>
          {cart.map((item: any, indx: number) => (
            <CartItem key={indx} item={item} />
          ))}
        </ul>
        <div className={styles.cartDetails}>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Text24 className="text-dark fw-bold">Subtotal</Text24>
            <Text24 className="text-dark fw-bold">{totalAmount}.Rs</Text24>
          </div>
          <Text12 className="mb-4 mt-2">
            Discounts and promo codes are applied at checkout
          </Text12>
          <Button variant="contained" className="w-100" onClick={handleProceedToCheckout}>
            Proceed To Checkout
          </Button>
        </div>
      </div>
      <div
        className={styles.cartBackDrop}
        onClick={() => setShowCart(false)}
      ></div>
    </section>
  );
}
const CartItem = ({ key, item }: { key: number; item: any }) => {
  const [counter, setCounter] = useState(item.quantity);
  const dispatch = useDispatch();
  return (
    <li key={key} className={styles.cartItem}>
      <span>
        <Text16 className="text-capitalize text-dark fw-bold">
          {item.MedicineName}
        </Text16>
        <Text14>{item.testDepartment}</Text14>
        <Text14 className="text-primary fw-bold">
          Rs. {item.productPrice}
        </Text14>
      </span>
      <span className={styles.cartControls}>
        <Button
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
              dispatch({ type: 'labCartSlicer/addQuantity', payload: { barcode: item.barcode, quantity: counter - 1, totalPrice: parseInt(item.totalPrice) - parseInt(item.productPrice) } })
            }
          }}
        >
          <LuMinus />
        </Button>
        <p className="text-primary">{counter}</p>
        <Button onClick={() => {
          setCounter(counter + 1)
          dispatch({ type: 'labCartSlicer/addQuantity', payload: { barcode: item.barcode, quantity: counter + 1, totalPrice: parseInt(item.productPrice) + parseInt(item.totalPrice) } })
        }}>
          <GoPlus />
        </Button>
      </span>
      <Button
        onClick={() =>
          dispatch({
            type: "labCartSlicer/removeCartItem",
            payload: item.barcode,
          })
        }
      >
        <RxCross2 />
      </Button>
    </li>
  );
};
