import React from "react";
import { Link } from "react-router-dom";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import Pagination from "../../../../components/breadcrumbs/Pagination";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import {
  NoDataFound,
  TableStatus,
} from "../../../../components/table/TableComponents";
import { time } from "../../../../components/action/actions";

const AllServiceTable = ({
  refetch,
  isLoading,
  page,
  setPage,
  serviceData,
}) => {
  const imgURL = process.env.REACT_APP_IMG_URL;
  const deleteData = (id) => {
    const del = () =>
      http.delete(`main-services/${id}`).then((res) => {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      });
    return DeletePopUP(del);
  };
  return (
    <div>
      <div className="table-responsive">
        <table
          id="responsive-data-table"
          className="table"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Title</th>
              <th>Image</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <TableBodyLoading />
          ) : (
            <tbody style={{ verticalAlign: "middle" }}>
              {serviceData?.data?.length > 0 ? (
                serviceData?.data?.map((data, i) => (
                  <tr key={data?.id}>
                    <td>{i + 1}</td>
                    <td>
                      {data?.title.length > 120 ? (
                        <>{data?.title.slice(0, 120) + "..."} </>
                      ) : (
                        <>{data?.title}</>
                      )}
                    </td>
                    <td>
                      <img
                        style={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "10px",
                        }}
                        src={`${imgURL}/${data?.image}`}
                        alt="Service Img"
                      />
                    </td>
                    <td>
                      <TableStatus status={data?.status} text={data?.status} />
                    </td>
                    <td>
                      <span className={"time"}>
                        <span>{time(data?.updated_at).date}</span>
                        <span className={"showTime"}>
                          {time(data?.updated_at).time}
                        </span>
                      </span>
                    </td>
                    <td style={{ width: "200px" }}>
                      <div className="btn-group">
                        <Link
                          to={`/vendors-dashboard/update-service/${data?.id}`}
                          style={{ padding: "3px 10px" }}
                          className="btn btn-outline-success"
                        >
                          Update
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
                          {/* <Link
                            to={`/vendors-dashboard/update-service/${data?.id}`}
                          >
                            <button
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Update
                            </button>
                          </Link> */}
                          <button
                            onClick={() => deleteData(data?.id)}
                            className="dropdown-item"
                            href="#"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          )}
        </table>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Pagination
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          getPaginationData={serviceData}
        />
      </div>
    </div>
  );
};

export default AllServiceTable;
