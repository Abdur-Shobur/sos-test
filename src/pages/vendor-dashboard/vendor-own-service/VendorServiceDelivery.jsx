import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import {
  http,
  multipartConfig,
} from "../../..//components/action/axiosInstance";
import tost from "../../../components/action/tost";
import { toast } from "react-toastify";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { useEffect } from "react";
import Aos from "aos";
import TextArea from "../../../components/formComponent/TextArea";

const VendorServiceDelivery = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const oldId = useParams().id;

  const initialState = {
    data: {
      service_order_id: oldId,
      description: "",
      files: [],
      files_url: [],
    },
    required: {
      files: true,
      description: true,
    },
    apiRes: {
      files: null,
      description: null,
    },
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.name]: action.payload.value,
          },
          required: {
            ...state.required,
            [action.payload.name]: action.payload.value.trim() ? false : true,
          },
          apiRes: {
            ...state?.apiRes,
            description: null,
          },
        };
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
        `/service/delivery-to-customer`,
        getData,
        multipartConfig
      );
      if (data?.data?.data !== "success") {
        toast(data?.data?.errors.files[0]);
      } else if (data?.data?.data === "success") {
        navigate("/vendors-dashboard/service-order");
        tost(data?.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };

  console.log("state", state);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Service Delivery-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Service Delivery"
          link={{
            name: "All Service",
            path: "/vendors-dashboard/service-order",
          }}
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
                      {state?.data?.files_url?.map((e, i) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1536"
                          height="1792"
                          viewBox="0 0 1536 1792"
                          style={{ width: "40px", height: "50px" }}
                        >
                          <path
                            fill="currentColor"
                            d="M1468 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528V640H992q-40 0-68-28t-28-68V128H128v1536h1280zm-514-593q33 26 84 56q59-7 117-7q147 0 177 49q16 22 2 52q0 1-1 2l-2 2v1q-6 38-71 38q-48 0-115-20t-130-53q-221 24-392 83q-153 262-242 262q-15 0-28-7l-24-12q-1-1-6-5q-10-10-6-36q9-40 56-91.5t132-96.5q14-9 23 6q2 2 2 4q52-85 107-197q68-136 104-262q-24-82-30.5-159.5T657 552q11-40 42-40h22q23 0 35 15q18 21 9 68q-2 6-4 8q1 3 1 8v30q-2 123-14 192q55 164 146 238zm-576 411q52-24 137-158q-51 40-87.5 84t-49.5 74zm398-920q-15 42-2 132q1-7 7-44q0-3 7-43q1-4 4-8q-1-1-1-2q-1-2-1-3q-1-22-13-36q0 1-1 2v2zm-124 661q135-54 284-81q-2-1-13-9.5t-16-13.5q-76-67-127-176q-27 86-83 197q-30 56-45 83zm646-16q-24-24-140-24q76 28 124 28q14 0 18-1q0-1-2-3z"
                          />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <TextArea
                    label={"Description"}
                    name={"description"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Description"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-email"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/vendors-dashboard/service-order"}
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
              <span style={{ marginRight: "2px" }}>Submit Delivery</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorServiceDelivery;
