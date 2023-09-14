import { privacy } from "@/helper/privacyContent";
import style from "@/styles/content.module.scss";
export default function PrivacyPolicy() {
  return (
    <section className="container">
      <div className={"flex flex-col " + style.contentCont}>
        <span className="w-full">
          <h2 className="text-center">Privacy Policy</h2>
          <p className="mt-1">
            Welcome to the eShaafi privacy policy, where we outline how we
            collect user data and the reasons behind it, detail our utilization
            of user information, and provide information on the choices
            available to you regarding your personal data.
          </p>
        </span>
        <span className="mt-1">
          <h3 className={style.mainHeading + " mb-1"}>How to contact us?</h3>
          <p>
            If you have any questions about this privacy policy, contact our
            privacy team including our data protection officer by simply sending
            an email to contact@eshaafi.com or calling us at 042-3230479
          </p>
        </span>
        <ol className={"flex flex-col row-gap-2 mt-1 " + style.contentList}>
          {privacy.map((itm: any, indx: any) => (
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
  );
}
