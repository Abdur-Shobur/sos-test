import React from "react";
import InputEdit from "../../../components/formComponent/InputEdit";

const VendorPackageInfo = ({ data }) => {
  return (
    <>
      <div style={{ marginTop: "50px" }} className="modal-header px-4">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          Service Package Information
        </h5>
      </div>
      <div className="modal-body">
        <div className="row mb-2">
          {data?.servicepackages?.map((e) => (
            <div className="col-lg-4">
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.package_title}
                    label="Package Title"
                    name="package_title__1"
                    readOnly={"readOnly"}
                    placeholder="Package_title"
                    require={true}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.price}
                    label="Price"
                    name="price__1"
                    readOnly={"readOnly"}
                    placeholder="Price"
                    require={true}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.time}
                    label="Time (day)"
                    name="time"
                    placeholder="Price"
                    readOnly={"readOnly"}
                    require={true}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mb-3 mt-3 position-relative">
                  <InputEdit
                    defaultValue={e.revision_max_time}
                    label="Revision Max Time"
                    name="revision_max_time (day)"
                    placeholder="Revision Max Time"
                    readOnly={"readOnly"}
                    require={true}
                    type="text"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label htmlFor="">Description</label>
                <div
                  style={{
                    border: "1px solid #ced4da",
                    padding: " 0.59rem 1rem",
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: e?.package_description,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorPackageInfo;
