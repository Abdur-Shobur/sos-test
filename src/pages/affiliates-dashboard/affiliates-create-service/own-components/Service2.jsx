import React from "react";
import ReachTextEditor from "../../../../components/reacth-text-editor/ReachTextEditor";
import { ClockLoader } from "react-spinners";
import InputEdit from "../../../../components/formComponent/InputEdit";
import InputSelect from "../../../../pages/vendor-dashboard/vendor-service/own-components/InputSelect";
import InputSelectRevision from "../../../../pages/vendor-dashboard/vendor-service/own-components/InputSelectRevision";

function Service2({
  state,
  dispatch,
  loading,
  click,
  setClick,
  handleSubmitCompanions,
}) {
   return (
    <>
      <div className="modal-header px-4">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          Service Package Information
        </h5>
      </div>
      <div className="modal-body px-4">
        <div className="row mb-2">
          <div
            className="col-lg-4"
            style={{
              borderRight: "1px solid #00000017",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                marginBottom: "3px",
                borderBottom: "1px solid #00000017",
                paddingBottom: "10px",
              }}
            >
              Basic
            </p>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.package_title__1}
                  dispatch={dispatch}
                  label="Package Title"
                  name="package_title__1"
                  placeholder="Package_title"
                  require={true}
                  type="text"
                  error={
                    !state.data.package_title__1 && state.apiRes.package_title
                      ? state.apiRes.package_title[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.price__1}
                  dispatch={dispatch}
                  label="Price"
                  name="price__1"
                  placeholder="Price"
                  require={true}
                  type="text"
                  error={
                    !state.data.price__1 && state.apiRes.price
                      ? state.apiRes.price[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-12 position-relative mb-3">
              <InputSelect
                state={state}
                name={"times__1"}
                dispatch={dispatch}
              />
            </div>
            <div className="col-12 position-relative mb-3">
              <InputSelectRevision
                state={state}
                name={"revision_max_time__1"}
                dispatch={dispatch}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="">
                Description{" "}
                {(state.data.package_description__1 === "<p><br></p>" ||
                  state.data.package_description__1 === null) &&
                  state.apiRes.package_description && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.package_description[0]})
                    </span>
                  )}{" "}
              </label>
              <ReachTextEditor
                value={state.data.package_description__1}
                dispatch={dispatch}
                name="package_description__1"
              />
            </div>
          </div>
          <div
            className="col-lg-4"
            style={{
              borderRight: "1px solid #00000017",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                marginBottom: "3px",
                borderBottom: "1px solid #00000017",
                paddingBottom: "10px",
              }}
            >
              Standerd
            </p>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.package_title__2}
                  dispatch={dispatch}
                  label="Package Title"
                  name="package_title__2"
                  placeholder="Package_title"
                  require={true}
                  type="text"
                  error={
                    !state.data.package_title__2 && state.apiRes.package_title
                      ? state.apiRes.package_title[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.price__2}
                  dispatch={dispatch}
                  label="Price"
                  name="price__2"
                  placeholder="Price"
                  require={true}
                  type="text"
                  error={
                    !state.data.price__2 && state.apiRes.price
                      ? state.apiRes.price[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-12 position-relative mb-3">
              <InputSelect
                state={state}
                name={"times__2"}
                dispatch={dispatch}
              />
            </div>

            <div className="col-12 position-relative mb-3">
              <InputSelectRevision
                state={state}
                name={"revision_max_time__2"}
                dispatch={dispatch}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="">
                Description{" "}
                {(state.data.package_description__2 === "<p><br></p>" ||
                  state.data.package_description__2 === null) &&
                  state.apiRes.package_description && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.package_description[0]})
                    </span>
                  )}{" "}
              </label>
              <ReachTextEditor
                value={state.data.package_description__2}
                name="package_description__2"
                dispatch={dispatch}
              />
            </div>
          </div>
          <div className="col-lg-4" style={{ marginBottom: "30px" }}>
            <p
              style={{
                marginBottom: "3px",
                borderBottom: "1px solid #00000017",
                paddingBottom: "10px",
              }}
            >
              Premium
            </p>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.package_title__3}
                  dispatch={dispatch}
                  label="Package Title"
                  name="package_title__3"
                  placeholder="Package_title"
                  require={true}
                  type="text"
                  error={
                    !state.data.package_title__3 && state.apiRes.package_title
                      ? state.apiRes.package_title[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3 mt-3 position-relative">
                <InputEdit
                  defaultValue={state.data.price__3}
                  dispatch={dispatch}
                  label="Price"
                  name="price__3"
                  placeholder="Price"
                  require={true}
                  type="text"
                  error={
                    !state.data.price__3 && state.apiRes.price
                      ? state.apiRes.price[0]
                      : null
                  }
                />
              </div>
            </div>
            <div className="col-12 position-relative mb-3">
              <InputSelect
                state={state}
                name={"times__3"}
                dispatch={dispatch}
              />
            </div>
            <div className="col-12 position-relative mb-3">
              <InputSelectRevision
                state={state}
                name={"revision_max_time__3"}
                dispatch={dispatch}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="">
                Description{" "}
                {(state.data.package_description__3 === "<p><br></p>" ||
                  state.data.package_description__3 === null) &&
                  state.apiRes.package_description && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.package_description[0]})
                    </span>
                  )}{" "}
              </label>
              <ReachTextEditor
                value={state.data.package_description__3}
                name="package_description__3"
                dispatch={dispatch}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer px-4">
        <button
          onClick={() => setClick(!click)}
          className="btn btn-secondary btn-pill"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          onClick={handleSubmitCompanions}
          className="btn btn-primary btn-pill d-flex align-items-center"
        >
          <span style={{ marginRight: "2px" }}>Submit</span>{" "}
          {loading && <ClockLoader color="#fff" size={15} />}
        </button>
      </div>
    </>
  );
}

export default Service2;