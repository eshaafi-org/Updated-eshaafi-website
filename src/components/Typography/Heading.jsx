import style from "./Typography.module.scss";
function PageHeading({ content }) {
  return <h2>{content}</h2>;
}
function SectionHeading({ content }) {
  return <h6 className={style.sectionHeading}>{content}</h6>;
}
export { PageHeading, SectionHeading };
