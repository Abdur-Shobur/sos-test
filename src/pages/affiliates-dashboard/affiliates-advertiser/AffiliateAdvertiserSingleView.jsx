import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import { useParams } from "react-router-dom";
import ViewCard from "./ViewCard";
import EditLoader from "../../../components/loader/EditLoader";
import { GetAffiAdvertiseDataSingle } from "../../../api/admin/affiliatesAPI";

function AffiliateAdvertiserSingleView() {
  const { id } = useParams();

  const { advertiserData, isLoading } = GetAffiAdvertiseDataSingle(id);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  let removeKey = [
    "advertise_placement",
    "advertise_location_files",
    "advertise_audience_file",
    "id",
    "deleted_at",
    "created_at",
    "updated_at",
  ];
  var getValues = {};
  for (var key in advertiserData) {
    if (!removeKey.includes(key)) {
      getValues[key] = advertiserData[key];
    }
  }

  // Log the filtered object
  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Advertisers Details-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs
          heading="Advertiser Details"
          link={{
            name: "All Advertiser",
            path: "/vendor/advertiser",
          }}
        />
        <div data-aos="fade" className="row">
          <div className="col-12">
            {isLoading ? (
              <EditLoader />
            ) : (
              <div className="ec-vendor-list card card-default">
                <div className="card-body">
                  <div className="wrap_single_card_view">
                    {Object.entries(getValues)?.map((e, i) => (
                      <ViewCard key={i} data={e} />
                    ))}
                  </div>
                  <div className="mt-4">
                    <ViewCard
                      data={["advertise_audience_file"]}
                      isImg={advertiserData?.advertise_audience_file}
                    />
                  </div>
                  <div className="mt-4">
                    <ViewCard
                      data={["advertise_location_files"]}
                      isImg={advertiserData?.advertise_location_files}
                    />
                  </div>
                  <div className="mt-4">
                    <ViewCard
                      data={["advertise_placement"]}
                      advertise_placement={advertiserData?.advertise_placement}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateAdvertiserSingleView;
