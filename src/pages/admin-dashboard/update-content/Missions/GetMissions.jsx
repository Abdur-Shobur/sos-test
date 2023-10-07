import React from "react";
// import { IconPickerItem } from "react-fa-icon-picker";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GetAdminMissionsData } from "../../../../api/admin/apiAdmin";
import { http } from "../../../../components/action/axiosInstance";
import { toast } from "react-toastify";
import { DeletePopUP } from "../../../../components/action/DeletePopUP";
import MissionsModal from "./MissionsModal";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import { useEffect } from "react";
import Aos from "aos";
import { NoDataFound } from "../../../../components/table/TableComponents";

const GetMissions = () => {
  const {
    missionsData,
    refetch: missionFetch,
    isLoading: missionLoading,
  } = GetAdminMissionsData();
  const [missionId, setMissionId] = useState(1);

  const missionDataDelete = (id) => {
    const del = () =>
      http.delete(`admin/mission/${id}`).then((res) => {
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
        missionFetch();
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
        <title>Admin All Mission-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Missions</h1>
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
            <Link className="btn btn-primary" to="/admin/create-mission">
              Create Mission
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
                        <th>Icon</th>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {missionLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {missionsData?.length > 0 ? (
                          missionsData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                {/* <IconPickerItem
                                  icon={data?.icon_class}
                                  size={24}
                                  color="#000"
                                /> */}
                              </td>
                              <td>{data?.title}</td>
                              <td>
                                <div>
                                  <button
                                    onClick={() => setMissionId(data?.id)}
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    Update
                                  </button>
                                  <MissionsModal
                                    missionFetch={missionFetch}
                                    missionId={missionId}
                                  />
                                  <button
                                    onClick={() => missionDataDelete(data?.id)}
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

export default GetMissions;
