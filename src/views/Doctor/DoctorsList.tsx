"use client";
import { useEffect, useState } from "react";
import style from "../../styles/doctors.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { BASE_URL } from "@/helper/CONST";
import axios from "axios";

export default function DoctorList({ list }: any) {
  const [docListing, setDocListing] = useState(list);
  const [filters, setFilters] = useState({
    search: "All", // Search query
  });

  const [docType, setDocType] = useState("General Physician");

  const getDoctors = () => {
    // Determine filter type based on the selected search category
    const filterType =
      filters.search === "" || filters.search === "All"
        ? "category"
        : "specialization";

    axios
      .post(BASE_URL + "/patients/doctors/filter", {
        type: filterType, // Use category if "All", otherwise specialization
        search: filters.search,
      })
      .then((res) => {
        setDocListing(res.data.response.Items);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setDocListing(list); // Initialize with the provided list
  }, []);

  useEffect(() => {
    if (filters.search !== "") {
      getDoctors(); // Fetch doctors whenever the search filter changes
    } else {
      setDocListing(list); // When no filter is set, fallback to the initial list
    }
  }, [filters.search]);
  return (
    <section className="container border-bottom ">
      <h2 className={"mb-2"}>Book video consultation with the best doctors</h2>
      <div className={style.chips}>
        <div className="chip-group" role="radiogroup">
          {/* Chip for "All" category */}
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioAllLabel"
            tabIndex={0}
            role="radio"
            aria-checked={filters.search === "All" ? "true" : "false"}
            onClick={() => setFilters({ search: "All" })}
          >
            <input type="radio" name="radioEx" />
            <span id="radioAllLabel">All</span>
          </div>

          {/* Chip for "General Physician" category */}
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioOneLabel"
            tabIndex={0}
            role="radio"
            aria-checked={
              filters.search === "General Physician" ? "true" : "false"
            }
            onClick={() => setFilters({ search: "General Physician" })}
          >
            <input type="radio" name="radioEx" />
            <span id="radioOneLabel">General Physician</span>
          </div>
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioOneLabel"
            tabIndex={0}
            role="radio"
            aria-checked={
              filters.search === "Skin Specialist" ? "true" : "false"
            }
            onClick={() => setFilters({ search: "Skin Specialist" })}
          >
            <input type="radio" name="radioEx" />
            <span id="radioOneLabel">Skin Specialist</span>
          </div>
          <div
            className="chip chip-checkbox"
            aria-labelledby="radioOneLabel"
            tabIndex={0}
            role="radio"
            aria-checked={
              filters.search === "Child Specialist" ? "true" : "false"
            }
            onClick={() => setFilters({ search: "Child Specialist" })}
          >
            <input type="radio" name="radioEx" />
            <span id="radioOneLabel">Child Specialist</span>
          </div>
        </div>
      </div>

      <div className="d-flex col-gap-1 align-items-star mt-5 sm-mt-1">
        <ul className={style.docList}>
          {docListing?.map((itm: any, indx: string) => (
            <li
              key={indx}
              className={`${style.docCard} d-flex flex-column row-gap-1`}
            >
              {/* Doctor card content */}
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center col-gap-1">
                  <div className={`${style.imageContainer}`}>
                    <Image
                      src={itm.personal_info.profileUrl}
                      alt="doctor-image"
                      className={style.docImg}
                      width={100}
                      height={100}
                    />
                  </div>
                  <span>
                    <h5 className={style.docTitle}>
                      {itm.personal_info.title +
                        ". " +
                        itm.personal_info.firstName +
                        " " +
                        itm.personal_info.lastName}
                    </h5>
                    <p className={style.docSpecialization}>
                      {itm.specialization}
                    </p>
                    {itm.isOnline && (
                      <div className={style.onlineindicator}>
                        <div className={style.onlinecircle}>
                          <div className={style.innercircle}></div>
                        </div>
                        <span className={style.onlinetext}>Online</span>
                      </div>
                    )}
                  </span>
                </div>
                <p className={style.docFee}>Fee Rs.{itm.videoCallCharges}</p>
              </div>

              <div className={style.docExperience}>
                <span className="d-flex flex-column align-items-center ">
                  <h5 className={style.experienceHeading}>
                    {itm.yearsOfExperience} years
                  </h5>
                  <p className={style.experienceText}>Experience</p>
                </span>

                <span className="d-flex flex-column align-items-center w-100  border-end border-start">
                  <h5 className={style.experienceHeading}>
                    <FaStar
                      style={{
                        color: itm?.rating?.averageRating ? "#FFC107" : "#ccc",
                      }}
                    />
                    {itm?.rating?.averageRating || "0"}/5
                  </h5>
                  <p className={style.experienceText}>
                    {itm?.rating?.count} Reviews
                  </p>
                </span>

                <span className="d-flex flex-column align-items-center ">
                  <h5 className={style.experienceHeading}>
                    {itm.recommended || "0"}%
                  </h5>
                  <p className={style.experienceText}>Positive feedback</p>
                </span>
              </div>

              <div className="d-flex justify-content-between col-gap-1">
                <Link
                  href={"/doctors/" + itm.Id}
                  className="linkBtn w-50 bg-white text-primary text-center"
                >
                  view profile
                </Link>
                <Link
                  href={"/doctors/" + itm.Id + "/booked"}
                  className="linkBtn w-50 text-center"
                >
                  book appointment
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className={style.filters + " w-30 "}>
          <div className="bg-main rounded border w-full p-1">
            <p style={{ color: "#222" }}>Specialization</p>
            <select
              name=""
              id=""
              className={style.selectFilter}
              onChange={(e) => setFilters({ search: e.target.value })}
              value={filters.search}
            >
              <option value="" disabled>
                Select Specialization
              </option>
              <option value="All" selected>
                All Doctors
              </option>
              <option value="General Physician">General Physician</option>
              <option value="Child Specialist">Child Specialist</option>
              <option value="Skin Specialist">Skin Specialist</option>
              {/* Add more specializations as needed */}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
