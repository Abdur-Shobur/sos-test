import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GetAdminMembersData } from "../../../../api/admin/apiAdmin";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import MemberModal from "./MemberModal";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import { useEffect } from "react";
import Aos from "aos";
import { NoDataFound } from "../../../../components/table/TableComponents";

const GetMembers = () => {
  const [clickId, setClickId] = useState(1);
  const imgLink = process.env.REACT_APP_IMG_URL;

  const {
    membersData,
    refetch: membersFetch,
    isLoading: memberLoading,
  } = GetAdminMembersData();

  const membernDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/member/${id}`).then((res) => {
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
        membersFetch();
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
        <title>Admin All Members-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Members</h1>
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
            <Link className="btn btn-primary" to="/admin/create-member">
              Create Member
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
                        <th>Designation</th>
                        <th>Facebook Link</th>
                        <th>Instagram Link</th>
                        <th>Twitter Link</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {memberLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {membersData?.length > 0 ? (
                          membersData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  style={{ height: "40px", width: "60px" }}
                                  src={`${imgLink}/${data.photo}`}
                                  alt="Members Img"
                                />
                              </td>
                              <td>{data?.name}</td>
                              <td>{data?.designation}</td>
                              <td>{data?.facebook_link}</td>
                              <td>{data?.instagram_link}</td>
                              <td>{data?.twitter_link}</td>
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
                                  <MemberModal
                                    membersFetch={membersFetch}
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
};

export default GetMembers;
