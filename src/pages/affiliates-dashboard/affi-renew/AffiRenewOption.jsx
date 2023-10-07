import { useState } from "react";
import style from "./AffiRenew.module.css";
import Radio from "./Radio";
import PricingCard from "./PricingCard";
import EditLoader from "../../../components/loader/EditLoader";

function AffiRenewOption({ subscriptions, subscriptionLoading }) {
  const [time, setTime] = useState("monthly");
  return (
    <section className={style.pricingMain}>
      <div className="layout">
        <div className={style.wrap}>
          <div className={style.DateSelectBox}>
            <div className={style.date}>
              <Radio time={time} setTime={setTime} txt={"monthly"} />
              <Radio time={time} setTime={setTime} txt={"half_yearly"} />
              <Radio time={time} setTime={setTime} txt={"yearly"} />
            </div>
          </div>
          {subscriptionLoading ? (
            <EditLoader />
          ) : (
            <div className={style.ppCards}>
              {subscriptions
                ?.filter((e) => e.subscription_user_type === "affiliate")
                ?.filter((e) => e.subscription_package_type === time)
                ?.map((item) => (
                  <PricingCard key={item.id} data={item} time={time} />
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AffiRenewOption;
