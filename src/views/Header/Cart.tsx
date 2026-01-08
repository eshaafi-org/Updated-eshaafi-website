import { useEffect, useState } from "react";
import { Text24, Text12, Text16, Text14 } from "@/components/Typography";
import styles from "./Header.module.scss";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "@/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { useRouter } from "next/router";
import Image from "next/image";
import labIcon from "../../../public/images/labIcon.png"
import Link from "next/link";
export default function Cart({ setShowCart }: { setShowCart: any }) {
  const defaultState = {
    cart: [],
    packages: [],
    totalAmount: 0,
  };
  // function for handle local storage data updation
  function useInitialState() {
    const [initialState, setInitialState] = useState(defaultState);
    useEffect(() => {
      const updateStateFromLocalStorage = () => {
        const stateFromLocalStorage = localStorage.getItem('labCartState');
        if (stateFromLocalStorage) {
          setInitialState(JSON.parse(stateFromLocalStorage));
        }
      };
      // Listen for storage events (cross-tab updates)
      window.addEventListener('storage', (event) => {
        if (event.key === 'labCartState') {
          updateStateFromLocalStorage();
        }
      });
      // Listen for custom events (same-tab updates)
      window.addEventListener('local_storage_update', updateStateFromLocalStorage);
      // Initial load
      updateStateFromLocalStorage();
      return () => {
        window.removeEventListener('storage', updateStateFromLocalStorage);
        window.removeEventListener('local_storage_update', updateStateFromLocalStorage);
      };
    }, []);
    return initialState;
  }
  const initialState = useInitialState();
  const { cart, totalAmount, packages } = useSelector(
    (state: any) => state.labCartReducer
  )
  const currentCart = cart.length >= 0 ? cart : initialState.cart;
  const currentPackages = packages.length >= 0 ? packages : initialState.packages;
  const currentTotalAmount = totalAmount >= 0 ? totalAmount : initialState.totalAmount;
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
          {currentCart.length > 0 && (
            <>
              <Text16 className="fw-bold">Tests:</Text16>
              {currentCart.map((item: any, indx: number) => (
                <CartItem key={indx} item={item} />
              ))}
            </>
          )}
          {currentPackages.length > 0 && (
            <>
              <Text16 className="fw-bold">Packages:</Text16>
              {currentPackages.map((item: any, indx: number) => (
                <PackageItem key={indx} item={item} />
              ))}
            </>
          )}
        </ul>
        <div className={styles.cartDetails}>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Text24 className="text-dark fw-bold">Subtotal</Text24>
            <Text24 className="text-dark fw-bold">Rs. {currentTotalAmount}</Text24>
          </div>
          {/* <Text12 className="mb-4 mt-2">
            Discounts and promo codes are applied at checkout
          </Text12> */}
          <Button variant="contained" className="w-100" onClick={handleProceedToCheckout}
            disabled={currentCart.length === 0 && currentPackages.length === 0}
          >
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
      <div className="d-flex align-items-center gap-1">
        <Image
          src={item.url || labIcon}
          alt="Lab Image"
          width={48}
          height={48}
        />
        <span>
          <Text16 className="text-capitalize text-dark fw-bold">
            {item.MedicineName.slice(0, 15)}...
          </Text16>
          <span className="d-flex gap-1">
            <Text14 className={`${styles.blueColor} text-primary fw-bold`}>
              Rs. {item.productPrice}
            </Text14>
            <Text14 className={`${styles.fadeColor} fw-bold text-decoration-line-through`}>
              Rs. {item.subPrice}
            </Text14>
          </span>
        </span>
      </div>
      <span className={styles.cartControls}>
        {item.quantity > 1 ? <Button
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
              dispatch({
                type: 'labCartSlicer/addQuantity', payload: {
                  barcode: item.barcode,
                  quantity: counter - 1,
                  totalPrice: parseInt(item.totalPrice) - parseInt(item.productPrice),
                  subTotalPrice: parseInt(item.subTotalPrice) - parseInt(item.subPrice),
                }
              })
            }
          }}
        >
          <LuMinus />
        </Button> : <Button
          onClick={() =>
            dispatch({
              type: "labCartSlicer/removeCartItem",
              payload: item.barcode,
            })
          }
        >
          <RiDeleteBin5Line />
        </Button>}
        <p className="text-primary">{counter}</p>
        <Button onClick={() => {
          setCounter(counter + 1)
          dispatch({
            type: 'labCartSlicer/addQuantity', payload: {
              barcode: item.barcode, quantity: counter + 1,
              totalPrice: parseInt(item.productPrice) + parseInt(item.totalPrice),
              subTotalPrice: parseInt(item.subPrice) + parseInt(item.subTotalPrice),
            }
          })
        }}>
          <GoPlus />
        </Button>
      </span>
    </li>
  );
};
const PackageItem = ({ key, item }: { key: number; item: any }) => {
  const [counter, setCounter] = useState(item.quantity);
  const dispatch = useDispatch();
  return (
    <li key={key} className={styles.cartItem}>
      <Link href={`/labs/packages/${item.pId}`}>
        <div className="d-flex align-items-center gap-1">
          <Image
            src={item.url || labIcon}
            alt="Lab Image"
            width={48}
            height={48}
          />
          <span>
            <Text16 className="text-capitalize text-dark fw-bold">
              {item.subscriptionName.slice(0, 15)}...
            </Text16>
            <span className="d-flex gap-1">
              <Text14 className={`${styles.blueColor} text-primary fw-bold`}>
                Rs. {item?.charges}
              </Text14>
              <Text14 className={`${styles.fadeColor} fw-bold text-decoration-line-through`}>
                Rs. {item?.subCharges}
              </Text14>
            </span>
          </span>
        </div>
      </Link>
      <span className={styles.cartControls}>
        {item.quantity > 1 ? <Button
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
              dispatch({
                type: 'labCartSlicer/addQuantity', payload: {
                  pId: item.pId,
                  quantity: counter - 1,
                  totalPackPrice: parseInt(item.totalPackPrice) - parseInt(item.charges),
                  subTotalPackPrice: parseInt(item.subTotalPackPrice) - parseInt(item.subCharges),
                }
              })
            }
          }}
        >
          <LuMinus />
        </Button> : <Button
          onClick={() =>
            dispatch({
              type: "labCartSlicer/removeCartItem",
              payload: item.pId,
            })
          }
        >
          <RiDeleteBin5Line />
        </Button>}
        <p className="text-primary">{counter}</p>
        <Button onClick={() => {
          setCounter(counter + 1)
          dispatch({
            type: 'labCartSlicer/addQuantity', payload: {
              pId: item.pId, quantity: counter + 1,
              totalPackPrice: parseInt(item.charges) + parseInt(item.totalPackPrice),
              subTotalPackPrice: parseInt(item.subCharges) + parseInt(item.subTotalPackPrice),
            }
          })
        }}>
          <GoPlus />
        </Button>
      </span>
    </li>
  );
};
