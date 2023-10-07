import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  http,
  multipartConfig,
} from "../../../components/action/axiosInstance";
import Input from "../../../components/formComponent/InputEdit";

import Select from "../../../components/formComponent/SelectEdit";
import { reducer } from "./action/edit/AdminVendorReducer";
import user_icon from "../../../assets/icons/user-icon.webp";
import { ClockLoader } from "react-spinners";
import Aos from "aos";
import EditLoader from "../../../components/loader/EditLoader";
import { Helmet } from "react-helmet";
import { VendorsByID } from "../../../api/admin/vendorsAPI";
import tost from "../../../components/action/tost";

function UserEdit() {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const nextUrl = location?.state?.from.pathname || "/admin/all-users";

  const { edit_vendor, isLoading } = VendorsByID(id);

  let initialState = {};
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "API_DATA",
      payload: edit_vendor,
    });
  }, [edit_vendor]);

  // editVendorHandler
  const editVendorHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await http.post(`/update-user/${id}`, state, multipartConfig);
      if (res.data.status === 200) {
        navigate(nextUrl);
        tost(res.data.message);
      }
      setLoading(false);
    } catch (err) {
      tost(err.message);
      setLoading(false);
    }
  };

  // load aos animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center h-100">
      <EditLoader />
    </div>
  ) : (
    <form
      data-aos="fade"
      style={{ maxWidth: "600px", margin: "20px auto" }}
      onSubmit={editVendorHandler}
      className="ec-cat-form shadow p-4"
    >
      <Helmet>
        <title>Edit Vendor-SOS</title>
      </Helmet>
      <h4>Edit Vendors</h4>
      <div className="modal-body px-4">
        <div className="form-group row mb-6 ">
          <div className="d-flex align-items-center gap-3">
            <div>
              <img
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  state?.url || state.url !== undefined
                    ? state.url
                    : state.image === null
                    ? user_icon
                    : `${process.env.REACT_APP_IMG_URL}/${state.image}`
                }
                alt=""
              />
            </div>
            <div className="custom-file ml-3">
              <input
                type="file"
                onChange={(e) =>
                  dispatch({
                    type: "FILE",
                    payload: e.target.files[0],
                  })
                }
                name="image"
                className="custom-file-input"
                id="coverImage"
              />
              <label className="custom-file-label" htmlFor="coverImage">
                Choose file...
              </label>
              <div className="invalid-feedback">
                Example invalid custom file feedback
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-lg-12">
            <div className="form-group mb-4">
              <Input
                required
                type="text"
                name="name"
                label="Name"
                dispatch={dispatch}
                edit_vendor={edit_vendor}
                placeholder="Input Vendor Name"
                defaultValue={edit_vendor?.name}
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group mb-4">
              <Input
                required
                type="email"
                name="email"
                label="Email"
                dispatch={dispatch}
                edit_vendor={edit_vendor}
                placeholder="Input Vendor Name"
                defaultValue={edit_vendor?.email}
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group mb-4">
              <Input
                required
                type="number"
                name="number"
                label={"Number"}
                dispatch={dispatch}
                edit_vendor={edit_vendor}
                placeholder="Input Vendor Name"
                defaultValue={edit_vendor?.number}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group mb-4">
              <Input
                type="number"
                name="balance"
                label={"Balance"}
                dispatch={dispatch}
                edit_vendor={edit_vendor}
                placeholder="Input Vendor Balance"
                defaultValue={edit_vendor?.balance}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group row">
              <Select dispatch={dispatch} defaultValue={edit_vendor?.status} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer px-4">
        <button
          type="button"
          className="btn btn-secondary btn-pill"
          onClick={() => navigate(nextUrl)}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-pill d-flex align-items-center"
        >
          <span style={{ marginRight: "2px" }}>Save Vendor</span>{" "}
          {loading && <ClockLoader color="#fff" size={15} />}
        </button>
      </div>
    </form>
  );
}

export default UserEdit;
