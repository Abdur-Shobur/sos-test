import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GetAdminCategorySinlgeData,
  GetAdminVendorSinlgeServiceData,
} from "../../../api/admin/apiAdmin";
import EditLoader from "../../../components/loader/EditLoader";
import InputEdit from "../../../components/formComponent/InputEdit";
import TextAreaEdit from "../../../components/formComponent/TextAreaEdit";
import { IMG_PATH } from "../../../components/env";
import VendorPackageInfo from "./VendorPackageInfo";
import { http } from "../../../components/action/axiosInstance";
import { photoView } from "../../../components/action/actions";

const GetVendorSingleService = () => {
  const [sub, setSub] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const id = useParams().id;

  //   get vendor single service data query by id
  const { vendorSingleServiceData: data, isLoading } =
    GetAdminVendorSinlgeServiceData(id);

  // get category data
  const { categorySingleData, isLoading: loader } = GetAdminCategorySinlgeData(
    data?.service_category_id
  );

  //   get sub category data
  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(
        `/admin/service-sub-category/${data?.service_sub_category_id}`
      );
      setSub(res?.data?.message);
      setLoadingData(false);
    };
    getDataEditData();
  }, [data?.service_sub_category_id]);

  return (
    <div>
      <div style={{ margin: "20px" }}>
        <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
          <div>
            <h1>Vendor Service</h1>
            <p className="breadcrumbs">
              <span>
                <a href="/">Home</a>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Vendor Service
            </p>
          </div>
          <div>
            <Link className="btn btn-primary" to="/admin/vendor-service">
              See All
            </Link>
          </div>
        </div>
        {isLoading && loader && loadingData ? (
          <EditLoader />
        ) : (
          <form>
            <div className="modal-header px-4">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Basic Information
              </h5>
            </div>

            <div className="modal-body px-lg-4 px-2">
              <div className="row mb-2">
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={categorySingleData?.name}
                      type="text"
                      name={"name"}
                      readOnly={"readOnly"}
                      label={"Name"}
                      require={true}
                      placeholder={"Category"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={sub?.name}
                      type="text"
                      name={"name"}
                      readOnly={"readOnly"}
                      label={"Name"}
                      require={true}
                      placeholder={"Sub Category"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={data?.title}
                      type="text"
                      name={"title"}
                      readOnly={"readOnly"}
                      label={"Title"}
                      require={true}
                      placeholder={"Title"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={data?.tags}
                      type="text"
                      name={"title"}
                      label={"Title"}
                      readOnly={"readOnly"}
                      require={true}
                      placeholder={"Title"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <TextAreaEdit
                    defaultValue={data?.description}
                    row={3}
                    readOnly={"readOnly"}
                    name={"description"}
                    label={"Description"}
                  ></TextAreaEdit>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={data?.contract}
                      type="text"
                      name={"contract"}
                      label={"Contract"}
                      readOnly={"readOnly"}
                      require={true}
                      placeholder={"facebook.com"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-lg-6 position-relative">
                  <div className="form-group row">
                    <label>Image </label>
                    {/* <img
                      style={{ borderRadius: "5px", width: "150px" }}
                      src={`${process.env.REACT_APP_IMG_URL}/${data?.image}`}
                      alt="asdad"
                    /> */}
                    <img
                      onClick={() => photoView(data?.image.replace(/\//g, "/"))}
                      src={IMG_PATH + "/" + data?.image}
                      style={{
                        borderRadius: "15px",
                        maxWidth: "150px",
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      alt="video"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={data?.commission}
                      type="text"
                      name={"commission"}
                      label={"Commission"}
                      require={true}
                      readOnly={"readOnly"}
                      placeholder={"Commission"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-4 position-relative">
                    <InputEdit
                      defaultValue={data?.commission_type}
                      type="text"
                      name={"commission_type"}
                      readOnly={"readOnly"}
                      label={"Commission Type"}
                      require={true}
                      placeholder={"Commission"}
                      dispatch_type={"INPUT"}
                      id={"admin-add-affiliates-name"}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <p className="mb-3">Images</p>
                  <div
                    style={{ gap: "0" }}
                    className="form-group mb-2 advertiser_store_image_preview"
                  >
                    <div className="pre_imag-view">
                      {data?.data?.advertise_images?.map((e) => (
                        <div key={e.id} className="position-relative">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute"
                          >
                            Del
                          </button>
                          {/* <img src={IMG_PATH + "/" + e.file} alt="asdad" /> */}
                          {/* <img
                            onClick={() =>
                              photoView(e?.files.replace(/\//g, "/"))
                            }
                            src={IMG_PATH + "/" + e?.files}
                            style={{
                              borderRadius: "15px",
                              maxWidth: "100px",
                              width: "100%",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            alt="img" 
                          />*/}
                        </div>
                      ))}
                    </div>
                    <div className="pre_imag-view">
                      {data?.serviceimages?.map((e) => (
                        <img
                          style={{ height: "50px", width: "50px" }}
                          src={`${process.env.REACT_APP_IMG_URL}/${e?.images}`}
                          alt="img"
                        />
                        // <img
                        //   onClick={() =>
                        //     photoView(e?.images.replace(/\//g, "/"))
                        //   }
                        //   src={IMG_PATH + "/" + e?.images}
                        //   style={{
                        //     borderRadius: "15px",
                        //     maxWidth: "100px",
                        //     width: "100%",
                        //     objectFit: "cover",
                        //     cursor: "pointer",
                        //   }}
                        //   alt="img"
                        // />
                      ))}
                    </div>
                  </div>
                </div>
                <VendorPackageInfo data={data} />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GetVendorSingleService;
