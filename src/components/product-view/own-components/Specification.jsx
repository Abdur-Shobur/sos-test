import React from "react";

function Specification({ product }) {
  return (
    <div className="row review-rating mt-4">
      <div className="col-12">
        <ul className="nav nav-tabs" id="myRatingTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="product-detail-tab"
              data-bs-toggle="tab"
              data-bs-target="#productdetail"
              href="#productdetail"
              role="tab"
              aria-selected="true"
            >
              <i className="mdi mdi-library-books mr-1"></i> Detail
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              id="product-information-tab"
              data-bs-toggle="tab"
              data-bs-target="#productinformation"
              href="#productinformation"
              role="tab"
              aria-selected="false"
            >
              <i className="mdi mdi-information mr-1"></i>Specification
            </a>
          </li>

          {/* <li className="nav-item">
						<a
							className="nav-link"
							id="product-reviews-tab"
							data-bs-toggle="tab"
							data-bs-target="#productreviews"
							href="#productreviews"
							role="tab"
							aria-selected="false"
						>
							<i className="mdi mdi-star-half mr-1"></i> Reviews
						</a>
					</li> */}
        </ul>
        <div className="tab-content" id="myTabContent2">
          <div
            className="tab-pane pt-3 fade show active"
            id="productdetail"
            role="tabpanel"
          >
            <div
              dangerouslySetInnerHTML={{ __html: product?.long_description }}
            />
          </div>

          <div
            style={{ maxWidth: "800px", margin: "0 auto" }}
            className="tab-pane pt-3 fade"
            id="productinformation"
            role="tabpanel"
          >
            <div className="accordion" id="accordionExample">
              {product?.specifications?.map((e, i) => (
                <div key={e.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapseOne` + e?.id}
                      aria-expanded="true"
                      aria-controls={"collapseOne" + e?.id}
                    >
                      {e?.specification}
                    </button>
                  </h2>
                  <div
                    id={`collapseOne` + e?.id}
                    class={`accordion-collapse collapse `}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{e?.specification_ans}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="tab-pane pt-3 fade"
            id="productreviews"
            role="tabpanel"
          >
            <div className="ec-t-review-wrapper">
              <div className="ec-t-review-item">
                <div className="ec-t-review-avtar">
                  <img src="assets/img/review-image/1.jpg" alt="" />
                </div>
                <div className="ec-t-review-content">
                  <div className="ec-t-review-top">
                    <p className="ec-t-review-name">Jeny Doe</p>
                    <div className="ec-t-rate">
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star"></i>
                    </div>
                  </div>
                  <div className="ec-t-review-bottom">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
              <div className="ec-t-review-item">
                <div className="ec-t-review-avtar">
                  <img src="assets/img/review-image/2.jpg" alt="" />
                </div>
                <div className="ec-t-review-content">
                  <div className="ec-t-review-top">
                    <p className="ec-t-review-name">Linda Morgus</p>
                    <div className="ec-t-rate">
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star is-rated"></i>
                      <i className="mdi mdi-star"></i>
                    </div>
                  </div>
                  <div className="ec-t-review-bottom">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specification;
