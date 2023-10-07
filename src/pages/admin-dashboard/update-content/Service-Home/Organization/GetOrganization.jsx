import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { GetAdminOrganizationData } from "../../../../../api/admin/apiAdmin";
import { Link } from "react-router-dom";
import { http } from "../../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../../components/action/DeletePopUP";
import OrganizationModal from "./OrganizationModal";
import TableBodyLoading from "../../../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../../../components/table/TableComponents";

function GetOrganization() {
  const [clickId, setClickId] = useState(1);

  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  const { organizationData, refetch, isLoading } = GetAdminOrganizationData();

  const handleDelete = (id) => {
    const del = () =>
      http.delete(`/admin/organization/${id}`).then((res) => {
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
        <title>Admin Organization Content-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Organization</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Home Content
            </p>
          </div>
          <div>
            <Link className="btn btn-primary" to="/admin/create-organization">
              Create Organization
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
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>{" "}
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {organizationData?.length > 0 ? (
                          organizationData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                {data.description.length > 120 ? (
                                  <>{data.description.slice(0, 120) + "..."}</>
                                ) : (
                                  data.description
                                )}
                              </td>
                              <td>
                                <div>
                                  <button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => setClickId(data?.id)}
                                  >
                                    Update
                                  </button>
                                  <OrganizationModal
                                    organizationRefetch={refetch}
                                    clickId={clickId}
                                  />
                                  <button
                                    onClick={() => handleDelete(data?.id)}
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

export default GetOrganization;
