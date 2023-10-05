import { faq } from "@/helper/faqContent";
import style from "@/styles/content.module.scss";
import Head from "next/head";
export default function FAQ() {
  return (
    <>
      <Head>
        <title>Eshaafi | FAQs</title>
        <meta name="description" content="Meet one on one with your doctor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <section className="container">
        <div className={"flex flex-col " + style.contentCont}>
          <span className="w-full">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <p className="mt-1">
              {`Welcome to eShaafi’s Frequently Asked Questions (FAQ) section! We
            understand that using telemedicine services may be a new experience
            for many of our users, and we want to ensure you have all the
            information you need to make the most of our platform. This
            comprehensive FAQ is designed to address common inquiries and
            provide clarity on various aspects of our app, from how to schedule
            an appointment to ensuring the security of your medical data.
            Whether you're a first-time user or a long-time member of our
            telehealth community, we hope this resource proves helpful in
            navigating your virtual healthcare journey with us`}
            </p>
          </span>

          <ol className={"flex flex-col row-gap-2 mt-1 " + style.contentList}>
            {faq.map((itm: any, indx: any) => (
              <li key={indx} className={style.contentListItem}>
                <h3 className={style.mainHeading}>
                  <span className="mr-1">Q{indx + 1}.</span>
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
