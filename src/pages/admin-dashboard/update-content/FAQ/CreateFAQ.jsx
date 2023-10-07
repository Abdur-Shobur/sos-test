import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMain from "../../../../components/formComponent/InputMain";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import { http } from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import TextAreaEdit from "../../../../components/formComponent/TextAreaEdit";
import CommonBreadCrumbs from "../../../../components/breadcrumbs/CommonBreadCrumbs";
import Aos from "aos";

const CreateFAQ = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    data: {
      heading: "",
      description: "",
    },
    required: {
      heading: true,
      description: true,
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
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitFAQ = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = { ...state.data };
    try {
      const data = await http.post(`/admin/faq`, getData);
      if (data.data.status === 400) {
        tost(data?.data?.errors.name[0]);
      } else if (data.data.status === 200) {
        navigate("/admin/faq");
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
        <title>Add New FAQ-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add FAQ"
          link={{ name: "All FAQ", path: "/admin/faq" }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitFAQ}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add New FAQ
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"heading"}
                    label={"Heading"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Heading"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <TextAreaEdit
                    label={"Description"}
                    name={"description"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Email"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-email"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link to={"/admin/faq"} className="btn btn-secondary btn-pill">
              Cancel
            </Link>
            <button
              disabled={
                loading || Object.values(state.required).some((error) => error)
              }
              type="submit"
              className="btn btn-primary btn-pill d-flex align-items-center"
            >
              <span style={{ marginRight: "2px" }}>Save FAQ</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFAQ;
