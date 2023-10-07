import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import {
  http,
  multipartConfig,
} from "../../../../../components/action/axiosInstance";
import tost from "../../../../../components/action/tost";
import { toast } from "react-toastify";
import CommonBreadCrumbs from "../../../../../components/breadcrumbs/CommonBreadCrumbs";
import { useEffect } from "react";
import Aos from "aos";
// import { IMG_PATH } from "../../../../../components/env";

const AdvertiserDelivary = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const oldId = useParams().id;

  const initialState = {
    data: {
      advertise_id: oldId,
      files: [],
      files_url: [],
    },
    required: {
      files: true,
    },
    apiRes: {
      files: null,
    },
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "MULTI_FILE":
        let imgFile = [];
        let imgUrl = [];
        for (let i = 0; i < action.payload.value.length; i++) {
          imgFile.push(action.payload.value[i]);
          imgUrl.push(URL.createObjectURL(action.payload.value[i]));
        }
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.name]: imgFile,
            [action.payload.url]: imgUrl,
          },
          required: {
            ...state.required,
            files: false,
          },
          apiRes: {
            ...state.apiRes,
            files: null,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    setLoading(true);
    delete state.data.files_url;
    const getData = { ...state.data };
    try {
      const data = await http.post(
        `/admin/advertise/delivery`,
        getData,
        multipartConfig
      );
      console.log("output", data);
      if (data?.data?.data !== "success") {
        toast(data?.data?.data.advertise_id[0]);
      } else if (data?.data?.data === "success") {
        navigate("/admin/advertise-content");
        tost(data?.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Add New Files-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add New Files"
          link={{ name: "All Advertiser", path: "/admin/advertise-content" }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitTestimonial}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add Delivery Files
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-12">
                <p className="mb-3">
                  Images{" "}
                  {state.apiRes.files && (
                    <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                      ({state.apiRes.files[0]})
                    </span>
                  )}{" "}
                  <span style={{ fontSize: "10px" }}>
                    (You can choose multiple images)
                  </span>
                </p>
                <div
                  style={{ flexDirection: "column" }}
                  className="form-group mb-3 advertiser_store_image_preview"
                >
                  <div style={{ maxWidth: "100%" }} className="custom-file">
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        dispatch({
                          type: "MULTI_FILE",
                          payload: {
                            name: e.target.name,
                            value: e.target.files,
                            url: "files_url",
                          },
                        })
                      }
                      name="files"
                      className="custom-file-input"
                      id="coverImage"
                      accept=".jpg, .jpeg, .png, .pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    <label className="custom-file-label" htmlFor="coverImage">
                      Choose file...
                    </label>
                  </div>
                  {/* <div className="pre_imag-view">
                    {state?.data?.files?.map((e) => (
                      <div key={e.id} className="position-relative">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute"
                        >
                          Del
                        </button>
                        <img src={IMG_PATH + "/" + e.file} alt="Img" />
                      </div>
                    ))}
                  </div> */}
                  {state?.data?.files[0]?.name?.endsWith(".png") ||
                  state?.data?.files[0]?.name?.endsWith(".jpg") ||
                  state?.data?.files[0]?.name?.endsWith(".jpeg") ? (
                    <div className="pre_imag-view">
                      {state?.data?.files_url?.map((e) => (
                        <img
                          style={{ height: "50px", width: "50px" }}
                          src={e}
                          alt="Img"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="pre_imag-view">
                      {state?.data?.files_url?.map((e) => (
                        <img
                          style={{ width: "40px", height: "50px" }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                          alt="Pdf img"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/admin/advertise-content"}
              className="btn btn-secondary btn-pill"
            >
              Cancel
            </Link>
            <button
              disabled={
                loading || Object.values(state.required).some((error) => error)
              }
              type="submit"
              className="btn btn-primary btn-pill d-flex align-items-center"
            >
              <span style={{ marginRight: "2px" }}>Upload File</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertiserDelivary;
