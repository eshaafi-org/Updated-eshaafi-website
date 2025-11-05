import Link from "next/link";
export default function Mission({ heading, subHeading, text }: any) {
  return (
    <section className="w-100 bg-white">
      <div className="container sm-pt-0">
        <h3>{heading}</h3>
        <div className="d-flex row-gap-2 sm-row-gap-0-5 sm-flex-col mt-2 col-gap-1">
          <span className="w-40 sm-w-100">
            <h2>{subHeading}</h2>
          </span>
          <span className="w-60 sm-w-full flex items-center">
            <p>{text}</p>
            {/* <Link href={"/"} className="link" style={{ fontSize: 20 }}>
              Read More
            </Link> */}
          </span>
        </div>
      </div>
    </section>
  );
}
