// dependencies
import styles from "@/styles/careers.module.scss";
import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
// import toArrayBuffer from "to-array-buffer";

// const MyTextInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);

//   return (
//     <>
//       <textarea className='text-input' {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className='error'>{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// Publishing form component
export default function ApplicationForm({ data }) {
  // variables
  const [pdf, setPdf] = useState("");
  // uploading the file function
  const uploadFile = async (e) => {
    const [file] = e.target.files || e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = async () => {
      const fileData = reader.result;
      const base64Data = btoa(fileData);
      axios
        .post(
          "https://2qre6ou61c.execute-api.us-east-1.amazonaws.com/dev/pdf-upload-api/upload",
          base64Data
        )
        .then((response) => {
          // console.log('API response:', response.data);
          setPdf(response.data.response.url);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div className={styles.publishForm}>
      <h3 style={{ marginBottom: "2rem" }}>Apply for {data}</h3>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNo: "",
          position: "",
          link: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          position: Yup.string().required("Position is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          phoneNo: Yup.string().required("Phone number is required"),
          link: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post(
              "https://2qre6ou61c.execute-api.us-east-1.amazonaws.com/dev/user/career",
              {
                ...values,
                // applicationFor: data,
                link: pdf,
              }
            )
            .then(() => {
              setSubmitting(false);
              setToast(true);
              resetForm();
              setTimeout(() => {
                setToast(false);
              }, 1000);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.publishFormFields}>
            <fieldset>
              <span>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name*"
                  autoComplete="off"
                />
                <p>
                  <ErrorMessage name="name" />
                </p>
              </span>
              <span>
                <Field
                  name="position"
                  type="text"
                  placeholder="Position*"
                  autoComplete="off"
                />
                <p>
                  <ErrorMessage name="position" />
                </p>
              </span>
              <span>
                <Field
                  name="email"
                  type="text"
                  placeholder="Email*"
                  autoComplete="off"
                />
                <p>
                  <ErrorMessage name="email" />
                </p>
              </span>
              <span className={styles.formField}>
                <Field
                  name="phoneNo"
                  type="text"
                  placeholder="Phone*"
                  maxLength={13}
                />
                <p>
                  <ErrorMessage name="phoneNo" />
                </p>
              </span>
              <span className={styles.cvUploading}>
                <p>Upload CV/Resume</p>
                <input type="file" name="link" onChange={uploadFile} />
                <p>Allowed Type(s): .pdf</p>
              </span>
              {/* <span>
                  <span className={styles.agreement}>
                    <Field name='permission' type='checkbox' />
                    <p>
                      By using this form you agree with the storage and handling of your data by
                      this website.{' '}
                    </p>
                  </span>
                  <p>
                    <ErrorMessage name='permission' />
                  </p>
                </span> */}
            </fieldset>
            <button type="submit" className="flexRowAndCenter">
              Submit
              {/* Submit{isSubmitting && <Loader />} */}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
