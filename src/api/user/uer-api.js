import { useQuery } from "react-query";
import { http } from "../../components/action/axiosInstance";

export const UserProfileAPI = () => {
  const { data, isLoading, refetch } = useQuery(
    "/user/profile__user-profile-data",
    () => {
      return http.get(`/user/profile`);
    },
    {
      staleTime: 500,
    }
  );

  const user = data?.data?.user;
  const res = data?.data;
  return { user, isLoading, refetch, res };
};
export const TestAPI = () => {
  const { data, isLoading, refetch } = useQuery(
    "/user/TestAPI-profile-data",
    () => {
      return http.get(`/user/profile`);
    },
    {
      staleTime: 500,
    }
  );

  const user = data?.data?.user;
  const res = data?.data;
  return { user, isLoading, refetch, res };
};

// get category
export const GetUserAllTicketCategory = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_all_user_ticketcategory_data",
    () => {
      return http.get("/all-ticket-category");
    }
  );
  const allTicketCategoryData = data?.data?.message;
  return { allTicketCategoryData, isLoading, refetch };
};

//   get history api
export const GetHistoryData = (page) => {
  const { data, isLoading, refetch } = useQuery(
    ["fetch_all_transition_history_data", page],
    () => {
      return http.get(`/transition-history?page=${page}`);
    }
  );
  const historyData = data?.data;
  return { historyData, isLoading, refetch };
};

// 1 get all users
export const UsersAll = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_users_all_list", page, search],
    () => {
      return http.get(`/user/view?page=${page}&email=${search}`);
    }
  );

  const users = data?.data?.user;
  return { users, refetch, isLoading };
};

// 3 get  active user by id
export const GetActiveUsers = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_active_user_list", page, search],
    () => {
      return http.get(`/user/view/active?page=${page}&email=${search}`);
    }
  );

  const users = data?.data?.user;
  return { users, isLoading, refetch };
};

// 4 get   pending users
export const GetPendingUsers = (page, search) => {
  const { data, refetch, isLoading } = useQuery(
    ["get_pending_user_list", page, search],
    () => {
      return http.get(`/user/view/pending?page=${page}&email=${search}`);
    }
  );
  const users = data?.data?.user;
  return { users, isLoading, refetch };
};

// 4 get all user By ID
export const GetAllUserById = (id) => {
  const { data, isLoading } = useQuery(
    ["fetch_user-profile-view_data", id],
    () => {
      return http.get(`/edit-user/${id}`);
    }
  );

  const userData = data?.data?.user;
  return { userData, isLoading };
};

export const UserProfilesAPI = () => {
  const { data, isLoading, refetch } = useQuery(
    "fetch_user_profile_data",
    () => {
      return http.get(`/user/profile`);
    },
    {
      staleTime: 500,
    }
  );

  const user = data?.data?.user;
  const res = data?.data;
  return { user, isLoading, refetch, res };
};
