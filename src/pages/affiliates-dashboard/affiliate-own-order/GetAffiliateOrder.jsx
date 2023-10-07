import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import Pagination from "../../../components/breadcrumbs/Pagination";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { GetVendorOrderData } from "../../../api/admin/vendorApi";
import {
  NoDataFound,
  TableStatus,
} from "../../../components/table/TableComponents";
import { Link } from "react-router-dom";

const GetAffiliateOrder = () => {
  const [page, setPage] = useState(null);
  const { orderData, isLoading } = GetVendorOrderData(page);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Get Orders-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs heading="Order" />
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
                        {orderData?.data?.length > 0 ? (
                          orderData?.data?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.amount} TK</td>
                              <td>{data?.commission_amount} TK</td>
                              <td>{data?.commission_type}</td>
                              <td>
                                <TableStatus
                                  status={data?.status}
                                  text={data?.status}
                                />
                              </td>
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
                                    to={`/affiliates-dashboard/my-order/${data?.id}`}
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
                                  <div className="dropdown-menu"></div>
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
                    getPaginationData={orderData}
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

export default GetAffiliateOrder;
