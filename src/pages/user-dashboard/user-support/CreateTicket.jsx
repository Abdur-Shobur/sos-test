import React from "react";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { http } from "../../../components/action/axiosInstance";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { useEffect } from "react";
import Aos from "aos";
import CreateSupportBox from "../../../components/support-create/CreateSupport";
import {
  reducer,
  initialState,
} from "../../../components/support-create/create-support-action";
import { HandleSubmitData } from "../../../components/support-create/handleSubAction";
import { GetUserAllTicketCategory } from "../../../api/user";

const CreateTicket = () => {
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [problemData, setProblemData] = useState({});
  const { allTicketCategoryData, isLoading: supportLoading } =
    GetUserAllTicketCategory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataEditData = async () => {
      setLoadingData(true);
      const res = await http.get(
        `/ticket-category-to-problem/${state?.data?.support_box_category_id}`
      );
      setProblemData(res?.data?.message);
      setLoadingData(false);
    };
    getDataEditData();
  }, [state.data.support_box_category_id]);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    HandleSubmitData(
      e,
      setLoading,
      state,
      dispatch,
      navigate,
      "/user/all-support"
    );
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>All Support -SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          // searchHandler={searchHandler}
          heading="Create Support"
          home="/vendors-dashboard"
          link={{
            name: "All Support",
            path: "/user/all-support",
          }}
        />
        <div data-aos="fade" className="row">
          <CreateSupportBox
            state={state}
            loading={loading}
            dispatch={dispatch}
            loadingData={loadingData}
            problemData={problemData}
            supportLoading={supportLoading}
            handleSubmitData={handleSubmitData}
            allTicketCategoryData={allTicketCategoryData}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
