/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { http } from "../../../../components/action/axiosInstance";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import tost from "../../../../components/action/tost";
import { useReducer } from "react";
import InputEdit from "../../../../components/formComponent/InputEdit";
import EditLoader from "../../../../components/loader/EditLoader";
import { GetAdminCategory } from "../../../../api/admin/apiAdmin";

const ProblemTopicModal = ({ clickId, problemFetch }) => {
  const [loadingData, setLoadingData] = useState(false);
   const [loading, setLoading] = useState(false);
  const { categoryData } = GetAdminCategory();
  const initialState = {
    name: "",
    support_box_category_id: "",
  };
  const reducer = (state = initialState, action) => {
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
          support_box_category_id: action?.payload?.support_box_category_id,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(`/admin/supportproblem-topic/${clickId}`);
       dispatch({ type: "API_DATA", payload: res?.data?.message });
      setLoadingData(false);
    };
    getDataEditData();
  }, [clickId]);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    delete state.url;

    try {
      const data = await http.post(`admin/supportproblem-topic/${clickId}`, {
        ...state,
        _method: "PUT",
      });
       if (data.data.data !== "success") {
        tost(data?.data?.errors.name[0]);
      } else if (data.data.data === "success") {
        problemFetch();
        tost(data?.data.message);
      }

      e.target.reset();
      setLoading(false);
    } catch (error) {
      tost(error?.message);
      setLoading(false);
    }
    setLoading(false);
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
                Update Problem Topic
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
                Update Problem Topic {clickId}
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
                          defaultValue={state?.name}
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
                        <span>Select</span>
                      </label>
                      <div>
                        <select
                          id="parent-category"
                          name="support_box_category_id"
                          className="custom-select"
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
                          {categoryData?.map((data) => (
                            <option
                              selected={
                                data.id == state.support_box_category_id
                              }
                              key={data?.id}
                              value={data?.id}
                            >
                              {data?.name}
                            </option>
                          ))}
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
                    <span style={{ marginRight: "2px" }}>
                      Update Problem Topic
                    </span>{" "}
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

export default ProblemTopicModal;
