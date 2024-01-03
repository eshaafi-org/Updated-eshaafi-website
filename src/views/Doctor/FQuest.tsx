import style from "../../styles/doctors.module.scss";

export default function FQuest({ benifits }: { benifits: any }) {
  return (
    <section className="container pt-0">
      <h2>Frequently Asked Questions</h2>
      <ul className={"border rounded p-3 mt-3 " + style.benifitCont}>
        {benifits.map((itm: any, indx: number) => (
          <li key={indx}>
            <div className={style.benefitItemCont}>
              <span className="flex flex-col row-gap-1">
                <h4>{itm.heading}</h4>
                <p>{itm.text}</p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
