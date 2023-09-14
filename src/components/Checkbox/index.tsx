import "./style.scss";
interface props {
  name?: string;
  onChange?: () => void;
}
export default function Checkbox({ name }: props) {
  return (
    <div className="checkbox-wrapper-4">
      <input className="inp-cbx" id={name} type="checkbox" />
      <label className="cbx" htmlFor={name}>
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check-4"></use>
          </svg>
        </span>
        <span>{name}</span>
      </label>
      <svg className="inline-svg">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
}
