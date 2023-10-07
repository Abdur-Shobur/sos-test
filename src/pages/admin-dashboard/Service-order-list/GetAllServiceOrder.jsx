import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDebounce } from "../../../components/action/useDebounce";
import Aos from "aos";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import Pagination from "../../../components/breadcrumbs/Pagination";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { NoDataFound } from "../../../components/table/TableComponents";
import { Link } from "react-router-dom";
import { GetAdminServiceOrder } from "../../../api/admin/apiAdmin";
import { http } from "../../../components/action/axiosInstance";
import tost from "../../../components/action/tost";

const GetAllServiceOrder = () => {
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState(" ");
  // eslint-disable-next-line no-unused-vars
  const { searchHandler } = useDebounce(setSearch, setPage);
  const { orderServiceData, isLoading, refetch } = GetAdminServiceOrder(
    page,
    search
  );

  const handleStaus = async (e) => {
    const status = {
      status: e.value,
    };
    const data = await http.post(`/admin/customer-orders/${e?.id}`, {
      ...status,
      _method: "put",
    });
    if (data?.data?.data === "success") {
      tost(data?.data?.message);
      refetch();
    } else if (data?.data?.message === "Validation errors") {
      tost(data?.data?.data?.status[0]);
    }
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Get Service Order-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs heading="Service Order" />
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="ec-vendor-list card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="responsive-data-table"
                    className="table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Amount</th>
                        <th>Commision Amount</th>
                        <th>Commision Type</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {orderServiceData?.data?.length > 0 ? (
                          orderServiceData?.data?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.amount}</td>
                              <td>{data?.commission_amount}</td>
                              <td>{data?.commission_type}</td>
                              <td>{data?.status}</td>
                              <td>
                                {data?.details?.length > 70 ? (
                                  <>{data?.details?.slice(0, 70) + "..."}</>
                                ) : (
                                  <>{data?.details}</>
                                )}
                              </td>
                              <td>
                                <div className="btn-group">
                                  <Link
                                    to={`/admin/service-order/${data?.id}`}
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
                                    {data?.status !== "progress" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "progress",
                                          })
                                        }
                                      >
                                        Progress
                                      </button>
                                    )}
                                    {data?.status !== "pending" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "pending",
                                          })
                                        }
                                      >
                                        Pending
                                      </button>
                                    )}
                                    {data?.status !== "success" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "success",
                                          })
                                        }
                                      >
                                        Success
                                      </button>
                                    )}
                                    {data?.status !== "hold" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "hold",
                                          })
                                        }
                                      >
                                        Hold
                                      </button>
                                    )}
                                    {data?.status !== "delivered" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "delivered",
                                          })
                                        }
                                      >
                                        Delivered
                                      </button>
                                    )}
                                    {data?.status !== "revision" && (
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleStaus({
                                            id: data?.id,
                                            value: "revision",
                                          })
                                        }
                                      >
                                        Revision
                                      </button>
                                    )}
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
                    getPaginationData={orderServiceData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllServiceOrder;
