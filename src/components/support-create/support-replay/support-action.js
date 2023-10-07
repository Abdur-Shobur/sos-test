import { http, multipartConfig } from "../../action/axiosInstance";
import tost from "../../action/tost";

export const HandleSubmitData = async (
  e,
  state,
  dispatch,
  refetch,
  setLoading
) => {
  setLoading(true);
  delete state.url;
  try {
    const data = await http.post(`/ticket-replay`, state, multipartConfig);
    if (data?.data?.data !== "success") {
      tost(data?.data?.message);
    } else if (data?.data?.data === "success") {
      e.target.reset();
      refetch();
    }
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
  setLoading(false);
  dispatch({ type: "CLEAR" });
};

export const HanldeSubmitRating = async (
  e,
  data,
  refetch,
  setLoading,
  userRating,
  rating_comment
) => {
  setLoading(true);

  const rating = userRating;
  const support_box_id = data?.id;
  const userData = { rating, support_box_id, rating_comment };
  console.log(userData);
  try {
    const data = await http.post("/ticket-review", userData);
    if (data?.data?.data !== "success") {
      tost(data?.data?.errors.name[0]);
    } else if (data?.data?.data === "success") {
      tost(data?.data?.message);
      refetch();
    }
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
  setLoading(false);
};
