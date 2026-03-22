import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/smallcaseLogo.png"
            alt="smallcase"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/streakLogo.png"
            alt="streak"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/sensibullLogo.svg"
            alt="sensibull"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="fundhouse"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/goldenpiLogo.png"
            alt="goldenpi"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-4 p-3 mt-5 d-flex flex-column align-items-center">
          <img
            src="media/images/dittoLogo.png"
            alt="ditto"
            style={{ height: "60px", width: "150px", objectFit: "contain" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform
          </p>
        </div>

        <div className="col-12">
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Signup Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default Universe;