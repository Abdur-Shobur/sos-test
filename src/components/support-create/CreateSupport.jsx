import React from "react";
import InputMain from "../formComponent/InputMain";
import TextArea from "../formComponent/TextArea";
import { ClockLoader } from "react-spinners";
import EditLoader from "../loader/EditLoader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function CreateSupportBox({
  handleSubmitData,
  dispatch,
  state,
  allTicketCategoryData,
  problemData,
  loadingData,
  loading,
  supportLoading,
}) {
  if (supportLoading) return <EditLoader />;
  return (
    <div className="col-12">
      <Helmet>
        <title>Create Support-SOS</title>
      </Helmet>
      <div className="ec-vendor-list card card-default">
        <div className="card-body">
          <form
            onSubmit={handleSubmitData}
            style={{ maxWidth: "800px", margin: "30px auto" }}
            className="ec-cat-form shadow md-p-4 p-0"
          >
            <div className="modal-header px-4">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Add New Ticket
              </h5>
            </div>
            <div className="modal-body px-4">
              <div className="row mb-2">
                <div className="col-lg-12">
                  <div className="ec-vendor-upload-detail">
                    <div className="row g-3">
                      <div className="col-lg-12">
                        <div className="form-group mb-4 position-relative">
                          <InputMain
                            type="text"
                            name={"subject"}
                            label={"Subject"}
                            require={true}
                            dispatch={dispatch}
                            placeholder={"Subject"}
                            dispatch_type={"INPUT"}
                            id={"admin-add-affiliates-name"}
                            error={
                              state.apiResponse.subject
                                ? state.apiResponse.subject
                                : null
                            }
                          />
                        </div>
                      </div>
                      {/* category */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Select Categories{" "}
                          {state.apiResponse.support_box_category_id && (
                            <span
                              style={{
                                fontSize: "10px",
                                color: "#ff4e4e",
                              }}
                            >
                              ({state.apiResponse.support_box_category_id[0]})
                            </span>
                          )}
                        </label>
                        <select
                          style={{
                            border:
                              state.apiResponse.support_box_category_id &&
                              "1px solid #ffa7a7",
                          }}
                          id="parent-category"
                          name="support_box_category_id"
                          class="custom-select"
                          require={true}
                          onChange={(e) => {
                            dispatch({
                              type: "CATEGORY_SELECT",
                              payload: {
                                name: e.target.name,
                                value: e.target.value,
                              },
                            });
                          }}
                        >
                          <option selected disabled>
                            Select
                          </option>
                          allTicketCategoryData && (
                          {allTicketCategoryData?.map((data) => (
                            <option value={data?.id}>{data?.name}</option>
                          ))}
                          )
                        </select>
                      </div>
                      {/* sub category */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Select Sub Categories{" "}
                          {state.apiResponse.support_problem_topic_id && (
                            <span
                              style={{
                                fontSize: "10px",
                                color: "#ff4e4e",
                              }}
                            >
                              ({state.apiResponse.support_problem_topic_id[0]})
                            </span>
                          )}
                        </label>
                        <select
                          style={{
                            border:
                              state.apiResponse.support_problem_topic_id &&
                              "1px solid #ffa7a7",
                          }}
                          id="parent-category"
                          name="support_problem_topic_id"
                          class="custom-select"
                          require={true}
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
                          <option selected>
                            {loadingData ? "..." : "Select"}
                          </option>
                          {problemData?.problems?.map((data) => (
                            <option value={data?.id}>{data?.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* suject  */}
                      <div class="mb-3">
                        <label for="formFileSm" class="form-label">
                          Attachment (Optional)
                        </label>
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "FILE",
                              payload: e.target.files[0],
                            })
                          }
                          class="form-control form-control-sm"
                          id="formFileSm"
                          type="file"
                          name="file"
                        />
                      </div>

                      {/* Meta description */}
                      <div className="col-md-12">
                        <TextArea
                          dispatch={dispatch}
                          label="Description"
                          name="description"
                          require={true}
                          placeholder="Your Message"
                          row={4}
                          error={state.apiResponse.description}
                        />
                      </div>
                      <div className="modal-footer">
                        <Link
                          to={"/vendors-dashboard/all-support-ticket"}
                          className="btn btn-secondary btn-pill"
                        >
                          Cancel
                        </Link>
                        <button
                          disabled={loading}
                          type="submit"
                          className="btn btn-primary btn-pill d-flex align-items-center"
                        >
                          <span style={{ marginRight: "2px" }}>
                            Create Ticket
                          </span>{" "}
                          {loading && <ClockLoader color="#fff" size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSupportBox;
