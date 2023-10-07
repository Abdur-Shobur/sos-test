import React from "react";
import CommonTableHead from "../table/CommonTableHead";
import TableBodyLoading from "../loader/TableBodyLoading";
import { Link } from "react-router-dom";
import { downloadImage } from "../action/actions";
import { deleteData } from "./delete-action";
import Pagination from "../breadcrumbs/Pagination";
import { NoDataFound, TableSr, TableTime } from "../table/TableComponents";

function SupportViewTable({
  supportData,
  isLoading,
  refetch,
  setPage,
  delApi,
  page,
  view,
}) {
  return (
    <div className="col-12">
      <div className="ec-vendor-list card card-default">
        <div className="card-body">
          <div className="table-responsive">
            <table id="responsive-data-table" className="table">
              <CommonTableHead
                th={[
                  "Sr",
                  "Subject",
                  "Description",
                  "rating",
                  "is close",
                  "Date",
                  "Action",
                ]}
              />

              {isLoading ? (
                <TableBodyLoading />
              ) : (
                <tbody style={{ verticalAlign: "middle" }}>
                  {supportData?.data?.length > 0 ? (
                    supportData?.data?.map((data, i) => (
                      <tr key={data?.id}>
                        <td>
                          <TableSr i={i} page={page} />
                        </td>
                        <td>
                          <Link to={view + data?.id}>{data?.subject}</Link>
                        </td>
                        <td>
                          {data?.description.length > 60 ? (
                            <>{data?.description.slice(0, 60) + "..."}</>
                          ) : (
                            data?.description
                          )}
                        </td>
                        <td>
                          {data?.rating ? (
                            <span className="mb-2 mr-2 badge badge-info">
                              {data?.rating}
                            </span>
                          ) : (
                            <span className="mb-2 mr-2 badge badge-warning">
                              N/A
                            </span>
                          )}
                        </td>

                        <td>
                          <span
                            className={`mb-2 mr-2 badge ${
                              (data?.is_close === "0" && "badge-warning") ||
                              (data?.is_close === "1" && "badge-success")
                            }`}
                          >
                            {data?.is_close === "1" ? "Closed" : "Not Closed"}
                          </span>
                        </td>
                        <td>
                          <TableTime date={data?.created_at} />
                        </td>

                        <td style={{ width: "200px" }}>
                          <div className="btn-group">
                            <Link
                              to={view + data?.id}
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
                              {data?.file ? (
                                <button
                                  onClick={() => downloadImage(data?.file)}
                                  className="dropdown-item"
                                  href="#"
                                >
                                  Download File
                                </button>
                              ) : (
                                <button className="dropdown-item" href="#">
                                  No File
                                </button>
                              )}

                              <button
                                onClick={() =>
                                  deleteData(data?.id, refetch, delApi)
                                }
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
            <Pagination
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              getPaginationData={supportData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportViewTable;
