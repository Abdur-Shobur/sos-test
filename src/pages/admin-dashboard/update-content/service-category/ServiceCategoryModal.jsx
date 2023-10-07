import React, { useEffect, useState } from "react";
import { http } from "../../../../components/action/axiosInstance";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import tost from "../../../../components/action/tost";
import { useReducer } from "react";
import InputEdit from "../../../../components/formComponent/InputEdit";
import EditLoader from "../../../../components/loader/EditLoader";

const ServiceCategoryModal = ({ clickId, serviceFetch }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: "",
    status: "",
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

      case "API_DATA":
        return {
          name: action?.payload?.name,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(`/admin/servicecategory/${clickId}`);
      setModalData(res?.data?.message);
      dispatch({ type: "API_DATA", payload: res?.data?.message });
      setLoadingData(false);
    };
    getDataEditData();
  }, [clickId]);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);

    try {
      const data = await http.post(`/admin/servicecategory/${modalData?.id}`, {
        ...state,
        _method: "PUT",
      });

      if (data.data.data !== "success") {
        tost(data?.data?.data?.name[0]);
      } else if (data.data.data === "success") {
        serviceFetch();
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
                Update Category
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
                Update Category
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
                    <div className="col-12 position-relative">
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
                          name="status"
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
                          <option selected={modalData?.status === "active"}>
                            active
                          </option>
                          <option selected={modalData?.status === "deactivate"}>
                            deactivate
                          </option>
                        </select>
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
                    <span style={{ marginRight: "2px" }}>Update Category</span>{" "}
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

export default ServiceCategoryModal;
