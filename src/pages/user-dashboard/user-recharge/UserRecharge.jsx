import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { http } from "../../../components/action/axiosInstance";
import tost from "../../../components/action/tost";
import { useReducer } from "react";
import { useEffect } from "react";
import Aos from "aos";
import { useState } from "react";
import InputMain from "../../../components/formComponent/InputMain";
import { ClockLoader } from "react-spinners";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { initialState, reducer } from "./action";
import style from "./style.module.css";
import amrPay from "../../../assets/img/amar-pay-icon.svg";

const UserRecharge = () => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmitFAQ = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = { ...state.data };
    try {
      const data = await http.post(`/recharge`, getData);
      if (data?.data?.success === false) {
        tost(data?.data?.data?.amount[0] || data?.data?.data?.amount[1]);
        if (data?.data?.message === "Validation errors") {
          const errors = data?.data?.data;
          console.log(errors);
          const validationError = {
            amount: errors["amount"] ? errors["amount"] : null,
          };
          dispatch({
            type: "VALIDATION_ERROR",
            payload: validationError,
          });
          setLoading(false);
          return;
        }
      } else if (data?.data?.result === "true") {
        window.location.href = data?.data?.payment_url;
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
        <title>User Recharge-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs heading="User Recharge" />
        <form
          data-aos="fade"
          onSubmit={handleSubmitFAQ}
          style={{ maxWidth: "600px", margin: "20px auto" }}
          className="ec-cat-form shadow p-4"
        >
          <div className="modal-header px-4">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Recharge
            </h5>
          </div>
          <div className="modal-body px-4">
            <div className="row mb-2">
              <div className="col-lg-12">
                <div className="form-group mb-4 position-relative">
                  <InputMain
                    type="text"
                    name={"amount"}
                    label={"Amount"}
                    require={true}
                    dispatch={dispatch}
                    placeholder={"Amount"}
                    dispatch_type={"INPUT"}
                    id={"admin-add-affiliates-name"}
                    error={state.apiRes.amount ? state.apiRes.amount : null}
                  />
                </div>
              </div>
              <div className={style.chooseWallerBox}>
                <h1 className={style.chooseWalletHeading}>Payment Method</h1>
                <div className={style.payOptions}>
                  <div
                    onClick={() =>
                      dispatch({
                        payload: "aamarpay",
                        type: "SELECT_PAYMENT_METHOD",
                      })
                    }
                    className={`${style.checkField} ${
                      state?.data?.getwaya === "aamarpay" && style.active
                    }`}
                  >
                    <span className={style.checkBorder}>
                      <span
                        className={`${style.dot} ${
                          state?.data?.getwaya === "aamarpay" && style.active
                        }`}
                      ></span>
                    </span>
                    <img alt="amr-pay" src={amrPay} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer px-4">
            <Link to={"/user/history"} className="btn btn-secondary btn-pill">
              Cancel
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary btn-pill d-flex align-items-center"
            >
              <span style={{ marginRight: "2px" }}>Recharge</span>{" "}
              {loading && <ClockLoader color="#fff" size={15} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRecharge;
