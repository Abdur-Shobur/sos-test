import { Link } from "react-router-dom";
import { CopyClipboardHandler, countWord, time } from "../action/actions";
import demoIcon from "../../assets/use-image-this-app/icon.jpg";
import { MdContentCopy } from "react-icons/md";
import { RiCheckboxMultipleFill } from "react-icons/ri";

export const DemoIcon = demoIcon;

export const NoDataFound = () => {
  return (
    <tr
      style={{
        width: "100%",
        position: "relative",
        height: "100px",
      }}
      className="text-center"
    >
      <td>
        <div
          style={{
            display: "block",
            textAlign: "center",
            position: "absolute",
            width: "95%",
            top: "30%",
          }}
          className="alert alert-light  "
          role="alert"
        >
          No Data Found
        </div>
      </td>
    </tr>
  );
};

export const TableImage = ({ path, id, src }) => {
  return (
    <Link to={path + id}>
      <img
        style={{ height: "50px", objectFit: "cover" }}
        className="tbl-thumb"
        src={src ? process.env.REACT_APP_IMG_URL + "/" + src : DemoIcon}
        alt="Product Images"
      />
    </Link>
  );
};
export const TableImageNoUrl = ({ src }) => {
  return (
    <img
      style={{ height: "50px", objectFit: "cover" }}
      className="tbl-thumb"
      src={src ? process.env.REACT_APP_IMG_URL + "/" + src : DemoIcon}
      alt="Product Images"
    />
  );
};

export const TableSr = ({ page, i }) => {
  return page === null || parseInt(page) === 1
    ? i + 1
    : (parseInt(page) - 1) * 10 + i + 1;
};

export const TableName = ({ id, text, countText, path }) => {
  return <Link to={path + id}>{countWord(text, countText)}</Link>;
};

export const TableStatus = ({ status, text, suffix = "" }) => {
  return (
    <span
      className={`mb-2 mr-2 badge ${
        (status === "pending" && "badge-warning") ||
        (status === "active" && "badge-success") ||
        (status === "progress" && "badge-info") ||
        (status === "hold" && "badge-secondary") ||
        (status === "cancel" && "badge-danger") ||
        (status === "delivered" && "badge-success") ||
        (status === "success" && "badge-secondary") ||
        (status === "rejected" && "badge-danger") ||
        (status === "deactivate" && "badge-danger") ||
        (status === "revision" && "badge-info") 
      }`}
    >
      {text + suffix}
    </span>
  );
};

export const TableDiscount = ({ discount_rate, discount_type }) => {
  return (
    <span className={`badge badge-info`}>
      {discount_rate}
      {discount_type === "percent" ? "% " : " tk "}
      {discount_type}
    </span>
  );
};

export const TableQty = ({ qty }) => {
  return <span className="badge badge-dark">{qty}</span>;
};

export const TableTime = ({ date }) => {
  return (
    <span className="time">
      <span>{time(date).date}</span>
      <span className="showTime">{time(date).time}</span>
    </span>
  );
};

export const ClickToCopy = ({ text }) => {
  const { click_button_handler, copied } = CopyClipboardHandler();
  return (
    <button onClick={() => click_button_handler(text)}>
      {!copied ? <MdContentCopy /> : <RiCheckboxMultipleFill />}
    </button>
  );
};
