import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { GetAdminPartnerData } from "../../../../../api/admin/apiAdmin";
import { Link } from "react-router-dom";
import { http } from "../../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../../components/action/DeletePopUP";
import PartnerModal from "./PartnerModal";
import TableBodyLoading from "../../../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../../../components/table/TableComponents";

function GetPartner() {
  const imgUrl = process.env.REACT_APP_IMG_URL;
  const [clickId, setClickId] = useState(1);

  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  const { partnerData, refetch, isLoading } = GetAdminPartnerData();

  const handleDelete = (id) => {
    const del = () =>
      http.delete(`/admin/partner/${id}`).then((res) => {
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
        <title>Admin All Partner-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Partner</h1>
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
            <Link className="btn btn-primary" to="/admin/create-partner">
              Create Partner
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
                        <th>Img</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {partnerData?.length > 0 ? (
                          partnerData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  src={`${imgUrl}/${data?.image}`}
                                  alt="Partner Img"
                                />
                              </td>
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
                <PartnerModal partnerRefetch={refetch} clickId={clickId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetPartner;
