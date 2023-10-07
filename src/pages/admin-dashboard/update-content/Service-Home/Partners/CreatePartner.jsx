import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import {
  http,
  multipartConfig,
} from "../../../../../components/action/axiosInstance";
import tost from "../../../../../components/action/tost";
import VendorAddImagePreview from "../../../vendor/own-components/VendorAddImagePreview";
import preview from "../../../../../assets/img/products/vender-upload-thumb-preview.jpg";
import { toast } from "react-toastify";
import CommonBreadCrumbs from "../../../../../components/breadcrumbs/CommonBreadCrumbs";
import { useEffect } from "react";
import Aos from "aos";

const CreatePartner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    data: {
      image: {},
    },
    required: {
      image: true,
    },
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "FILE":
        return {
          ...state,
          data: {
            url: action.payload ? URL.createObjectURL(action.payload) : preview,
            image: action.payload,
          },
          required: {
            ...state.required,
            image: false,
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
    delete state.data.url;
    const getData = { ...state.data };
    try {
      const data = await http.post(`/admin/partner`, getData, multipartConfig);
      if (data.data.status === 400) {
        toast(data?.data?.errors.image[0]);
      } else if (data.data.status === 200) {
        navigate("/admin/partner");
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
        <title>Add New Partner-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add New Partner"
          link={{ name: "All Partner", path: "/admin/partner" }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitTestimonial}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add New Parnter{" "}
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
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link to={"/admin/partner"} className="btn btn-secondary btn-pill">
              Cancel
            </Link>
            <button
              disabled={
                loading || Object.values(state.required).every((error) => error)
              }
              type="submit"
              className="btn btn-primary btn-pill d-flex align-items-center"
            >
              <span style={{ marginRight: "2px" }}>Create Partner</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartner;
