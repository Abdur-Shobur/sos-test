import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import TRow from "./own-components/TRow";
import THead from "./own-components/THead";
import Breadcrumb from "./own-components/Breadcrumb";
import Loading from "./own-components/Loading";
import Pagination from "../../../components/breadcrumbs/Pagination";
import { useDebounce } from "../../../components/action/useDebounce";
import { NoDataFound } from "../../../components/table/TableComponents";
import { GetActiveUsers } from "../../../api/user";

function ActiveUsers() {
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState(" ");
  const { searchHandler } = useDebounce(setSearch, setPage);

  // get vendor
  const { isLoading, refetch, users } = GetActiveUsers(page, search);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Active Users-SOS</title>
      </Helmet>
      <div className="content">
        <Breadcrumb searchHandler={searchHandler} text="Active" />
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="ec-vendor-list card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="responsive-data-table" className="table">
                    <THead />
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {users?.data?.length > 0 ? (
                          users?.data?.map((e, i) => (
                            <TRow
                              i={i}
                              key={i}
                              data={e}
                              page={page}
                              refetch={refetch}
                            />
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </tbody>
                    )}
                  </table>
                  <Pagination
                    page={page}
                    setPage={setPage}
                    isLoading={isLoading}
                    getPaginationData={users}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveUsers;
