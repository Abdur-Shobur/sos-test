import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMain from "../../../../components/formComponent/InputMain";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import TextArea from "../../../../components/formComponent/TextArea";
import {
  http,
  multipartConfig,
} from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import VendorAddImagePreview from "../../vendor/own-components/VendorAddImagePreview";
import preview from "../../../../assets/img/products/vender-upload-thumb-preview.jpg";
import ReactStars from "react-rating-stars-component";
import CommonBreadCrumbs from "../../../../components/breadcrumbs/CommonBreadCrumbs";
import { useEffect } from "react";
import Aos from "aos";

const CreateTestimonial = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    data: {
      name: "",
      designation: "",
      description: "",
      image: "",
      rating: "",
    },
    required: {
      name: true,
      designation: true,
      description: true,
      image: true,
      rating: true,
    },
  };

  const reducer = (state, action) => {
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
        };
      case "FILE":
        return {
          ...state,
          data: {
            ...state.data,
            url: action.payload ? URL.createObjectURL(action.payload) : preview,
            image: action.payload,
          },
          required: {
            ...state.required,
            image: false,
          },
        };
      case "RATING":
        return {
          ...state,
          data: {
            ...state.data,
            rating: action.payload,
          },
          required: {
            ...state.required,
            rating: false,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const ratingChanged = (newRating) => {
    dispatch({ type: "RATING", payload: newRating });
  };

  const handleSubmitTestimonial = async (e) => {
    e.preventDefault();
    setLoading(true);
    delete state.data.url;
    const getData = { ...state.data };
    try {
      const data = await http.post(
        `/admin/testimonial`,
        getData,
        multipartConfig
      );
      if (data.data.status === 400) {
        tost(data?.data?.errors.name[0]);
      } else if (data.data.status === 200) {
        navigate("/admin/testimonial");
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
        <title>Add New Testimonial-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add New Testimonial"
          link={{ name: "All Testimonial", path: "/admin/testimonial" }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitTestimonial}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add New Testimonial
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="form-group row mb-6">
                <VendorAddImagePreview
                  dispatch={dispatch}
                  data={state.data.url ? state.data.url : preview}
                />
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"name"}
                    label={"Name"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Name"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    require={true}
                    name={"designation"}
                    label={"Designation"}
                    dispatch={dispatch}
                    placeholder={"Designation"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-number"}
                  />
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

              <div className="col-lg-12">
                <div className="form-group mb-4">
                  <label className="m-0">Rating</label>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={28}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/admin/testimonial"}
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
              <span style={{ marginRight: "2px" }}>Create Testimonal</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestimonial;
