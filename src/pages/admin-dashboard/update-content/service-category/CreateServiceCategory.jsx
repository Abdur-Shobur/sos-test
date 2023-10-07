import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMain from "../../../../components/formComponent/InputMain";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import { http } from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import CommonBreadCrumbs from "../../../../components/breadcrumbs/CommonBreadCrumbs";
import Aos from "aos";

const CreateServiceCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    data: {
      name: "",
    },
    required: {
      name: true,
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
        };
      default:
        return { state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = { ...state.data };
    try {
      const data = await http.post(`/admin/servicecategory`, getData);
      if (data.data.data !== "success") {
        tost(data?.data?.data?.name[0]);
      } else if (data.data.data === "success") {
        navigate("/admin/service-category");
        tost(data?.data.message);
      }
    } catch (error) {
      setLoading(false);
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
        <title>Add New Service Category-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add Service Category"
          link={{
            name: "All Service Category",
            path: "/admin/service-category",
          }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitMember}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <Helmet>
            <title>Add New Service Category-SOS</title>
          </Helmet>
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add New Service Category
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"name"}
                    label={"Service Category Name"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Category"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/admin/service-category"}
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
              <span style={{ marginRight: "2px" }}>Create Category</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceCategory;
