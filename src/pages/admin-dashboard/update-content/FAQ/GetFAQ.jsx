import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GetAdminFAQData } from "../../../../api/admin/apiAdmin";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import FAQModal from "./FAQModal";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../../components/table/TableComponents";
import { useEffect } from "react";
import Aos from "aos";

const GetFAQ = () => {
  const { faqData, refetch, isLoading } = GetAdminFAQData();
  const [clickId, setClickId] = useState(1);

  const faqDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/faq/${id}`).then((res) => {
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

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin FAQ-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All FAQ</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Advertiser Content
            </p>
          </div>
          <div>
            <Link className="btn btn-primary" to="/admin/create-faq">
              Create FAQ
            </Link>
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
                        <th>SL</th>
                        <th>Heading</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {faqData?.length > 0 ? (
                          faqData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{data?.heading}</td>
                              <td>
                                {data?.description.length > 100 ? (
                                  <>{data?.description.slice(0, 100) + "..."}</>
                                ) : (
                                  data?.description
                                )}
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

                                  <FAQModal
                                    faqFetch={refetch}
                                    clickId={clickId}
                                  />
                                  <button
                                    onClick={() => faqDataDelete(data?.id)}
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
};

export default GetFAQ;
