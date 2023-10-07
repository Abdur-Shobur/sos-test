import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GetAdminDollarSetData } from "../../../api/admin/apiAdmin";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import AdminDollarSetModal from "./AdminDollarSetModal";
import { useEffect } from "react";
import Aos from "aos";

const GetAdminDollarSet = () => {
  const { dollarAmountData, isLoading, refetch } = GetAdminDollarSetData();
  const [clickId, setClickId] = useState(1);
  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);
  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin Dollar Set-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Dollar Set</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Dollar Set
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
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        <tr>
                          <td> 1</td>
                          <td>{dollarAmountData?.amount}</td>
                          <td>
                            <div>
                              <button
                                onClick={() => setClickId(dollarAmountData?.id)}
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Update
                              </button>
                              <AdminDollarSetModal
                                dollarFetch={refetch}
                                clickId={clickId}
                              />
                            </div>
                          </td>
                        </tr>
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
};

export default GetAdminDollarSet;
