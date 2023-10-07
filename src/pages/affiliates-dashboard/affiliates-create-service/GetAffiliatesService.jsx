import Aos from "aos";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetVendorServiceData } from "../../../api/admin/vendorApi";
import AllServiceTable from "./own-components/AllServiceTable";

function GetAffiliatesService() {
  const [page, setPage] = useState(null);

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  const { serviceData, isLoading, refetch } = GetVendorServiceData(page);

 
  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Affiliates Service-SOS</title>
      </Helmet>
      <div data-aos="fade" className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>All Services</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              Service
            </p>
          </div>
          <div>
            <Link
              to={"/affiliates-dashboard/create-service"}
              className="btn btn-primary"
            >
              Create Service
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <AllServiceTable
                  refetch={refetch}
                  serviceData={serviceData}
                  isLoading={isLoading}
                  setPage={setPage}
                  page={page}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAffiliatesService;
