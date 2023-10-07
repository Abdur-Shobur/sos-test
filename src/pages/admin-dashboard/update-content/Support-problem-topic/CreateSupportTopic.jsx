import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMain from "../../../../components/formComponent/InputMain";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import { http } from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import { GetAdminCategory } from "../../../../api/admin/apiAdmin";
import { useEffect } from "react";
import CommonBreadCrumbs from "../../../../components/breadcrumbs/CommonBreadCrumbs";
import Aos from "aos";

const CreateSupportTopic = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { categoryData } = GetAdminCategory();

  const initialState = {
    data: {
      name: "",
      support_box_category_id: "",
    },
    required: {
      name: true,
      support_box_category_id: true,
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
      case "API_DATA":
        return {
          ...state,
          data: {
            ...action.payload,
            user_id: action?.payload?.id,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "API_DATA", payload: categoryData?.[0] });
  }, [categoryData]);

  const handleSubmitMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = { ...state.data };

    try {
      const data = await http.post(`/admin/supportproblem-topic`, getData);
       if (data.data.data !== "success") {
        tost(data?.data?.data?.name[0]);
      } else if (data.data.data === "success") {
        navigate("/admin/support-problem-topic");
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
        <title>Add New Problem Topic-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Add Problem Topic"
          link={{
            name: "All Problem Topic",
            path: "/admin/support-problem-topic",
          }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitMember}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add New Problem Topic
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"name"}
                    label={"Problem Topic Name"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Problem Topic"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                  />
                </div>
              </div>
              <div className="col-12 position-relative">
                <label for="parent-category">
                  <span>Select</span>
                  <span className="position-absolute error start-0 mt-3"></span>
                </label>
                <div>
                  <select
                    id="parent-category"
                    name="support_box_category_id"
                    className="custom-select"
                    onChange={(e) => {
                      dispatch({
                        type: "INPUT",
                        payload: {
                          name: e.target.name,
                          value: e.target.value,
                        },
                      });
                    }}
                  >
                    <option selected disabled>
                      Select
                    </option>
                    {categoryData?.map((data) => (
                      <option key={data?.id} value={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/admin/support-problem-topic"}
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

export default CreateSupportTopic;
