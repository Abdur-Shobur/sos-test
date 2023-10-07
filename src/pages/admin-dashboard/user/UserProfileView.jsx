import { Helmet } from "react-helmet";
import user_logo from "../../../assets/icons/user-icon.webp";
import { Link, useParams } from "react-router-dom";
import ProfileLoader from "../../../components/loader/ProfileLoader";
import time from "../../../components/action/localTime";
import { GetAllUserById } from "../../../api/user";

const UserProfileView = () => {
  const { id } = useParams();

  const { userData, isLoading } = GetAllUserById(id);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <ProfileLoader />
    </div>
  ) : (
    <div className="content">
      <Helmet>
        <title>Affiliates Profile-SOS</title>
      </Helmet>
      <div className="breadcrumb-wrapper breadcrumb-contacts">
        <div>
          <h1>Affiliates Profile</h1>
          <p className="breadcrumbs">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <i className="mdi mdi-chevron-right"></i>
            </span>
            Profile
          </p>
        </div>
        <div>
          <Link
            to={`/admin/edit-user/${userData.id}`}
            className="btn btn-primary"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="card bg-white profile-content ec-vendor-profile">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <div className="profile-content-left profile-left-spacing">
              <div className="ec-disp">
                <div className="text-center widget-profile px-0 border-0">
                  <div className="card-img mx-auto rounded-circle">
                    <img
                      src={
                        !userData?.image
                          ? user_logo
                          : `${process.env.REACT_APP_IMG_URL}/${userData.image}`
                      }
                      alt="user images"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="py-2 text-dark">{userData?.name}</h4>
                    <p>{userData?.email}</p>

                    <span className="badge badge-primary my-2">
                      Balance: {userData?.balance || "00"} TK
                    </span>

                    <p>
                      <span
                        className={`badge mt-2 ${
                          userData.status === "active"
                            ? "badge-info"
                            : "badge-danger"
                        }`}
                      >
                        {userData.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr className="w-100" />

              <div className="contact-info pt-4">
                <h5 className="text-dark">Contact Information</h5>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Email address
                </p>
                <p>{userData?.email}</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Phone Number
                </p>
                <p>{userData?.number}</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Phone Number 2
                </p>
                <p>{userData?.number2 || "Not set"}</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Create Date
                </p>
                <p>{time(userData.created_at)}</p>
                <p className="text-dark font-weight-medium pt-24px mb-2">
                  Update Date
                </p>
                <p>{time(userData.updated_at)}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9">
            <div className="profile-content-right profile-right-spacing py-5">
              <ul
                className="nav nav-tabs px-3 px-xl-5 nav-style-border"
                id="myProfileTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="true"
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  {/* <button
										className="nav-link"
										id="settings-tab"
										data-bs-toggle="tab"
										data-bs-target="#settings"
										type="button"
										role="tab"
										aria-controls="settings"
										aria-selected="false"
									>
										Settings
									</button> */}
                </li>
              </ul>
              <div className="tab-content px-3 px-xl-5" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="tab-widget mt-5"></div>
                </div>

                <div
                  className="tab-pane fade"
                  id="settings"
                  role="tabpanel"
                  aria-labelledby="settings-tab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
