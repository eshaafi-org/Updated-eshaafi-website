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

export default function Profile({ doctor }: any) {
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
          <div className="flex flex-col row-gap-2 position-relative">
            <h2>Book video consultation with the best doctors</h2>
            <section className="flex justify-between col-gap-1 items-start lg-flex-col lg-row-gap-2">
              <section className="doc-profile w-60 bg-white flex flex-col row-gap-2 lg-w-full">
                {/* profile card */}
                <div className="flex flex-col row-gap-2 border-bottom pb-2">
                  <div className="flex col-gap-2">
                    <div className={style.imageContainer}>
                      <Image
                        src={doctor?.personal_info?.profileUrl}
                        alt="doctor-image"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50px" }}
                      />
                    </div>

                    <span
                      className="flex flex-col"
                      style={{ rowGap: "0.3rem" }}
                    >
                      <h5>
                        {doctor?.personal_info?.firstName} &nbsp;
                        {doctor?.personal_info?.lastName}
                      </h5>
                      <p>{doctor?.specialization}</p>
                      <p>
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        <FaStar style={{ color: "#FFC107" }} />
                        {`${doctor?.rating?.averageRating}/5 (${
                          doctor?.rating?.count + " reviews"
                        })`}
                      </p>
                    </span>
                  </div>
                  <div className="flex col-gap-1 justify-between">
                    <span className="flex flex-col items-center w-full  row-gap-1">
                      <h5>{doctor?.yearsOfExperience} years</h5>
                      <p>Experience</p>
                    </span>
                    <span
                      className="flex flex-col items-center w-full border-left
                  border-right row-gap-1"
                    >
                      <h5>{doctor?.recommended}%</h5>
                      <p className="text-center">Positive feedback</p>
                    </span>
                    <span className="flex flex-col items-center w-full row-gap-1">
                      <h5>{doctor?.videoCallCharges}</h5>
                      <p>Fee in PKR</p>
                    </span>
                  </div>
                </div>
                {/* educational information */}
                <ul
                  className={`flex flex-col row-gap-2 w-full border-bottom pb-2`}
                >
                  <h5>Education</h5>
                  {doctor?.educationalDocuments.map((itm: any, indx: any) => (
                    <li key={indx} className="flex justify-between w-full">
                      <span className="flex flex-col row-gap-0-5">
                        <h4>
                          {itm?.degree} {`(${itm?.field_of_study}) `}
                        </h4>
                        <p>{itm?.location}</p>
                      </span>
                      <p>{moment(itm?.end_date).format("YYYY")}</p>
                    </li>
                  ))}
                </ul>
                {/* work experience */}
                <ul className={`flex flex-col row-gap-2 border-bottom pb-2`}>
                  <h5>Work Experience</h5>
                  {doctor?.experiences.map((itm: any, indx: any) => (
                    <li key={indx} className="flex justify-between">
                      <span className="flex flex-col row-gap-0-5">
                        <h4>{itm?.title}</h4>
                        <p>
                          {itm?.company}, {itm?.location}
                        </p>
                      </span>
                      <p>{moment(itm?.end_date).format("YYYY")}</p>
                    </li>
                  ))}
                </ul>
                {/* about section */}
                <div className="flex flex-col row-gap-1 pb-2 border-bottom">
                  <h5>About</h5>
                  <p>{doctor?.coverLetter}</p>
                </div>
                {/* condition treated */}
                <div className={`flex flex-col row-gap-1 border-bottom  pb-2`}>
                  <h5>Conditions Treated</h5>
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
                <div className={`flex flex-col row-gap-1 border-bottom pb-2`}>
                  <h5>Services</h5>
                  <ul className={style.serviceList}>
                    {doctor?.services.map((service: any, index: any) => (
                      <li key={index} className={style.serviceItem}>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* patient review */}
                <div className="flex flex-col row-gap-2">
                  <h5>Patients Review</h5>
                  <div className={`${style.mainline} flex`}>
                    <div className={style.mainring}>
                      <div className={style.ring}>
                        <div className={style.centered_content}>
                          <div className={style.percent}>
                            {doctor?.rating?.recommended}%
                          </div>
                          <p>Recommend</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 w-full flex flex-col row-gap-2">
                      <div className={style.progress}>
                        <span
                          className="flex justify-between"
                          style={{ marginBottom: "1rem" }}
                        >
                          <h4>Satisfaction</h4>
                          <p>{doctor?.rating?.behaviour}%</p>
                        </span>
                        <span
                          className={style.progressBar}
                          style={{ width: `${doctor?.rating.behaviour}%` }}
                        ></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                      <div className={style.progress}>
                        <span
                          className="flex justify-between "
                          style={{ marginBottom: "1rem" }}
                        >
                          <h4>Recommendation</h4>
                          <p>{doctor?.rating?.recommended}%</p>
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
                <ul className="flex flex-col row-gap-1">
                  {doctor?.review.map((itm: any, indx: any) => (
                    <li key={indx} className="flex flex-col row-gap-1">
                      <h5
                        className="flex items-center col-gap-1"
                        style={{ color: "#009B94" }}
                      >
                        <MdThumbUp style={{ fontSize: "2rem" }} />
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
                <h1>Video Consultation</h1>
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
                    <th>Availbilty</th>
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
                <Link href={"/doctors/" + doctor?.Id + "/booked"}>
                  <Button variant="contained" className="w-full">
                    book appointment
                  </Button>
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
