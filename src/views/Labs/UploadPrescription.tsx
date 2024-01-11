import style from "@/styles/labs.module.scss";
import Button from "@/components/Button";
import { Text28 } from "@/components/Typography";
import labPrescriptionImage from "../../../public/images/labsPrescriptionImage.png";
import { FaFilePrescription } from "react-icons/fa";
import Link from "next/link";

export default function UploadPrescription() {
  return (
    <section className="container pt-0">
      <div className={style.uploadingPrescription}>
        <div className={style.prescriptionText}>
          <Text28 className="text-dark fw-bold">
            Book lab tests instantly just by uploading prescription
          </Text28>
          <Link href={"/labs/upload"}>
            <Button
              variant="contained"
              className="mt-3 d-flex align-items-center col-gap-0-5"
            >
              <FaFilePrescription />
              Upload Prescription
            </Button>
          </Link>
        </div>
        <div
          className={style.prescriptionImg}
          style={{ backgroundImage: `url(${labPrescriptionImage.src})` }}
        ></div>
      </div>
    </section>
  );
}
