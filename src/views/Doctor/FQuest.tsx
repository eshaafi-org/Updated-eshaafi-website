import style from "../../styles/doctors.module.scss";
import { Text16, Text12 } from "@/components/Typography";
export default function FQuest({
  quests,
  heading,
}: {
  quests: any;
  heading: string;
}) {
  return (
    <section className="container pt-0">
      <h2>{heading}</h2>
      <ul className={"border rounded p-3 mt-3 " + style.benifitCont}>
        {quests.map((itm: any, indx: number) => (
          <li key={indx}>
            <div className={style.benefitItemCont}>
              <span className="flex flex-col row-gap-1">
                <p className="text-dark">{itm.heading}</p>
                <Text12>{itm.text}</Text12>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
