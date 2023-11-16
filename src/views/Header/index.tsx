"use client";
// dependencies
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./Header.module.scss";
import { navLinks } from "./helper.js";
import logo from "./eshaafi-logo.svg";
import Image from "next/image";
import { Drawer } from "../../components/Drawer";
import Button from "@/components/Button";
import {
  FaPhone,
  FaBars,
  FaWallet,
  FaCartShopping,
  FaWhatsapp,
  FaBell,
  FaUser,
  FaRegCalendarCheck,
} from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { SubLinksModal } from "./SubLinkMenu";
import { Model } from "./LoginSignupModel";
import { createPortal } from "react-dom";
import { BASE_URL } from "@/helper/CONST";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// this component will render only in client,

// Define the props type for the header component
type HeaderProps = {};
// define the header component
const Header: React.FC<HeaderProps> = ({}) => {
  // const uuid = JSON.parse(localStorage.getItem("user"));
  // const [userAuth, setUserAuth] = useState<string | undefined | any>("");
  const [modal, setModal] = useState<boolean>(false);
  let navbarRef = useRef(null);
  const pathName = usePathname();
  // const [show, setShow] = useState<boolean>(false);
  const [showHelpModel, setHelpModel] = useState<boolean>(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // State to track scrolling
  // const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { modalValue, userAuth, drawer } = useSelector(
    (state: any) => state.loginModalReducer
  );
  // console.log(modalValue);
  const handleOpen = useCallback(() => {
    document.body.style.overflow = "hidden";
    dispatch({ type: "loginModalSlice/openDrawer" });
    // setShow(true);
  }, []);
  const handleClose = useCallback(() => {
    document.body.style.overflow = "auto";
    dispatch({ type: "loginModalSlice/closeDrawer" });

    // setShow(false);
  }, []);
  // handling resize
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleModal = () => {
    document.body.style.overflow = "hidden";
    dispatch({ type: "loginModalSlice/open" });
  };
  const logout = () => {
    axios
      .post(BASE_URL + `/auth/signOut`, {
        access_token: userAuth.AccessToken,
        type: 1,
        uuid: userAuth.uuid,
      })
      .then((res) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      })
      .catch((err) => {
        dispatch({ type: "loginModalSlice/clearAuth" });
        localStorage.removeItem("user");
      });
  };

  useEffect(() => {
    const storedValue: any | null = localStorage.getItem("user");
    const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    dispatch({ type: "loginModalSlice/setAuth", payload: uuid });
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than 0
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Attach the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${style.header} ${isScrolled ? style.onScroll : ""}`}
      ref={navbarRef}
    >
      <nav className={style.navbar}>
        <Link href={"/"} className={style.logo} scroll={true}>
          {typeof window !== "undefined" && window.innerWidth > 1024 ? (
            <Image src={logo} alt="terafort-logo" />
          ) : (
            <Image src={logo.src} width={100} height={30} alt="terafort-logo" />
          )}
        </Link>
        {typeof window !== "undefined" && window.innerWidth > 1050 ? (
          <div className="d-flex justify-content-between w-100 align-items-center">
            <ul className={style.navLinks}>
              {navLinks.map((i) => {
                if (i.linkName === "Solutions") {
                  return (
                    <>
                      <li
                        style={{ position: "relative" }}
                        key={i.id}
                        onMouseEnter={() => {
                          setModal(true);
                        }}
                      >
                        <Link href={"/"} className="flex items-center ">
                          {i.linkName}
                          <GoTriangleDown
                            style={{
                              marginLeft: 10,
                            }}
                          />
                        </Link>
                        {modal && (
                          <SubLinksModal
                            onClose={() => setModal(false)}
                            links={i.subLink}
                          />
                        )}
                      </li>
                    </>
                  );
                } else {
                  return (
                    <li
                      key={i.id}
                      className={`${pathName == i.LinkRoute ? "active" : ""}`}
                    >
                      <Link
                        href={i.LinkRoute}
                        style={{
                          color: i.LinkRoute === "/publish" ? "#000" : "",
                        }}
                        scroll={true}
                        className={`flex`}
                      >
                        {i.linkName}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <span className="d-flex col-gap-1 align-items-center">
              {!userAuth?.uuid ? (
                <>
                  <Button variant="outlined" onClick={handleModal}>
                    login/sign up
                  </Button>
                  {modalValue && <Model page="header" />}
                </>
              ) : (
                <>
                  {/* <Link href={"/"}>
                    <Button>
                      <FaWallet style={{ fontSize: 22 }} />
                    </Button>
                  </Link>
                  <Link href={"/"}>
                    <Button>
                      <FaCartShopping style={{ fontSize: 22 }} />
                    </Button>
                  </Link>
                  <Link href={"/"}>
                    <Button>
                      <FaBell style={{ fontSize: 22 }} />
                    </Button>
                  </Link> */}
                  <Button onClick={() => setShowProfile(true)}>
                    {!userAuth.url ? (
                      <FaUser
                        style={{
                          fontSize: 22,
                          borderRadius: "50px",
                        }}
                      />
                    ) : (
                      <Image
                        src={userAuth.url}
                        alt="user-image"
                        width={30}
                        height={30}
                        style={{ borderRadius: 50 }}
                      />
                    )}
                  </Button>
                  {showProfile &&
                    createPortal(
                      <div
                        className={style.profileModal}
                        onClick={() => setShowProfile(false)}
                      >
                        <div className="container position-relative">
                          <ul className={style.profileLinks}>
                            <li className="border-bottom p-2 pb-0">
                              <div className="d-flex flex-column row-gap-0-5">
                                <h4>{userAuth?.name}</h4>
                                <p>{userAuth?.phoneNo}</p>
                              </div>
                            </li>
                            <li className="p-2">
                              <Link
                                href={"/appointments"}
                                className="w-100 d-flex"
                              >
                                Appointments{" "}
                              </Link>
                            </li>
                            {/* <li className="p-1">
                            <Link href={"/"}>Profile</Link>
                          </li>
                          <li className="p-1">
                            <Link href={"/"}>Orders</Link>
                          </li>
                          <li className="p-1">
                            <Link href={"/"}>E-prescription</Link>
                          </li>
                          <li className="p-1">
                            <Link href={"/"}>Medical Records</Link>
                          </li> */}
                            <li className="p-2">
                              <Link
                                href={"/privacy-policy"}
                                className="w-100 d-flex"
                              >
                                Privacy Policy
                              </Link>
                            </li>
                            <li className="border-top p-2">
                              <Button
                                onClick={logout}
                                className="w-100 text-start"
                              >
                                Logout
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </div>,
                      document.body
                    )}
                </>
              )}
              <span style={{ position: "relative" }}>
                <button
                  className="linkBtn mt-0"
                  style={{ paddingRight: 8 }}
                  onMouseEnter={() => {
                    setHelpModel(true);
                  }}
                >
                  Get help
                  <GoTriangleDown style={{ marginLeft: 10 }} />
                </button>
                {showHelpModel && (
                  <SubLinksModal
                    onClose={() => setHelpModel(false)}
                    links={[
                      {
                        icon: <FaPhone style={{ fontSize: "1.5rem" }} />,
                        link: "tel:042-3230479",
                        name: " 042-3230479",
                      },
                      {
                        icon: (
                          <FaWhatsapp
                            style={{ color: "green", fontSize: "1.5rem" }}
                          />
                        ),
                        link: "https://wa.me/+923044442188",
                        name: "03044442188",
                      },
                    ]}
                  />
                )}
              </span>
            </span>
          </div>
        ) : (
          <Button onClick={handleOpen}>
            <FaBars />
          </Button>
        )}
      </nav>
      {/* responsive drawer modal */}
      {window.innerWidth < 1050 && (
        <Drawer anchor="right" open={drawer} onClose={handleClose}>
          {modalValue && <Model page="header" />}
          {userAuth?.name && (
            <span className="p-3 d-flex align-items-center col-gap-1 border-bottom mb-2">
              {!userAuth.url ? (
                <FaUser
                  style={{
                    fontSize: 50,
                  }}
                />
              ) : (
                <Image
                  src={userAuth.url}
                  alt="user-image"
                  width={50}
                  height={50}
                  style={{ borderRadius: 50 }}
                />
              )}
              <span>
                <h4>{userAuth?.name}</h4>
                <p>{userAuth?.phoneNo}</p>
              </span>
            </span>
          )}
          {
            <nav className={style.mobilenavbar}>
              <span className={style.mobileNavbarContainer}>
                {!userAuth?.uuid && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleModal}
                      className="w-50 sm-w-100"
                    >
                      login/sign up
                    </Button>
                  </>
                )}
                <span
                  className="w-50 sm-w-100"
                  style={{ position: "relative" }}
                >
                  <button
                    className="linkBtn d-flex col-gap-1 align-items-center w-100 justify-content-center text text-white mt-0"
                    style={{ padding: "0.8rem 0" }}
                    onClick={() => {
                      setHelpModel(true);
                    }}
                  >
                    Get help
                    <GoTriangleDown />
                  </button>
                  {showHelpModel && (
                    <SubLinksModal
                      onClose={() => setHelpModel(false)}
                      links={[
                        {
                          icon: <FaPhone style={{ fontSize: "1.5rem" }} />,
                          link: "tel:042-3230479",
                          name: " 042-3230479",
                        },
                        {
                          icon: (
                            <FaWhatsapp
                              style={{ color: "green", fontSize: "1.5rem" }}
                            />
                          ),
                          link: "https://wa.me/+923044442188",
                          name: "03044442188",
                        },
                      ]}
                    />
                  )}
                </span>
              </span>
              <ul className="d-flex flex-column mt-1 ">
                {!userAuth?.uuid || (
                  <>
                    {/* <li className={`p-0-5 border-bottom`}>
                    <Link href={"/"}>
                      <Button className="flex col-gap-1 items-center">
                        <FaWallet style={{ fontSize: 20 }} />
                        <span className="flex flex-col items-center justify-center">
                          <h4 className="text-primary">{userAuth?.wallet}/-</h4>
                          <small>Wallet</small>
                        </span>
                      </Button>
                    </Link>
                  </li>
                  <li className={`p-0-5 border-bottom`}>
                    <Link href={"/"}>
                      <Button className="flex col-gap-1 items-center">
                        <FaCartShopping style={{ fontSize: 20 }} />
                        <span className="text-main">Cart</span>
                      </Button>
                    </Link>
                  </li>
                  <li className={`p-0-5 border-bottom`}>
                    <Link href={"/"}>
                      <Button className="flex col-gap-1 items-center">
                        <FaUser style={{ fontSize: 20 }} />
                        <span className="text-main">Profile</span>
                      </Button>
                    </Link>
                  </li>
                  <li className={`p-0-5 border-bottom`}>
                    <Link href={"/"}>
                      <Button className="flex col-gap-1 items-center">
                        <FaRegCalendarCheck style={{ fontSize: 20 }} />
                        <span className="text-main">Appointments</span>
                      </Button>
                    </Link>
                  </li> */}
                    <li className={`p-1 border-bottom`}>
                      <Link href={"/appointments"} onClick={handleClose}>
                        <Button className="d-flex col-gap-1 align-items-center">
                          <FaRegCalendarCheck style={{ fontSize: 20 }} />
                          <span className="text-main">Appointments</span>
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
                {navLinks.map((i) => {
                  if (i.linkName === "Solutions") {
                    return (
                      <li
                        style={{ position: "relative" }}
                        key={i.id}
                        onClick={handleClose}
                        className="border-bottom p-0-5"
                      >
                        <Link href={"/"} className="flex items-center ">
                          <Button className="flex col-gap-1 items-center">
                            {i.icon}
                            <span className="text-main"> {i.linkName}</span>
                          </Button>

                          <GoTriangleDown
                            style={{
                              marginLeft: 10,
                            }}
                          />
                        </Link>
                        {/* {modal && (
                        <ul className="flex w-full flex-col row-gap-1 mt-1">
                          {i.subLink.map((itm, indx) => (
                            <li
                              key={indx}
                              onClick={() => setShow(false)}
                              className="p-0-5 ml-1"
                            >
                              <Link href={itm.link}>{itm.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )} */}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={i.id}
                        className={`${
                          pathName == i.LinkRoute ? "active" : ""
                        } p-0-5 border-bottom`}
                        onClick={handleClose}
                      >
                        <Link
                          href={i.LinkRoute}
                          style={{
                            color: i.LinkRoute === "/publish" ? "#000" : "",
                          }}
                          scroll={true}
                          className={` w-100  `}
                        >
                          <Button className="d-flex w-100 align-items-center col-gap-1 py-2">
                            {i.icon}
                            <span className="text-main"> {i.linkName}</span>
                          </Button>
                        </Link>
                      </li>
                    );
                  }
                })}
                {userAuth?.uuid && (
                  <li className="p-0-5">
                    <Button
                      className="d-flex col-gap-1 align-items-center w-100"
                      onClick={logout}
                    >
                      <FiLogOut style={{ fontSize: 20 }} />
                      <span className="text-main"> Logout</span>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          }
        </Drawer>
      )}
    </header>
  );
};
export default Header;
