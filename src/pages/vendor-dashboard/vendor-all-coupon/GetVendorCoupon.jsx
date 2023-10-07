import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { Link } from "react-router-dom";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import { GetVendorAllCoupon } from "../../../api/admin/vendorApi";
import {
  NoDataFound,
  TableStatus,
} from "../../../components/table/TableComponents";
import { time } from "../../../components/action/actions";

function GetVendorCoupon() {
  const { couponData, isLoading } = GetVendorAllCoupon();

  //   loading duration
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Vendor Coupon-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Vendor Coupon</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Coupon
            </p>
          </div>
        </div>
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="card card-default">
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
                        <th>Coupon Name</th>
                        <th>Amount</th>
                        <th>Commission</th>
                        <th>Limitation</th>
                        <th>Expire Date</th>
                        <td>Status</td>
                        <td>Type</td>
                      </tr>
                    </thead>{" "}
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {couponData?.length > 0 ? (
                          couponData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.name}</td>
                              <td>{data?.amount}</td>
                              <td>{data?.commission}</td>
                              <td>{data?.limitation}</td>
                              <td>
                                <span className={"time"}>
                                  <span>{time(data?.expire_date).date}</span>
                                  <span className={"showTime"}>
                                    {time(data?.expire_date).time}
                                  </span>
                                </span>
                              </td>
                              <td>
                                <TableStatus
                                  status={data?.status}
                                  text={data?.status}
                                />
                              </td>
                              <td>{data?.type}</td>
                            </tr>
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetVendorCoupon;
