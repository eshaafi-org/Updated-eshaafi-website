"use client";
// dependencies

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "./Header.module.scss";
import { navLinks } from "./helper.js";
import logo from "./eshaafi-logo.png";
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
// this component will render only in client,

// Define the props type for the header component
type HeaderProps = {};
// define the header component
const Header: React.FC<HeaderProps> = ({}) => {
  // const uuid = JSON.parse(localStorage.getItem("user"));
  const [userAuth, setUserAuth] = useState<string | undefined | any>("");
  const [modal, setModal] = useState<boolean>(false);
  let navbarRef = useRef(null);
  const pathName = usePathname();
  const [show, setShow] = useState<boolean>(false);
  const [showHelpModel, setHelpModel] = useState<boolean>(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // State to track scrolling
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const handleOpen = useCallback(() => setShow(true), []);
  const handleClose = useCallback(() => setShow(false), []);
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
    setShowModal(true);
  };
  const logout = () => {
    axios
      .post(BASE_URL + `/auth/signOut`, {
        access_token: userAuth.AccessToken,
        type: 1,
        uuid: userAuth.uuid,
      })
      .then((res) => {
        setUserAuth("");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        console.error("error:", err);
        setUserAuth("");
        localStorage.removeItem("user");
      });
  };

  useEffect(() => {
    const storedValue: any | null = localStorage.getItem("user");
    const uuid: any | null = storedValue ? JSON.parse(storedValue) : null;
    setUserAuth(uuid);
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
      <nav className={style.navbar + " items-center"}>
        <Link href={"/"} className={style.logo} scroll={true}>
          {typeof window !== "undefined" && window.innerWidth > 1024 ? (
            <Image src={logo} alt="terafort-logo" />
          ) : (
            <Image src={logo.src} width={87} height={25} alt="terafort-logo" />
          )}
        </Link>
        {typeof window !== "undefined" && window.innerWidth > 1050 ? (
          <div className="flex justify-between w-full items-center">
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
            <span className="flex col-gap-1 items-center">
              {!userAuth?.uuid ? (
                <>
                  <Button variant="outlined" onClick={handleModal}>
                    login/sign up
                  </Button>
                  {showModal && (
                    <Model
                      setShowModal={setShowModal}
                      userAuth={setUserAuth}
                      page="header"
                    />
                  )}
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
                        <ul className={style.profileLinks}>
                          <li className="border-bottom p-1 pb-0">
                            <div className="flex flex-col">
                              <h4>{userAuth?.name}</h4>
                              <p>{userAuth?.phoneNo}</p>
                            </div>
                          </li>
                          <li className="p-1">
                            <Link href={"/appointments"}>Appointments </Link>
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
                          <li className="p-1">
                            <Link href={"/privacy-policy"}>Privacy Policy</Link>
                          </li>
                          <li className="border-top p-1">
                            <Button
                              onClick={logout}
                              className="w-full text-left"
                            >
                              Logout
                            </Button>
                          </li>
                        </ul>
                      </div>,
                      document.body
                    )}
                </>
              )}
              <span style={{ position: "relative" }}>
                <button
                  className="linkBtn flex col-gap-1 items-center"
                  style={{ paddingRight: 8 }}
                  onMouseEnter={() => {
                    console.log("h");
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
                        link: "whatsapp://send?text=I need your assistance",
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
      <Drawer anchor="right" open={show} onClose={handleClose}>
        {showModal && (
          <Model
            setShowModal={setShowModal}
            userAuth={setUserAuth}
            page="header"
          />
        )}
        {userAuth?.name && (
          <span className="p-1 flex items-center col-gap-1 border-bottom">
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
            <span className="flex col-gap-1 items-center sm-flex-col row-gap-1">
              {!userAuth?.uuid && (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleModal}
                    className="w-full"
                  >
                    login/sign up
                  </Button>
                  <span className="w-full" style={{ position: "relative" }}>
                    <button
                      className="linkBtn flex col-gap-1 items-center w-full justify-center"
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
                            link: "https://wa.me/03044442188?text=I need your assistance.",
                            name: "03044442188",
                          },
                        ]}
                      />
                    )}
                  </span>
                </>
              )}
            </span>
            <ul className="flex flex-col mt-1 ">
              {!userAuth?.url || (
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
                  <li className={`p-0-5 border-bottom`}>
                    <Link href={"/"}>
                      <Button className="flex col-gap-1 items-center">
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
                      onClick={() => {
                        setModal(!modal);
                      }}
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
                      onClick={() => setShow(false)}
                    >
                      <Link href={"/"}></Link>
                      <Link
                        href={i.LinkRoute}
                        style={{
                          color: i.LinkRoute === "/publish" ? "#000" : "",
                        }}
                        scroll={true}
                        className={`flex`}
                      >
                        <Button className="flex col-gap-1 items-center">
                          {i.icon}
                          <span className="text-main"> {i.linkName}</span>
                        </Button>
                      </Link>
                    </li>
                  );
                }
              })}
              {userAuth?.name && (
                <li className="p-0-5">
                  <Button
                    className="flex col-gap-1 items-center"
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
    </header>
  );
};
export default Header;
