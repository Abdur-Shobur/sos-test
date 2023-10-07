import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GetAdminTestimonialData } from "../../../../api/admin/apiAdmin";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import TestimonalModal from "./TestimonialModal";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import Aos from "aos";
import { NoDataFound } from "../../../../components/table/TableComponents";

const Testimonial = () => {
  const imgLink = process.env.REACT_APP_IMG_URL;
  const [clickId, setClickId] = useState(1);

  const {
    testimonialData,
    refetch: testimonialRefetch,
    isLoading: testimonalLoading,
  } = GetAdminTestimonialData();

  const testimonialDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/testimonial/${id}`).then((res) => {
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
        testimonialRefetch();
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
        <title>Admin Testimonial-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Testimonial</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              About Content
            </p>
          </div>
          <div>
            <Link className="btn btn-primary" to="/admin/create-testimonial">
              Create Testimonial
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
                        <th>Image</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Designation</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {testimonalLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {testimonialData?.length > 0 ? (
                          testimonialData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  src={`${imgLink}/${data.image}`}
                                  alt="Feedback person img"
                                />
                              </td>
                              <td>{data?.name}</td>
                              <td>{data?.rating}</td>
                              <td>{data?.designation}</td>
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
                                  <TestimonalModal
                                    testimonialRefetch={testimonialRefetch}
                                    clickId={clickId}
                                  />
                                  <button
                                    onClick={() =>
                                      testimonialDataDelete(data?.id)
                                    }
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

export default Testimonial;
