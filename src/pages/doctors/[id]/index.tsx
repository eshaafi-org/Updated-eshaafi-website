// dependencies
import { useState, useEffect } from "react";
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
import Doctors from "@/views/Home/Doctors";
import axios from "axios";
import { useRouter } from "next/router";
//
let links = [
  { name: "Home", link: "/" },
  { name: "Doctors", link: "/find-doctors" },
];
export default function Profile({ doctor, doctors }: any) {
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loadmoreReviews = () => {
    setLoading(true);
    axios
      .get(BASE_URL + `/patients/doctors/${router.query.id}/reviews`)
      .then((res) => {
        setLoading(false);
        setReviews(res.data.response.reviews ? res.data.response.reviews : []);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setReviews(doctor?.review || []);
  }, []);
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
                style={{ paddingTop: "1rem" }}
              >
                {/* profile card */}
                <div className="d-flex flex-column mt-2 border-bottom pb-3">
                  {/* Profile hero: centered avatar, rating, exp pill, name, specialization, CTA */}
                  <div className={style.profileHero}>
                    <div
                      className={`${style.imageContainer}  ${
                        doctor?.isOnline ? style.docOnline : ""
                      }`}
                    >
                      <Image
                        src={doctor?.personal_info?.profileUrl}
                        alt="doctor-image"
                        width={160}
                        height={160}
                        style={{ borderRadius: "50%" }}
                        className={style.docImg}
                      />
                    </div>

                    <div className={style.ratingRow}>
                      <div className={style.ratingBadgeSmall}>
                        <FaStar style={{ color: "#F5B400" }} />
                        {(Number(doctor?.rating?.averageRating) || 0).toFixed(1)}
                      </div>
                      <div className={style.expPill}>
                        {doctor?.yearsOfExperience || "0"}+ year Exp
                      </div>
                    </div>

                    <h5 className={style.docTitle}>
                      {doctor?.personal_info?.firstName} &nbsp;
                      {doctor?.personal_info?.lastName}
                    </h5>
                    <p className={style.docSpecialization}>{doctor?.specialization}</p>

                    <Link
                      href={`/doctors/${doctor?.Id}/booked`}
                      className={`linkBtn ${style.bookBtn}`}
                    >
                      Book Appointment
                    </Link>
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
                        {doctor?.recommended || "0"}%
                      </h5>
                      <p className={style.profileExperienceText}>
                        Positive feedback
                      </p>
                    </span>
                    <span className="d-flex flex-column align-items-center row-gap-0-5">
                      <h5 className={style.profileExperienceHeading}>
                        Rs {doctor?.videoCallCharges}
                      </h5>
                      <p className={style.profileExperienceText}>Consultation</p>
                    </span>
                  </div>
                </div>
                {/* educational information */}
                <ul className={`d-flex flex-column border-bottom py-3 ${style.sectionList}`}>
                  <h5 className={style.docSecHeading}>Education</h5>
                  {doctor?.educationalDocuments.map((itm: any, indx: any) => (
                    <li key={indx} className={`d-flex justify-content-between align-items-start mb-3 ${style.eduItem}`}>
                      <div className="left">
                        <h4 className={style.docSecSubHeading}>{itm?.degree} {`(${itm?.field_of_study}) `}</h4>
                        <p className={style.docSecDes}>{itm?.location}</p>
                      </div>
                      <div className="right">
                        <p className={style.docSecDes}>{moment(itm?.end_date).format("YYYY")}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* work experience */}
                <ul className={`d-flex flex-column border-bottom py-3 ${style.sectionList}`}>
                  <h5 className={style.docSecHeading}>Work Experience</h5>
                  {doctor?.experiences.map((itm: any, indx: any) => (
                    <li key={indx} className={`d-flex justify-content-between align-items-start mb-3 ${style.eduItem}`}>
                      <div className="left">
                        <h4 className={style.docSecSubHeading}>{itm?.title}</h4>
                        <p className={style.docSecDes}>{itm?.company}, {itm?.location}</p>
                      </div>
                      <div className="right">
                        <p className={style.docSecDes}>{moment(itm?.end_date).format("YYYY")}</p>
                      </div>
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
                <div className={`d-flex flex-column border-bottom py-3 ${style.patientReviewSection}`}>
                  <h5 className={style.docSecHeading}>Patient Review</h5>
                  <div className={style.patientReviewSummary}>
                    <div className={style.summaryLeft}>
                      <div className={style.reviewAvg}>{(Number(doctor?.rating?.averageRating) || 0).toFixed(1)}</div>
                      <div className={style.reviewStars}>
                        <FaStar style={{ color: "#F5B400" }} />
                        <FaStar style={{ color: "#F5B400" }} />
                        <FaStar style={{ color: "#F5B400" }} />
                        <FaStar style={{ color: "#F5B400" }} />
                        <FaStar style={{ color: "#F5B400" }} />
                      </div>
                    </div>
                    <div className={style.summaryRight}>
                      <div className={style.progress}>
                        <span className="d-flex justify-content-between">
                          <h4 className={style.reviewText}>5 stars</h4>
                          <p className={style.docSecDes + " mb-2"}>486</p>
                        </span>
                        <span className={style.progressBar} style={{ width: `80%` }}></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                      <div className={style.progress}>
                        <span className="d-flex justify-content-between">
                          <h4 className={style.reviewText}>4 stars</h4>
                          <p className={style.docSecDes + " mb-2"}>74</p>
                        </span>
                        <span className={style.progressBar} style={{ width: `30%` }}></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                      <div className={style.progress}>
                        <span className="d-flex justify-content-between">
                          <h4 className={style.reviewText}>3 stars</h4>
                          <p className={style.docSecDes + " mb-2"}>14</p>
                        </span>
                        <span className={style.progressBar} style={{ width: `20%` }}></span>
                        <span className={style.progressBarLight}></span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* recommendations */}
                <ul className="d-flex flex-column border-bottom py-3 row-gap-1">
                  {reviews.map((itm: any, indx: any) => (
                    <li key={indx} className={`d-flex flex-column ${style.reviewItemRow}`}>
                      <small className={style.reviewDate}>{moment(itm?.appoint_date).format("MMM D, YYYY")}</small>
                      <div className="d-flex align-items-center col-gap-1 my-2">
                        <div className={style.reviewAvatar}>
                          {String(itm?.patientInfo || "").split(" ").map((n:any)=>n[0]).slice(0,2).join("")}
                        </div>
                        <div>
                          <div className={style.reviewStarsInline}>
                            <FaStar style={{ color: "#F5B400" }} />
                            <FaStar style={{ color: "#F5B400" }} />
                            <FaStar style={{ color: "#F5B400" }} />
                            <FaStar style={{ color: "#F5B400" }} />
                            <FaStar style={{ color: "#F5B400" }} />
                          </div>
                          <div className={style.reviewAuthor}>{itm?.patientInfo}</div>
                        </div>
                      </div>
                      <p className={style.reviewTextItem}>{itm?.review}</p>
                    </li>
                  ))}
                  <Button
                    variant="outlined"
                    className={style.loadmoreReviews}
                    onClick={loadmoreReviews}
                  >
                    {"View all reviews "}
                    {loading && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    )}
                  </Button>
                </ul>
              </section>
            </section>
          </div>
        </section>
        {typeof window !== "undefined" && (
          <Doctors doc={doctors} heading={"More Doctors"} />
        )}
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
  const paths = docData.response.Items.map((doc: any) => ({
    params: { id: doc.Id },
  }));
  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}
export async function getStaticProps({ params: { id } }: any) {
  let response = await fetch(`${BASE_URL}/patients/doctors/${id}`);
  let doc = await fetch(BASE_URL + "/patients/doctors/filter", {
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
  const [profile, doctors] = await Promise.all([response, doc]);
  const data = await profile.json();
  const docData = await doctors.json();
  return {
    props: {
      doctor: data?.response,
      doctors: docData.response.Items,
    },
    revalidate: 1,
  };
}
