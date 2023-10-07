import { useReducer, useState } from "react";
import style from "./style.module.css";
import amrPay from "../../../../assets/img/amar-pay-icon.svg";
import myBalance from "../../../../assets/img/my-balance.svg";
import SummeryRow from "./SummeryRow";
import { initialState, reducer } from "./action";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import { http } from "../../../../components/action/axiosInstance";
import tost from "../../../../components/action/tost";
import EditLoader from "../../../../components/loader/EditLoader";

const AffiCheckout = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState({});
  const OldId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(`/buy/subscription/${OldId?.id}`);
      setSingleData(res?.data?.message);
      dispatch({ type: "API_DATA", payload: res?.data?.message });
      setLoadingData(false);
    };
    getDataEditData();
  }, [OldId?.id]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const submitRenew = async () => {
    setLoading(true);

    try {
      const data = await http.post(`/renew-subscription`, state);
      if (data?.data?.result === "true") {
        window.location.href = data?.data?.payment_url;
      } else if (data?.data?.data === "success") {
        tost(data?.data?.message);
        navigate("/vendors-dashboard");
      } else if (data?.data?.success === false) {
        tost(data?.data?.data?.payment_method[0]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    setLoading(false);
  };


  return (
    <div className={`${style.checkoutFinal} ${style.active}`}>
      <h1 className={style.heading}>Final Checkout</h1>
      <p className={style.subHeading}>
        The mobile banking service of Mercantile Bank Ltd is branded as and it
        aims to connect
      </p>
      {loadingData ? (
        <EditLoader />
      ) : (
        <div className={style.orderBox}>
          <h1 className={style.boxHeading}>Order Summary</h1>
          <div className={style.summeryBox}>
            <SummeryRow
              pp={`৳ ${singleData?.subscription_amount}`}
              text={{ h: "Total Budget", p: "BDT Currency" }}
            />

            <SummeryRow
              pp={`৳ ${singleData?.subscription_amount}`}
              text={{ h: `You've to pay`, p: "BDT Conversion Rate %" }}
            />
          </div>
          {/* choose box  */}
          <div className={style.chooseWallerBox}>
            <h1 className={style.chooseWalletHeading}>Choose Your Wallet</h1>
            <div className={style.payOptions}>
              <div
                onClick={() =>
                  dispatch({
                    payload: "aamarpay",
                    type: "SELECT_PAYMENT_METHOD",
                  })
                }
                className={`${style.checkField} ${
                  state.payment_method === "aamarpay" && style.active
                }`}
              >
                <span className={style.checkBorder}>
                  <span
                    className={`${style.dot} ${
                      state.payment_method === "aamarpay" && style.active
                    }`}
                  ></span>
                </span>
                <img src={amrPay} alt="Payment Img" />
              </div>

              <div
                onClick={() =>
                  dispatch({
                    payload: "my-wallet",
                    type: "SELECT_PAYMENT_METHOD",
                  })
                }
                className={`${style.checkField} ${
                  state.payment_method === "my-wallet" && style.active
                }`}
              >
                <span className={style.checkBorder}>
                  <span
                    className={`${style.dot} ${
                      state.payment_method === "my-wallet" && style.active
                    }`}
                  ></span>
                </span>
                <img src={myBalance} alt="Payment Img" />
              </div>
            </div>
          </div>

          <button
            onClick={submitRenew}
            disabled={loading}
            type="button"
            className={style.btn}
          >
            <span style={{ marginRight: "2px" }}>Checkout</span>{" "}
            {loading && <ClockLoader color="#fff" size={15} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default AffiCheckout;
