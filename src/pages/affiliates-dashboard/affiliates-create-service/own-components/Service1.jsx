import React, { useState } from "react";
import InputEdit from "../../../../components/formComponent/InputEdit";
import CreatableSelect from "react-select/creatable";
import TextAreaEdit from "../../../../components/formComponent/TextAreaEdit";
import VendorAddImagePreview from "../../../admin-dashboard/vendor/own-components/VendorAddImagePreview";
import { IMG_PATH } from "../../../../components/env";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import Category from "../../../../pages/vendor-dashboard/vendor-service/own-components/Category";
import SubCategory from "../../../../pages/vendor-dashboard/vendor-service/own-components/SubCategory";
import {
  http,
  multipartConfig,
} from "../../../../components/action/axiosInstance";
import EditLoader from "../../../../components/loader/EditLoader";
import preview from "../../../../assets/img/products/vender-upload-thumb-preview.jpg";

function Service1({
  state,
  dispatch,
  click,
  setClick,
  loading,
  isLoading,
  categoryAndSubData,
}) {
  console.log(state.required);
  const [loadingSave, setLoadingSave] = useState(false);

  const handleSubmitCompanions = async (e) => {
    e.preventDefault();
    setLoadingSave(true);
    try {
      const data = await http.post(
        `/main-services`,
        state.data,
        multipartConfig
      );
      console.log(data, "data");
      if (data.data.message === "Validation errors") {
        const vError = data?.data?.data;
        let getErrors = {
          service_category_id: vError["service_category_id"]
            ? vError["service_category_id"]
            : null,
          service_sub_category_id: vError["service_sub_category_id"]
            ? vError["service_sub_category_id"]
            : null,
          title: vError["title"] ? vError["title"] : null,
          tags: vError["tags"] ? vError["tags"] : null,
          description: vError["description"] ? vError["description"] : null,
          contract: vError["contract"] ? vError["contract"] : null,
          image: vError["image"] ? vError["image"] : null,
          commission: vError["commission"] ? vError["commission"] : null,
          commission_type: vError["commission_type"]
            ? vError["commission_type"]
            : null,
          images: vError["images"] ? vError["images"] : null,
        };
        if (Object.values(getErrors).some((e) => e)) {
          dispatch({
            type: "RES_VALIDATION",
            payload: getErrors,
          });
        } else {
          setClick(!click);
        }
      }
      setLoadingSave(false);
    } catch (error) {
      setLoadingSave(false);
      console.error(error);
    }
  };

  return (
    <div>
      <div className="modal-header px-4">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          Basic Information
        </h5>
      </div>
      {isLoading ? (
        <EditLoader />
      ) : (
        <>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <Category
                dispatch={dispatch}
                data={state.data.service_category_id}
                error={state.apiRes.service_category_id}
                options={state?.data?.categoryAndSubData}
              />
              <SubCategory
                dispatch={dispatch}
                subCategory={state?.data?.subCategoryData}
                error={state.apiRes.service_sub_category_id}
                data={state.data.service_sub_category_id}
                categoryID={state.data.service_category_id}
              />
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputEdit
                    defaultValue={state?.data?.title}
                    type="text"
                    name={"title"}
                    label={"Title"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Title"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                    error={state.apiRes.title ? state.apiRes.title[0] : null}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <label className="form-label">
                  Tags{" "}
                  {state.apiRes.tags && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.tags[0]})
                    </span>
                  )}
                </label>
                <CreatableSelect
                  className={`border-none-custom-css extra_css_for_design ${
                    state.apiRes.tags && "error"
                  }`}
                  isMulti
                  name="tags"
                  onChange={(e) =>
                    dispatch({
                      type: "META_KEY",
                      payload: e,
                    })
                  }
                />
              </div>
              <div className="col-md-12 mb-3">
                <TextAreaEdit
                  defaultValue={state?.data?.description}
                  row={2}
                  name={"description"}
                  label={"Description"}
                  dispatch={dispatch}
                  error={
                    state.apiRes.description
                      ? state.apiRes.description[0]
                      : null
                  }
                ></TextAreaEdit>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputEdit
                    defaultValue={state?.data?.contract}
                    type="text"
                    name={"contract"}
                    label={"Contract"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"facebook.com"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                    error={
                      state.apiRes.contract ? state.apiRes.contract[0] : null
                    }
                  />
                </div>
              </div>

              <div className="col-lg-6 position-relative">
                <div className="form-group row">
                  <label>
                    Image{" "}
                    {state.apiRes.image && (
                      <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                        ({state.apiRes.image[0]})
                      </span>
                    )}{" "}
                  </label>
                  <VendorAddImagePreview
                    dispatch={dispatch}
                    data={state.data.url ? state.data.url : preview}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputEdit
                    defaultValue={state?.data?.commission}
                    type="text"
                    name={"commission"}
                    label={"Commission"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Commission"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                    error={
                      state.apiRes.commission
                        ? state.apiRes.commission[0]
                        : null
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6 position-relative mb-3">
                <label for="parent-category">
                  <span>Commission Type</span>
                  <span className="position-absolute error start-0 mt-3"></span>
                </label>
                <div>
                  <select
                    id="parent-category"
                    name="commission_type"
                    className="custom-select"
                    onChange={(e) => {
                      dispatch({
                        type: "INPUT",
                        payload: {
                          name: "commission_type",
                          value: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected value={"flat"}>
                      flat
                    </option>
                    <option value={"percentage"}>percentage</option>
                  </select>
                </div>
              </div>

              <div className="col-12">
                <p className="mb-3">
                  Images{" "}
                  {state.apiRes.images && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.images[0]})
                    </span>
                  )}{" "}
                  <span style={{ fontSize: "10px" }}>
                    (You can choose multiple images)
                  </span>
                </p>
                <div className="form-group mb-6 advertiser_store_image_preview">
                  <div className="custom-file">
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        dispatch({
                          type: "MULTI_FILE",
                          payload: {
                            name: e.target.name,
                            value: e.target.files,
                            url: "images_url",
                          },
                        })
                      }
                      name="images"
                      className="custom-file-input"
                      id="coverImage"
                      accept="image/*"
                    />
                    <label className="custom-file-label" htmlFor="coverImage">
                      Choose file...
                    </label>
                  </div>
                  <div className="pre_imag-view">
                    {state?.data?.advertise_images?.map((e) => (
                      <div key={e.id} className="position-relative">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute"
                        >
                          Del
                        </button>
                        <img src={IMG_PATH + "/" + e.file} alt="asdad" />
                      </div>
                    ))}
                  </div>
                  <div className="pre_imag-view">
                    {state?.data?.images_url?.map((e) => (
                      <img
                        style={{ height: "50px", width: "50px" }}
                        src={e}
                        alt="asdad"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer px-4">
            <Link
              to={"/affiliates-dashboard/all-service"}
              className="btn btn-secondary btn-pill"
            >
              Cancel
            </Link>
            {/* <Link to={"/vendors-dashboard/create-services-packageInfo"}> */}

            <button
              // onClick={() => setClick(!click)}
              disabled={
                loadingSave ||
                Object.values(state.required).some((error) => error)
              }
              onClick={handleSubmitCompanions}
              type="button"
              className="btn btn-primary btn-pill d-flex align-items-center"
            >
              <span style={{ marginRight: "2px" }}>Saves & Continue</span>{" "}
              {loadingSave && <ClockLoader color="#fff" size={15} />}
            </button>
            {/* </Link> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Service1;
