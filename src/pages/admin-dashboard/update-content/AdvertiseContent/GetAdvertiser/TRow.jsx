import React from "react";
import {
  TableSr,
  TableStatus,
} from "../../../../../components/table/TableComponents";
import { countWord, time } from "../../../../../components/action/actions";
import { Link } from "react-router-dom";
import { http } from "../../../../../components/action/axiosInstance";
import { DeletePopUP } from "../../../../../components/action/DeletePopUP";
import tost from "../../../../../components/action/tost";
import { CancleResone } from "./CancleResone";

function TRow({ data, i, page, refetch }) {
  const deleteHandelr = (id) => {
    const delFun = async () => {
      return await http.delete(`/admin/advertise/${id}`).then((e) => {
        console.log(e);
        tost(e?.data?.message);
        refetch();
      });
    };
    DeletePopUP(delFun);
  };

  const statusChange = async (id) => {
    const updateData = {
      advertise_id: id,
    };
    const data = await http.post("/admin/advertise/status", updateData);
    if (data?.data?.data === "success") {
      tost(data?.data?.message);
      refetch();
    } else if (data?.data?.message === "Validation errors") {
      tost(data?.data?.data?.advertise_id[0]);
    }
  };

  const rejected_status_handler = (id) => {
    CancleResone(id, refetch);
  };

  return (
    <tr>
      <td>
        <TableSr i={i} page={page} />
      </td>
      <td>{countWord(data?.campaign_objective, 15)}</td>
      <td>{countWord(data?.campaign_name, 15)}</td>
      <td>{countWord(data?.conversion_location, 15)}</td>
      <td>{countWord(data?.performance_goal, 15)}</td>
      <td>{countWord(data?.platforms, 15)}</td>
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
            to={`/admin/advertise-content-view/${data?.id}`}
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

          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              // state={{ from: location }}
              replace
              to={`/admin/advertiser-update/${data?.id}`}
            >
              Edit
            </Link>
            {data?.status === "pending" && (
              <button
                onClick={() => statusChange(data?.id)}
                className="dropdown-item"
                href="#"
              >
                Progress
              </button>
            )}
            {(data?.status === "progress" || data?.status === "pending") && (
              <button
                onClick={() =>
                  rejected_status_handler({
                    advertise_id: data?.id,
                  })
                }
                className="dropdown-item"
                href="#"
              >
                Cancel
              </button>
            )}
            {data?.status === "progress" && (
              <Link to={`/admin/advertiser-content/delivery/${data?.id}`}>
                <button className="dropdown-item" href="#">
                  Delivery
                </button>
              </Link>
            )}
            <button
              onClick={() => deleteHandelr(data?.id)}
              className="dropdown-item"
              //   href="#"
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TRow;
