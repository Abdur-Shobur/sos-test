import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { GetAdminCategory } from "../../../../api/admin/apiAdmin";
import { Link } from "react-router-dom";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import CategoryModal from "./CategoryModal";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../../components/table/TableComponents";

function SupportBoxCategory() {
  const [clickId, setClickId] = useState(1);
  const { categoryData, refetch, isLoading } = GetAdminCategory();

  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  const membernDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/supportboxcategory/${id}`).then((res) => {
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
        <title>Admin Support Cateogory-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Support Cateogory</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Cateogory
            </p>
          </div>
          <div>
            <Link className="btn btn-primary" to="/admin/create-cateogory">
              Create Cateogory
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
                        <th>Category Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>{" "}
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {categoryData?.length > 0 ? (
                          categoryData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.name}</td>
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
                                  <CategoryModal
                                    categoryFetch={refetch}
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
                    )}{" "}
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

export default SupportBoxCategory;
