import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { GetAdminServiceSubCategoryData } from "../../../../api/admin/apiAdmin";
import { Link } from "react-router-dom";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import ServiceSubCategoryModal from "./ServiceSubCategoryModal";
import { NoDataFound } from "../../../../components/table/TableComponents";

function GetServiceSubCategory() {
  const [clickId, setClickId] = useState("");
  const { serviceSubCategoryData, refetch, isLoading } =
    GetAdminServiceSubCategoryData();

  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  const membernDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/service-sub-category/${id}`).then((res) => {
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
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin Sub Cateogory-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Admin Sub Cateogory</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Sub Cateogory
            </p>
          </div>
          <div>
            <Link
              className="btn btn-primary"
              to="/admin/create-service-sub-category"
            >
              Create Sub Cateogory
            </Link>
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
                        <th>Sub Category Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>{" "}
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {serviceSubCategoryData?.message?.length > 0 ? (
                          serviceSubCategoryData?.message?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.name}</td>
                              <td>{data?.status}</td>
                              <td>
                                <div>
                                  <button
                                    onClick={() => setClickId(data?.id)}
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    Update
                                  </button>
                                  <ServiceSubCategoryModal
                                    subFetch={refetch}
                                    clickId={clickId}
                                  />
                                  <button
                                    onClick={() => membernDataDelete(data?.id)}
                                    className="btn btn-primary bg-danger border border-danger ml-2"
                                  >
                                    Delete
                                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetServiceSubCategory;
