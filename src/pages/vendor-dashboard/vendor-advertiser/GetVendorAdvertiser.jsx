import React, { useState } from "react";
import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import TRow from "./TRow";
import { GetVendorAdvertiserData } from "../../../api/admin/vendorApi";
import Loading from "../../admin-dashboard/affiliates/own-components/Loading";
import { NoDataFound } from "../../../components/table/TableComponents";
import Pagination from "../../../components/breadcrumbs/Pagination";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import CommonTableHead from "../../../components/table/CommonTableHead";

function GetVendorAdvertiser() {
  const [page, setPage] = useState(null);
  const { advertiserData, isLoading, refetch } = GetVendorAdvertiserData(page);

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
        <CommonBreadCrumbs heading="Vendor Advertiser" />
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
                        "Reason",
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

export default GetVendorAdvertiser;
