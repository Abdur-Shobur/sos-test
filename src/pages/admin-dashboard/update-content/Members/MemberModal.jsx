import React, { useEffect, useState } from "react";
import {
  http,
  multipartConfig,
} from "../../../../components/action/axiosInstance";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import tost from "../../../../components/action/tost";
import { useReducer } from "react";
import InputEdit from "../../../../components/formComponent/InputEdit";
import VendorAddImagePreview from "../../vendor/own-components/VendorAddImagePreview";
import preview from "../../../../assets/img/products/vender-upload-thumb-preview.jpg";
import EditLoader from "../../../../components/loader/EditLoader";

const MemberModal = ({ clickId, membersFetch }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);

  const initialState = {
    photo: {},
    url: "",
    name: "",
    designation: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value.trim()
            ? action.payload.value
            : "",
        };
      case "FILE":
        return {
          ...state,
          url: action.payload ? URL.createObjectURL(action.payload) : preview,
          photo: action.payload,
        };
      case "API_DATA":
        return {
          name: action?.payload?.name,
          designation: action?.payload?.designation,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(`/admin/member/${clickId}`);
      setModalData(res?.data?.datas);
      dispatch({ type: "API_DATA", payload: res?.data?.datas });
      setLoadingData(false);
    };
    getDataEditData();
  }, [clickId]);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    console.log(state);
    delete state.url;

    try {
      const data = await http.post(
        `/admin/member/${clickId}`,
        { ...state, _method: "PUT" },
        multipartConfig
      );

      console.log(data);
      if (data.data.status === 400) {
        tost(data?.data?.errors.name[0]);
      } else if (data.data.status === 200) {
        membersFetch();
        tost(data?.data.message);
      }

      e.target.reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        {loadingData ? (
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Member
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditLoader />
            </div>
          </div>
        ) : (
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Member
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitData}>
                <div className="modal-body px-4">
                  <div className="row mb-2">
                    <div className="form-group row mb-6">
                      <VendorAddImagePreview
                        dispatch={dispatch}
                        data={
                          state?.url || state?.url !== undefined
                            ? state?.url
                            : state?.url === null
                            ? preview
                            : `${process.env.REACT_APP_IMG_URL}/${state?.photo}`
                        }
                        // data={
                        //   state?.url || state?.url !== undefined
                        //     ? state?.url
                        //     : state?.url === null
                        //     ? preview
                        //     : `${process.env.REACT_APP_IMG_URL}/${state?.image}`
                        // }
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.name}
                          type="text"
                          name={"name"}
                          label={"Name"}
                          dispatch={dispatch}
                          placeholder={"Name"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.designation}
                          type="text"
                          name={"designation"}
                          label={"Designation"}
                          dispatch={dispatch}
                          placeholder={"Designation"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.facebook_link}
                          type="text"
                          name={"facebook_link"}
                          label={"Facebook Link"}
                          dispatch={dispatch}
                          placeholder={"Facebook Link"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.instagram_link}
                          type="text"
                          name={"instagram_link"}
                          label={"Instagram Link"}
                          dispatch={dispatch}
                          placeholder={"Instagram Link"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.twitter_link}
                          type="text"
                          name={"twitter_link"}
                          label={"Twitter Link"}
                          dispatch={dispatch}
                          placeholder={"Twitter Link"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer px-4">
                  <Link
                    className="btn btn-secondary btn-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    disabled={Object.values(state).some(
                      (e) => e === "" || e === null
                    )}
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary btn-pill d-flex align-items-center"
                  >
                    <span style={{ marginRight: "2px" }}>Update</span>{" "}
                    {loading && <ClockLoader color="#fff" size={15} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberModal;
