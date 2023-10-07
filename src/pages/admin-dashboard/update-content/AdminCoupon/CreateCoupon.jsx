import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMain from "../../../../components/formComponent/InputMain";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClockLoader } from "react-spinners";
import { http } from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import { GetAdminCouponUser } from "../../../../api/admin/apiAdmin";
import { useEffect } from "react";
import CommonBreadCrumbs from "../../../../components/breadcrumbs/CommonBreadCrumbs";
import Aos from "aos";
import { initialState, reducer } from "./action";
import DatePicker from "react-date-picker";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { couponUserData } = GetAdminCouponUser();

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  // 	dispatch({ type: 'API_DATA', payload: couponUserData?.[0] });
  // }, [couponUserData]);

  // submit data
  const handleSubmitCompanions = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await http.post(`/admin/coupons`, state?.data);
      if (data.data?.data !== "success") {
        tost(data?.data?.message);
        dispatch({
          type: "RES_VALIDATION",
          payload: data?.data?.data,
        });
      } else if (data.data?.data === "success") {
        navigate("/admin/all-coupon");
        tost(data?.data?.message);
      }

      e.target.reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
     }
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div>
      {" "}
      <Helmet>
        <title>Create New Coupon-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Create Coupon"
          link={{ name: "All Coupon", path: "/admin/all-coupon" }}
        />
        <form
          data-aos="fade"
          onSubmit={handleSubmitCompanions}
          style={{ maxWidth: "800px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Create New Coupon
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"name"}
                    label={"Name"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Coupon Name"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                    error={state.apiRes.name ? "Required" : null}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"amount"}
                    label={"Amount"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Coupon Amount"}
                    dispatch_type={"INPUT_NUMBER"}
                    id={"admin-add-affiliates-name"}
                    error={state?.apiRes?.amount ? state?.apiRes?.amount : null}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"commission"}
                    label={"Commission"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Coupon Commission"}
                    dispatch_type={"INPUT_NUMBER"}
                    id={"admin-add-affiliates-name"}
                    error={
                      state?.apiRes?.commission
                        ? state?.apiRes?.commission
                        : null
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group d-flex flex-column date_pick_to_form">
                  <label className="w-100" htmlFor="start_date">
                    Expire Date
                    {state.required.expire_date && (
                      <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
                        {state.required.expire_date}
                      </span>
                    )}
                  </label>
                  <DatePicker
                    value={state.data.expire_date_view}
                    className="form-control"
                    id="expire_date_view"
                    dateFormate="Pp"
                    onChange={(e) => {
                      dispatch({
                        type: "DATE_FORMATE",
                        payload: {
                          name: "expire_date",
                          value: e,
                          viewDate: "expire_date_view",
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"limitation"}
                    label={"Limitation"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Coupon Limitation"}
                    dispatch_type={"INPUT_NUMBER"}
                    id={"admin-add-affiliates-name"}
                    error={
                      state?.apiRes?.limitation
                        ? state?.apiRes?.limitation
                        : null
                    }
                  />
                </div>
              </div>
              <div className="col-6 position-relative">
                <label for="parent-category">
                  <span>User</span>
                  <span className="position-absolute error start-0 mt-3"></span>
                </label>
                <div>
                  <select
                    id="parent-category"
                    name="user_id"
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
                    {couponUserData?.map((data) => (
                      <option key={data?.id} value={data?.id}>
                        {data?.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link
              to={"/admin/all-coupon"}
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
              <span style={{ marginRight: "2px" }}>Create Coupon</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoupon;
