import Aos from "aos";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GetHistoryData } from "../../../api/user/uer-api";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../components/table/TableComponents";
import Pagination from "../../../components/breadcrumbs/Pagination";
import { useState } from "react";
import { time } from "../../../components/action/actions";

const GetVendorHistory = () => {
  const [page, setPage] = useState(null);
  const { historyData, isLoading } = GetHistoryData(page);

  //   loader animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Vendor History-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>My History</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              History
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <div data-aos="fade" className="table-responsive">
                  <table
                    id="responsive-data-table"
                    className="table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Amount</th>
                        <th>Transition Type</th>
                        <th>Payment Method</th>
                        <th>Coupon</th>
                        <th>Transition ID</th>
                        <th>Balance Statement</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {historyData?.data?.length > 0 ? (
                          historyData?.data?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor: "#13cae1",
                                    color: "#fff",
                                    padding: "5px 8px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {parseInt(data?.amount)} TK.
                                </span>
                              </td>
                              <td>{data?.transition_type}</td>
                              <td>{data?.payment_method}</td>
                              <td>
                                {data?.coupon
                                  ? data?.coupon
                                  : "No Coupon Apply"}
                              </td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor: "#29cc97",
                                    color: "#fff",
                                    padding: "5px 8px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {data?.trxid}
                                </span>
                              </td>
                              <td>
                                {data?.balance_type === "-" ? (
                                  <span
                                    style={{
                                      background: "red",
                                      padding: "5px 8px",
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                      color: "white",
                                    }}
                                  >
                                    Out
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      background: "green",
                                      padding: "5px 8px",
                                      borderRadius: "10px",
                                      fontSize: "12px",
                                      color: "white",
                                    }}
                                  >
                                    In
                                  </span>
                                )}
                              </td>
                              <td>
                                <span>{time(data?.created_at).date}</span>
                                <span className={"showTime"}>
                                  {time(data?.created_at).time}
                                </span>
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
                    getPaginationData={historyData}
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

export default GetVendorHistory;
