import { privacy } from "@/helper/privacyContent";
import {
  gamingPrivacy,
  gamingPrivacyIntro,
  GAMING_PRIVACY_UPDATED,
} from "@/helper/gamingPrivacyContent";
import style from "@/styles/content.module.scss";
import Head from "next/head";
export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Eshaafi | Privacy Policy</title>
        <meta
          name="description"
          content="Privacy policy for eShaafi and its games and apps"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <section className="container">
        <div className={"flex flex-col " + style.contentCont}>
          <span className="w-full">
            <h2 className="text-center mb-3">Privacy Policy</h2>
            <p className="mt-3">
              This page contains two privacy policies. Part 1 covers eShaafi,
              our healthcare platform (website and mobile app). Part 2 covers
              eShaafi Games, our mobile games and apps. Please
              read the part that applies to the service you use.
            </p>
            <ul className={style.pointsList + " mt-2"}>
              <li>
                <p>
                  <a href="#eshaafi-policy">Part 1: eShaafi Privacy Policy</a>
                </p>
              </li>
              <li>
                <p>
                  <a href="#gaming-policy">
                    Part 2: eShaafi Games Privacy Policy
                  </a>
                </p>
              </li>
            </ul>
          </span>

          <span id="eshaafi-policy" className="w-full mt-4">
            <h2 className="mb-3">Part 1: eShaafi Privacy Policy</h2>
            <p className="mt-3">
              Welcome to the eShaafi privacy policy, where we outline how we
              collect user data and the reasons behind it, detail our
              utilization of user information, and provide information on the
              choices available to you regarding your personal data.
            </p>
          </span>
          <span className="mt-3">
            <h3 className={style.mainHeading + " mb-1"}>How to contact us?</h3>
            <p>
              If you have any questions about this privacy policy, contact our
              privacy team including our data protection officer by simply
              sending an email to contact@eshaafi.com or calling us at
              03111151161
            </p>
          </span>
          <ol className={"flex flex-col row-gap-2 mt-3 " + style.contentList}>
            {privacy.map((itm: any, indx: any) => (
              <li key={indx} className={style.contentListItem}>
                <h3 className={style.mainHeading}>
                  <span className="mr-1">{indx + 1}.</span>
                  {itm.heading}
                </h3>

                <p>{itm.headingText}</p>
                <ul className="flex flex-col row-gap-1 mt-3">
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

          <span id="gaming-policy" className="w-full mt-5">
            <h2 className="mb-1">Part 2: eShaafi Games Privacy Policy</h2>
            <p>
              <em>Updated on {GAMING_PRIVACY_UPDATED}</em>
            </p>
            {gamingPrivacyIntro.map((text, indx) => (
              <p key={indx} className="mt-3">
                {text}
              </p>
            ))}
          </span>
          <ol className={"flex flex-col row-gap-2 mt-3 " + style.contentList}>
            {gamingPrivacy.map((itm, indx) => (
              <li key={indx} className={style.contentListItem}>
                <h3 className={style.mainHeading}>
                  <span className="mr-1">{indx + 1}.</span>
                  {itm.heading}
                </h3>
                {itm.paragraphs.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
                {itm.points && (
                  <ul className={style.pointsList}>
                    {itm.points.map((point, i) => (
                      <li key={i}>
                        <p>{point}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {itm.links && (
                  <ul className={style.pointsList}>
                    {itm.links.map((link) => (
                      <li key={link.href}>
                        <p>
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                {itm.sub?.map((subItem, i) => (
                  <div key={i} className="mt-2">
                    {subItem.subHeading && (
                      <h3 className={style.subHeading}>{subItem.subHeading}</h3>
                    )}
                    {subItem.paragraphs.map((text, j) => (
                      <p key={j}>{text}</p>
                    ))}
                    {subItem.points && (
                      <ul className={style.pointsList}>
                        {subItem.points.map((point, j) => (
                          <li key={j}>
                            <p>{point}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
