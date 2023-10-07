import React from "react";
import Breadcrumbs from "./own-components/Breadcrumbs";
import Profile from "./own-components/Profile";
import ContactInfo from "./own-components/ContactInfo";
import ProfileStatics from "./own-components/ProfileStatics";
import SettingForm from "./own-components/settings/SettingForm";
import LoaderProfile from "./own-components/LoaderProfile";
import { Helmet } from "react-helmet";
import { UserProfilesAPI } from "../../../api/user/uer-api";

const UserProfile = () => {
  const { isLoading, refetch, user } = UserProfilesAPI();

  return (
    <>
      <div className="content">
        <Helmet>
          <title>Profile View-SOS</title>
        </Helmet>
        <Breadcrumbs />
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <LoaderProfile />
          </div>
        ) : (
          <div className="card bg-white profile-content ec-vendor-profile">
            <div className="row">
              <div className="col-lg-4 col-xl-3">
                <div className="profile-content-left profile-left-spacing">
                  <Profile user={user} />
                  <hr className="w-100" />
                  <ContactInfo user={user} />
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
                        id="settings-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#settings"
                        type="button"
                        role="tab"
                        aria-controls="settings"
                        aria-selected="false"
                      >
                        Settings
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content px-3 px-xl-5" id="myTabContent">
                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <div className="tab-widget mt-5">
                        <ProfileStatics />
                      </div>
                    </div>

                    <div
                      className="tab-pane fade show active"
                      id="settings"
                      role="tabpanel"
                      aria-labelledby="settings-tab"
                    >
                      <div className="tab-pane-content mt-5">
                        <SettingForm data={user} refetch={refetch} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
