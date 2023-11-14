// dependencies
import style from "@/styles/doctors.module.scss";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { MdThumbUp } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import moment from "moment/moment";
import { BASE_URL } from "@/helper/CONST";
import Head from "next/head";
import AddressBar from "@/components/AddressBar";
//
let links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/doctors" },
];
export default function Profile({ doctor }: any) {
  console.log(doctor?.isOnline);
  return (
    <>
      <Head>
        <title>
          {doctor?.personal_info?.firstName} &nbsp;
          {doctor?.personal_info?.lastName}
        </title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main>
        <section className="container">
          <div className={"d-flex flex-column position-relative"}>
            <span>
              <h2 className={style.docPageHeading}>
                Book video consultation with the best doctors
              </h2>
              <AddressBar links={links} />
            </span>
            <section
              className={
                style.docProfileContainer +
                " d-flex justify-content-between col-gap-1 align-items-start"
              }
            >
              <section
                className={
                  style.profiling + " doc-profile bg-white d-flex flex-column"
                }
              >
                {/* profile card */}
                <div className="d-flex flex-column mt-2 border-bottom pb-3">
                  <div className="d-flex col-gap-1">
                    <div
                      className={`${style.imageContainer}  ${
                        doctor?.isOnline ? style.docOnline : ""
                      }`}
                    >
                      <Image
                        src={doctor?.personal_info?.profileUrl}
                        alt="doctor-image"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50px" }}
                        className={style.docImg}
                      />
                    </div>

                    <span className="d-flex flex-column">
                      <h5 className={style.docTitle}>
                        {doctor?.personal_info?.firstName} &nbsp;
                        {doctor?.personal_info?.lastName}
                      </h5>
                      <p className={style.docSpecialization}>
                        {doctor?.specialization}
                      </p>
                      <p
                        className={
                          style.docSpecialization +
                          " align-items-center d-flex "
                        }
                      >
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107", marginRight: 5 }} />
                        {`${doctor?.rating?.averageRating}/5 (${
                          doctor?.rating?.count + " reviews"
                        })`}
                      </p>
                    </span>
                  </div>
                  <div className="d-flex justify-content-around my-3">
                    <span className="d-flex flex-column align-items-center row-gap-0-5">
                      <h5 className={style.profileExperienceHeading}>
                        {doctor?.yearsOfExperience} years
                      </h5>
                      <p className={style.profileExperienceText}>Experience</p>
                    </span>
                    <span className="d-flex flex-column align-items-center row-gap-0-5">
                      <h5 className={style.profileExperienceHeading}>
                        {doctor?.recommended}%
                      </h5>
                      <p className={style.profileExperienceText}>
                        Positive feedback
                      </p>
                    </span>
                    <span className="d-flex flex-column align-items-center row-gap-0-5">
                      <h5 className={style.profileExperienceHeading}>
                        {doctor?.videoCallCharges}
                      </h5>
                      <p className={style.profileExperienceText}>Fee in PKR</p>
                    </span>
                  </div>
                </div>
                {/* educational information */}
                <ul className={`d-flex flex-column border-bottom py-3`}>
                  <h5 className={style.docSecHeading}>Education</h5>
                  {doctor?.educationalDocuments.map((itm: any, indx: any) => (
                    <li key={indx} className="d-flex  flex-column mb-2">
                      <h4 className={style.docSecSubHeading}>
                        {itm?.degree} {`(${itm?.field_of_study}) `}
                      </h4>
                      <span className="d-flex justify-content-between">
                        <p className={style.docSecDes}>{itm?.location}</p>
                        <p className={style.docSecDes}>
                          {moment(itm?.end_date).format("YYYY")}
                        </p>
                      </span>
                    </li>
                  ))}
                </ul>
                {/* work experience */}
                <ul className={`d-flex flex-column border-bottom py-3`}>
                  <h5 className={style.docSecHeading}>Work Experience</h5>
                  {doctor?.experiences.map((itm: any, indx: any) => (
                    <li key={indx} className="d-flex flex-column  mb-2">
                      <h4 className={style.docSecSubHeading}>{itm?.title}</h4>
                      <span className="d-flex justify-content-between">
                        <p className={style.docSecDes}>
                          {itm?.company}, {itm?.location}
                        </p>
                        <p className={style.docSecDes}>
                          {moment(itm?.end_date).format("YYYY")}
                        </p>
                      </span>
                    </li>
                  ))}
                </ul>
                {/* about section */}
                <div className="d-flex flex-column border-bottom py-3">
                  <h5 className={style.docSecHeading}>About</h5>
                  <p className={style.docText}>{doctor?.coverLetter}</p>
                </div>
                {/* condition treated */}
                <div className={`d-flex flex-column border-bottom py-3`}>
                  <h5 className={style.docSecHeading}>Conditions Treated</h5>
                  <ul className={style.serviceList}>
                    {doctor?.conditionsTreated.map(
                      (conditionsTreated: any, index: any) => (
                        <li key={index} className={style.serviceItem}>
                          {conditionsTreated}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                {/* services */}
                <div className={`d-flex flex-column border-bottom py-3`}>
                  <h5 className={style.docSecHeading}>Services</h5>
                  <ul className={style.serviceList}>
                    {doctor?.services.map((service: any, index: any) => (
                      <li key={index} className={style.serviceItem}>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* patient review */}
                <div className="d-flex flex-column border-bottom py-3 justify-content-center">
                  <h5 className={style.docSecHeading}>Patients Review</h5>
                  <div className={`d-flex justify-content-center`}>
                    <div className={style.mainring}>
                      <div className={style.ring}>
                        <div className={style.centered_content}>
                          <div className={style.reviewText + " fw-bold"}>
                            {doctor?.rating?.recommended}%
                          </div>
                          <p className={style.docSecDes}>Recommend</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 w-full d-flex flex-column justify-content-center row-gap-1 w-100">
                      <div className={style.progress}>
                        <span className="d-flex justify-content-between">
                          <h4 className={style.reviewText}>Satisfaction</h4>
                          <p className={style.docSecDes + " mb-2"}>
                            {doctor?.rating?.behaviour}%
                          </p>
                        </span>
                        <span
                          className={style.progressBar}
                          style={{ width: `${doctor?.rating?.behaviour}%` }}
                        ></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                      <div className={style.progress}>
                        <span className="d-flex justify-content-between">
                          <h4 className={style.reviewText}>Recommendation</h4>
                          <p className={style.docSecDes + " mb-2"}>
                            {doctor?.rating?.recommended}%
                          </p>
                        </span>
                        <span
                          className={style.progressBar}
                          style={{ width: `${doctor?.rating?.recommended}%` }}
                        ></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* recommendations */}
                <ul className="d-flex flex-column border-bottom py-3 row-gap-1">
                  {doctor?.review.map((itm: any, indx: any) => (
                    <li key={indx} className="d-flex flex-column">
                      <h5
                        className={
                          style.docSecHeading +
                          " d-flex align-items-center col-gap-0-5"
                        }
                        style={{ color: "#009B94" }}
                      >
                        <MdThumbUp />
                        Recommended
                      </h5>
                      <p style={{ color: "#192A3E" }}>“{itm.review}”</p>
                      <small className="align-self-end">
                        by {itm?.patientInfo + " "}
                        {moment(itm?.appoint_date).startOf("day").fromNow()}
                      </small>
                    </li>
                  ))}
                </ul>
              </section>
              {/* booking consultation */}
              <section className={style.summary}>
                <h2 className={style.reviewText}>Video Consultation</h2>
                <table>
                  <tr>
                    <th>Fee in Pkr</th>
                    <td>Rs. {doctor?.videoCallCharges}</td>
                  </tr>
                  <tr>
                    <th>Recommendation</th>
                    <td>{doctor?.recommended}%</td>
                    {/* <td>{appointDate}</td> */}
                  </tr>
                  <tr>
                    <th>Availability</th>
                    <td>{doctor?.isOnline ? <p>Online</p> : <p>Offline</p>}</td>
                  </tr>
                </table>
                <p className={`flex justify-between ${style.display}`}>
                  <span className="flex">
                    {doctor?.isOnline ? <p>Online </p> : <p>Offline </p>}
                    <p>{doctor?.recommended}% Recommendation</p>
                  </span>
                  <span>{doctor?.videoCallCharges} Rs.</span>
                </p>
                <Link
                  href={"/doctors/" + doctor?.Id + "/booked"}
                  className="linkBtn d-flex w-100 justify-content-center"
                >
                  book appointment
                </Link>
              </section>
            </section>
          </div>
        </section>
        {/* <Doctors /> */}
      </main>
    </>
  );
}
// // doctor profile page
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let response = await fetch(BASE_URL + "/patients/doctors/filter", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "specialization",
      search: "General Physician",
    }),
  });

  const docData = await response.json();
  // console.log(position);
  const paths = docData.response.Items.map((doc: any) => ({
    params: { id: doc.Id },
  }));
  // console.log(paths);
  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}
export async function getStaticProps({ params: { id } }: any) {
  let response = await fetch(`${BASE_URL}/patients/doctors/${id}`);
  const data = await response.json();
  //   console.log(data.response);
  return {
    props: {
      doctor: data?.response,
    },
    revalidate: 1,
  };
}
