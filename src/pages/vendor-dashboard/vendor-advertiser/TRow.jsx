import React from "react";
import { countWord, time } from "../../../components/action/actions";
import {
  TableSr,
  TableStatus,
} from "../../../components/table/TableComponents";
import { Link } from "react-router-dom";

function TRow({ data, i, page, refetch }) {
  return (
    <tr>
      <td>
        <TableSr i={i} page={page} />
      </td>
      <td>{countWord(data?.campaign_objective, 15)}</td>
      <td>{countWord(data?.campaign_name, 15)}</td>
      <td>{countWord(data?.conversion_location, 15)}</td>
      <td>{countWord(data?.performance_goal, 15)}</td>
      <td>{countWord(data?.budget_amount, 15)}</td>

      <td>{countWord(data?.start_date, 15)}</td>
      <td>{countWord(data?.end_date, 15)}</td>
      <td>{countWord(data?.age, 15)}</td>
      <td>{countWord(data?.gender, 15)}</td>
      <td>{countWord(data?.detail_targeting, 15)}</td>
      <td>{countWord(data?.country, 15)}</td>
      <td>{countWord(data?.city, 15)}</td>
      <td>{countWord(data?.device, 15)}</td>
      <td>{countWord(data?.platform, 15)}</td>
      <td>{countWord(data?.inventory, 15)}</td>
      <td>{countWord(data?.format, 15)}</td>
      <td>{countWord(data?.destination, 15)}</td>
      <td>{countWord(data?.tracking, 15)}</td>
      <td>{countWord(data?.url_perimeter, 15)}</td>
      <td>{countWord(data?.number, 15)}</td>
      <td>{countWord(data?.last_description, 15)}</td>
      <td>
        <TableStatus status={data?.status} text={data?.status} />
      </td>
      <td>
        {countWord(data?.reason === null ? "Not cancel yet!" : data?.reason)}
      </td>
      <td>
        <span className={"time"}>
          <span>{time(data?.deleted_at).date}</span>
          <span className={"showTime"}>{time(data?.deleted_at).time}</span>
        </span>
      </td>
      <td>
        <span className={"time"}>
          <span>{time(data?.updated_at).date}</span>
          <span className={"showTime"}>{time(data?.updated_at).time}</span>
        </span>
      </td>
      <td>
        <span className={"time"}>
          <span>{time(data?.created_at).date}</span>
          <span className={"showTime"}>{time(data?.created_at).time}</span>
        </span>
      </td>
      <td>
        <div className="btn-group">
          <Link
            to={`/vendor/advertise-content-view/${data?.id}`}
            style={{ padding: "3px 10px" }}
            className="btn btn-outline-success"
          >
            View
          </Link>
          <button
            type="button"
            className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-display="static"
          >
            <span className="sr-only">Info</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TRow;
