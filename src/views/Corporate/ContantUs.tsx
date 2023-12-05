import style from "@/styles/corporate.module.scss";
import { useState } from "react";
import { Heading24, Heading40 } from "@/components/Typography";
import Image from "next/image";
import contact from "../../../public/images/contact.png";
import { InputField } from "@/components/InputField";
import Button from "@/components/Button";
import { Text11 } from "@/components/Typography";
export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    designation: "",
    noOfEmployees: "",
    email: "",
    phone: "",
  });
  const { name, company, designation, noOfEmployees, email, phone } = form;

  return (
    <div className="container">
      <div className={style.contactusContainer}>
        <div className={style.contactusCover}>
          <Image src={contact} alt="corporate-contact" />
        </div>
        <div className={style.form}>
          <Heading24>Contact Us</Heading24>
          <Heading40>Request a demo with us</Heading40>
          <form
            action=""
            className={style.contactusForm}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(form);
              // Add your form submission logic here
            }}
          >
            <span>
              <InputField
                name="name"
                value={name}
                placeHolder="Name*"
                onBlur={(e: any) => {
                  if (!name) {
                    e.target.classList.add(style.errorClass);
                  } else {
                    e.target.classList.remove(style.errorClass);
                  }
                }}
                onFocus={(e: any) => {
                  e.target.classList.remove(style.errorClass);
                }}
                onChange={(e: any) => {
                  setForm((prev) => {
                    return {
                      ...prev,
                      [e.target.name]: e.target.value,
                    };
                  });
                }}
                // className={name || style.errorClass}
                required={true}
                className="w-100"
              />
              {name && (
                <div>
                  {name.match(/^[a-zA-Z -]{3,}$/) ? (
                    <p></p>
                  ) : (
                    <Text11 className="text-danger">
                      {" "}
                      {`minimum 3 letters (User name can not contain numberic
                          or special characters except -)*`}
                    </Text11>
                  )}
                </div>
              )}
            </span>
            <InputField
              name="company"
              value={company}
              placeHolder="Company Name*"
              onBlur={(e: any) => {
                if (!company) {
                  e.target.classList.add(style.errorClass);
                } else {
                  e.target.classList.remove(style.errorClass);
                }
              }}
              onFocus={(e: any) => {
                e.target.classList.remove(style.errorClass);
              }}
              onChange={(e: any) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              // className={company || style.errorClass}
              required={true}
            />
            <InputField
              name="designation"
              value={designation}
              placeHolder="Designation*"
              onBlur={(e: any) => {
                if (!designation) {
                  e.target.classList.add(style.errorClass);
                } else {
                  e.target.classList.remove(style.errorClass);
                }
              }}
              onFocus={(e: any) => {
                e.target.classList.remove(style.errorClass);
              }}
              onChange={(e: any) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              // className={designation || style.errorClass}
              required={true}
            />
            <InputField
              type="number"
              name="noOfEmployees"
              value={noOfEmployees}
              placeHolder="No. of Employees*"
              onBlur={(e: any) => {
                if (!noOfEmployees) {
                  e.target.classList.add(style.errorClass);
                } else {
                  e.target.classList.remove(style.errorClass);
                }
              }}
              onFocus={(e: any) => {
                e.target.classList.remove(style.errorClass);
              }}
              onChange={(e: any) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              // className={noOfEmployees || style.errorClass}
              required={true}
            />
            <InputField
              type="email"
              name="email"
              value={email}
              placeHolder="Work Email*"
              onBlur={(e: any) => {
                if (!email) {
                  e.target.classList.add(style.errorClass);
                } else {
                  e.target.classList.remove(style.errorClass);
                }
              }}
              onFocus={(e: any) => {
                e.target.classList.remove(style.errorClass);
              }}
              onChange={(e: any) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value,
                  };
                });
              }}
              // className={email || style.errorClass}
              required={true}
            />
            <span>
              <InputField
                type="tel"
                name="phone"
                value={phone}
                placeHolder="Phone Number*"
                onBlur={(e: any) => {
                  if (!phone) {
                    e.target.classList.add(style.errorClass);
                  } else {
                    e.target.classList.remove(style.errorClass);
                  }
                }}
                onFocus={(e: any) => {
                  e.target.classList.remove(style.errorClass);
                }}
                onChange={(e: any) => {
                  setForm((prev) => {
                    return {
                      ...prev,
                      [e.target.name]: e.target.value,
                    };
                  });
                }}
                // className={phone || style.errorClass}
                required={true}
                className="w-100"
              />
              {phone && (
                <div>
                  {phone.match(/^(3|[3][0-5])[0-9]{9}$/) ? (
                    <p></p>
                  ) : (
                    <Text11 className="text-danger">
                      {" "}
                      {`Invalid number (pattren:3000000000)*`}
                    </Text11>
                  )}
                </div>
              )}
            </span>
            <Button variant="contained" className={style.formBtn} type="submit">
              Submit{" "}
              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                ></div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
