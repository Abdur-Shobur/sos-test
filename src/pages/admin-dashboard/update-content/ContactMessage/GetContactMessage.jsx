import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Aos from "aos";
import { GetAdminContactData } from "../../../../api/admin/apiAdmin";
import { Link } from "react-router-dom";
import TableBodyLoading from "../../../../components/loader/TableBodyLoading";
import { NoDataFound } from "../../../../components/table/TableComponents";

function GetContactMessage() {
  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);
  const { contactData, isLoading: contactPageLoading } = GetAdminContactData();

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Admin Contact Message-SOS</title>
      </Helmet>
      <div className="content">
        <div className="breadcrumb-wrapper breadcrumb-contacts">
          <div>
            <h1>Contact Message</h1>
            <p className="breadcrumbs">
              <span>
                <Link to={"/"}>Home</Link>
              </span>
              <span>
                <i className="mdi mdi-chevron-right"></i>
              </span>
              User Contact Info
            </p>
          </div>
        </div>
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="responsive-data-table"
                    className="table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    {contactPageLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {contactData?.length > 0 ? (
                          contactData?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>
                                {data?.first_name} {data?.last_name}
                              </td>
                              <td>{data?.email}</td>
                              <td>{data?.number}</td>
                              <td>
                                {data?.message?.length > 100 ? (
                                  <>{data?.message.slice(0, 100) + "..."}</>
                                ) : (
                                  data?.message
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetContactMessage;
