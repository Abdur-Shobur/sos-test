import React from "react";
import InputEdit from "../../../components/formComponent/InputEdit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ServiceUpdate2 = ({ state, dispatch }) => {
  console.log(state.data.packages);
  return (
    <>
      <div className="modal-header px-4">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          Service Package Information
        </h5>
      </div>
      <div className="modal-body">
        <div className="row mb-2">
          {/* <p
                style={{
                  marginBottom: "3px",
                  borderBottom: "1px solid #00000017",
                  paddingBottom: "10px",
                }}
              >
                Basic
              </p> */}
          {state?.data?.servicepackages?.map((e, i) => (
            <div key={e.id} className="col-lg-4">
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.package_title}
                    dispatch={dispatch}
                    label="Package Title"
                    name={`package_title__` + (i + 1)}
                    placeholder="Package_title"
                    require={true}
                    type="text"
                    dispatchType="UPDATE_PACKAGE"
                    error={state.apiRes.package_title}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.price}
                    dispatch={dispatch}
                    label="Price"
                    name={"price__" + (i + 1)}
                    placeholder="Price"
                    require={true}
                    type="text"
                    dispatchType="UPDATE_PACKAGE"
                    error={state.apiRes.price}
                  />
                </div>
              </div>
              <div className="col-12 position-relative mb-3">
                <label for="parent-category">
                  <span>Times</span>
                  <span>
                    Category{" "}
                    {state.apiRes.time && (
                      <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                        ({state.apiRes.time[0]})
                      </span>
                    )}
                  </span>{" "}
                </label>
                <div>
                  <select
                    style={{
                      border: state.apiRes.time && "1px solid #ffa7a7",
                    }}
                    id="parent-category"
                    name={"times__" + (i + 1)}
                    className="custom-select"
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_PACKAGE",
                        payload: {
                          name: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected={e.time == "1"} value={"1"}>
                      1 Day
                    </option>
                    <option selected={e.time == "2"} value={"2"}>
                      2 Day
                    </option>
                    <option selected={e.time == "3"} value={"3"}>
                      3 Day
                    </option>
                    <option selected={e.time == "7"} value={"7"}>
                      7 Day
                    </option>
                    <option selected={e.time == "10"} value={"10"}>
                      10 Day
                    </option>
                    <option selected={e.time == "15"} value={"15"}>
                      15 Day
                    </option>
                    <option selected={e.time == "21"} value={"21"}>
                      21 Day
                    </option>
                    <option selected={e.time == "30"} value={"30"}>
                      30 Day
                    </option>
                  </select>
                </div>
              </div>{" "}
              <div className="col-12 position-relative mb-3">
                <label for="parent-category">
                  <span>Revision Max Time </span>
                  {state.apiRes.revision_max_time && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.revision_max_time[0]})
                    </span>
                  )}{" "}
                </label>
                <div>
                  <select
                    style={{
                      border:
                        state.apiRes.revision_max_time && "1px solid #ffa7a7",
                    }}
                    id="parent-category"
                    name="revision_max_time"
                    className="custom-select"
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_PACKAGE",
                        payload: {
                          name: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected={e.revision_max_time === "1"} value={"1"}>
                      1 Time
                    </option>
                    <option selected={e.revision_max_time === "2"} value={"2"}>
                      2 Times
                    </option>
                    <option selected={e.revision_max_time === "3"} value={"3"}>
                      3 Times
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <label htmlFor="">
                  Description{" "}
                  {state.apiRes.package_description &&
                    !state.data.packages.package_description__ + (i + 1) && (
                      <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                        ({state.apiRes.package_description[0]})
                      </span>
                    )}
                </label>
                {/* <ReachTextEditor
									value={e?.package_description}
									dispatch={dispatch}
									name="package_description"
								/> */}
                <ReactQuill
                  theme="snow"
                  value={state.data.packages["package_description__" + (i + 1)]}
                  onChange={(content) =>
                    dispatch({
                      type: "UPDATE_PACKAGE",
                      payload: {
                        name: "package_description__" + (i + 1),
                        value: content,
                      },
                    })
                  }
                  style={{ minHeight: "150px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceUpdate2;
