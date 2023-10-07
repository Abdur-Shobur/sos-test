import React, { useState } from "react";
import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDebounce } from "../../../../../components/action/useDebounce";
import { GetAdminAdvertiseData } from "../../../../../api/admin/apiAdmin";
import Loading from "../../../affiliates/own-components/Loading";
import { NoDataFound } from "../../../../../components/table/TableComponents";
import Pagination from "../../../../../components/breadcrumbs/Pagination";
import TRow from "./TRow";
import CommonBreadCrumbs from "../../../../../components/breadcrumbs/CommonBreadCrumbs";
import CommonTableHead from "../../../../../components/table/CommonTableHead";

function Vendors() {
  const [page, setPage] = useState(null);
  const [search, setSearch] = useState(" ");
  	// eslint-disable-next-line no-unused-vars
  const { searchHandler } = useDebounce(setSearch, setPage);
  const { advertiserData, isLoading, refetch } = GetAdminAdvertiseData(
    page,
    search
  );

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Get Advertisers-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Advertiser"
          link={{ name: "Add Advertiser", path: "/admin/advertise-store" }}
        />
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="ec-vendor-list card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="responsive-data-table" className="table">
                    <CommonTableHead
                      th={[
                        "sr",
                        "campaign objective",
                        "campaign name",
                        "conversion location",
                        "performance goal",
                        "platforms",
                        "budget amount",
                        "start date",
                        "end date",
                        "age",
                        "gender",
                        "detail targeting",
                        "country",
                        "city",
                        "device",
                        "platform",
                        "inventory",
                        "format",
                        "destination",
                        "tracking",
                        "url perimeter",
                        "number",
                        "last description",
                        "status",
                        "Resone",
                        "deleted at",
                        "created at",
                        "updated at",
                        "action",
                      ]}
                    />

                    {isLoading ? (
                      <Loading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {advertiserData?.data?.length > 0 ? (
                          advertiserData?.data?.map((e, i) => (
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
                    getPaginationData={advertiserData}
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

export default Vendors;
