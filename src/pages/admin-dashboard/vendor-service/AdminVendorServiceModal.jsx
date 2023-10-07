import React, { useEffect, useState } from "react";
import { http } from "../../../components/action/axiosInstance";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import tost from "../../../components/action/tost";
import { useReducer } from "react";
import InputEdit from "../../../components/formComponent/InputEdit";
import EditLoader from "../../../components/loader/EditLoader";

const AdminVendorServiceModal = ({ clickId, refetch }) => {
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const initialState = {
    commission: "",
    status: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "API_DATA":
        return {
          ...action.payload,
        };
      default:
        return { state };
    }
  };

  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(`/admin/vendor-services/${clickId}`);
      setModalData(res?.data?.message);
      dispatch({ type: "API_DATA", payload: res?.data?.message });
      setLoadingData(false);
    };
    getDataEditData();
  }, [clickId]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await http.put(`/admin/vendor-services/${clickId}`, state);
      console.log(data, "fldkfksdf");
      if (data.data.data !== "success") {
        tost(data?.data?.errors.name[0]);
      } else if (data.data.data === "success") {
        refetch();
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
                Update Vendor Service
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
                Update Vendor Service
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
                    <div className="col-lg-12">
                      <div className="form-group mb-4 position-relative">
                        <InputEdit
                          defaultValue={modalData?.commission}
                          type="text"
                          name={"commission"}
                          label={"Commission"}
                          require={true}
                          dispatch={dispatch}
                          placeholder={"Commission"}
                          dispatch_type={"INPUT"}
                          id={"admin-add-affiliates-name"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label for="parent-category">
                        <span>Status</span>
                        <span className="position-absolute error start-0 mt-3"></span>
                      </label>
                      <div>
                        <select
                          style={{
                            width: "100%",
                            height: "45px",
                            margin: "0",
                            padding: "0 15px",
                            border: "1px solid #eeeeee",
                            backgroundColor: "transparent",
                            color: "#777",
                            boxShadow: "none",
                            outline: "none",
                            borderRadius: "15px",
                          }}
                          id="parent-category"
                          name={"status"}
                          className="custom-select"
                          onChange={(e) => {
                            dispatch({
                              type: "INPUT",
                              payload: {
                                name: e.target.name,
                                value: e.target.value,
                              },
                            });
                          }}
                        >
                          <option
                            value={"pending"}
                            selected={modalData?.status === "pending"}
                          >
                            pending
                          </option>
                          <option
                            value={"active"}
                            selected={modalData?.status === "active"}
                          >
                            active
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer px-4">
                  <Link
                    to={"/admin/missions"}
                    className="btn btn-secondary btn-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <button
                    disabled={loading}
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary btn-pill d-flex align-items-center"
                  >
                    <span style={{ marginRight: "2px" }}>Save Companions</span>{" "}
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

export default AdminVendorServiceModal;
