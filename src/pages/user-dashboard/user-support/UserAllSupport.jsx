import React, { useState } from "react";

import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
// import { useDebounce } from '../../../components/action/useDebounce';
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { GetAllSupport } from "../../../api/admin/vendorApi";
import SupportViewTable from "../../../components/support-create/SupportViewTable";

function UserAllSupport() {
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState(" ");
  // const { searchHandler } = useDebounce(setSearch, setPage);
  const { supportData, refetch, isLoading } = GetAllSupport(page, search);

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
          heading="All Support"
          home="/user-dashboard"
          link={{
            name: "Create Support",
            path: "/user/create-ticket",
          }}
        />
        <div data-aos="fade" className="row">
          <SupportViewTable
            view="/user/support/"
            page={page}
            delApi="/supportbox/"
            refetch={refetch}
            setPage={setPage}
            isLoading={isLoading}
            supportData={supportData}
          />
        </div>
      </div>
    </div>
  );
}

export default UserAllSupport;
