import Link from "next/link";
export default function Mission() {
  return (
    <section className="w-100 bg-white">
      <div className="container">
        <div className="d-flex row-gap-2 sm-row-gap-0-5 sm-flex-col">
          <span className="w-40 sm-w-100">
            <h3>Our Mission</h3>
            <h2>
              Care That Never <br className="sm-d-none"></br> Quits
            </h2>
          </span>
          <span className="w-60 sm-w-full flex items-center">
            <p className="cardDescription">
              At eShaafi, our mission is to provide continuous care that
              surpasses boundaries and empowers individuals to take control of
              their health. We are committed to delivering accessible, reliable,
              and compassionate healthcare through cutting-edge telemedicine
              solutions.
            </p>
            {/* <Link href={"/"} className="link" style={{ fontSize: 20 }}>
              Read More
            </Link> */}
          </span>
        </div>
      </div>
    </section>
  );
}
