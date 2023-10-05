import { termsAndConditions } from "@/helper/termsAndConditionsContent";
import style from "@/styles/content.module.scss";
import Head from "next/head";
export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Eshaafi | Terms and Conditions</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <section className="container">
        <div className={"flex flex-col " + style.contentCont}>
          <span className="w-full">
            <h2 className="text-center">Terms and Conditions</h2>
            <p className="mt-1">
              Welcome to eShaafi! We are dedicated to enabling and empowering
              you to make smart choices for your health and well-being. Our
              mission is to provide you with a platform that empowers you to
              seek personalized and pertinent health advice and support your
              doctor-patient relationship by making it more accessible,
              affordable, and intelligent. Here you can find all the terms and
              conditions that we apply in order to provide our services as
              defined below at the optimum level of our standards.
            </p>
            <p className="mt-1">
              As a condition of your use of any of our platforms, you warrant
              that you are at least 18 years of age. We only accept prescription
              orders from customers who are 18 years old or over although they
              may order prescriptions for persons who are under 18. By placing
              an order, you confirm that you are at least 18. If you do not meet
              the minimum age requirement, you must immediately discontinue your
              use and access to the website.
            </p>
            <p className="mt-1 font-bolder">
              PLEASE READ THE FOLLOWING TERMS AND CONDITIONS CAREFULLY. THESE
              CONTAIN IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS AS
              WELL AS LIMITATIONS AND EXCLUSIONS THAT APPLY TO OUR SERVICES.
            </p>
          </span>
          <ol className={"flex flex-col row-gap-2 mt-1 " + style.contentList}>
            {termsAndConditions.map((itm: any, indx: any) => (
              <li key={indx} className={style.contentListItem}>
                <h3 className={style.mainHeading}>
                  <span className="mr-1">{indx + 1}.</span>
                  {itm.heading}
                </h3>

                <p>{itm.headingText}</p>
                <ul className="flex flex-col row-gap-1 mt-1">
                  {itm.sub.map((subItem: any, indx: any) => (
                    <li key={indx}>
                      <h3 className={style.subHeading}>{subItem.subHeading}</h3>
                      <p>{subItem.subHeadingText}</p>
                      <ul className={style.pointsList}>
                        {subItem.subPoints.map((points: any, index: any) => (
                          <li key={index}>
                            <p>{points}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
