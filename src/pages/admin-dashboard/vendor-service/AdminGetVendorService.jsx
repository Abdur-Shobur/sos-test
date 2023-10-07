import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Pagination from "../../../components/breadcrumbs/Pagination";
import { useState } from "react";
import { GetAdminVendorServiceData } from "../../../api/admin/apiAdmin";
import { http } from "../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../components/action/DeletePopUP";
import { Link } from "react-router-dom";
import AdminVendorServiceModal from "./AdminVendorServiceModal";
import {
  NoDataFound,
  TableStatus,
} from "../../../components/table/TableComponents";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import Aos from "aos";
import { RejectedReasons } from "./RejectReasone";

const AdminGetVendorService = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(null);

  const { vendorServiceData, refetch, isLoading } =
    GetAdminVendorServiceData(page);
  const [clickId, setClickId] = useState(1);

  const deleteData = (id) => {
    const del = () =>
      http.delete(`admin/vendor-services/${id}`).then((res) => {
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

  const rejected_status_handler = (values) => {
    RejectedReasons(values, refetch);
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin Vendor Service-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Vendor Service</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Vendor Service
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
                        <th>Title</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Commission</th>
                        <th>Contract</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {vendorServiceData?.data?.length > 0 ? (
                          vendorServiceData?.data?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.title}</td>
                              <td>
                                {data?.image && (
                                  <img
                                    style={{ height: "50px", width: "50px" }}
                                    src={`${process.env.REACT_APP_IMG_URL}/${data?.image}`}
                                    alt=""
                                  />
                                )}
                              </td>
                              <td>
                                <TableStatus
                                  status={data?.status}
                                  text={data?.status}
                                />
                              </td>
                              <td>{data?.commission}</td>
                              <td>{data?.contract}</td>
                              <td style={{ width: "200px" }}>
                                <div className="btn-group">
                                  <Link
                                    to={`/admin/vendor-service/${data?.id}`}
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
                                    <button
                                      className="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      onClick={() => setClickId(data?.id)}
                                    >
                                      Update
                                    </button>
                                    {data?.status !== "rejected" && (
                                      <button
                                        disabled={loading}
                                        onClick={() =>
                                          rejected_status_handler({
                                            id: data?.id,
                                            status: data?.status,
                                            commission: data?.commission,
                                          })
                                        }
                                        className="dropdown-item"
                                      >
                                        Rejected
                                      </button>
                                    )}

                                    <button
                                      onClick={() => deleteData(data?.id)}
                                      className="dropdown-item"
                                      href="#"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <AdminVendorServiceModal
                                  refetch={refetch}
                                  clickId={clickId}
                                />
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
              </div>
              <div style={{ marginBottom: "20px" }}>
                <Pagination
                  page={page}
                  setPage={setPage}
                  isLoading={isLoading}
                  getPaginationData={vendorServiceData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGetVendorService;
