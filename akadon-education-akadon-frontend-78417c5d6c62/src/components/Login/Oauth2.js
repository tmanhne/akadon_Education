import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

function Oauth2({ title, state, redirectUrl, responseFacebook }) {
  const zaloUrl = `https://oauth.zaloapp.com/v3/auth?app_id=${process.env.REACT_APP_ZALO_APP_ID}&redirect_uri=${redirectUrl}&state=${state}`;
  return (
    <div className="oauth2 mb-4">
      <div className="center-box mb-12px">
        <span className="title px-2 position-relative">{title}</span>
      </div>
      <div className="center-box">
        <a
          href={zaloUrl}
          className="main-btn-new font-weight-bold h5 mb-0 py-0 w-50 mr-4"
        >
          Zalo
          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            className="btn-arrow"
          />
        </a>
        <div className="w-50">
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            fields="name,email,picture"
            textButton={
              <>
                Facebook
                <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="btn-arrow facebook-class"
                />
              </>
            }
            callback={responseFacebook}
            cssClass="main-btn-new font-weight-bold h5 mb-0 py-0 w-100 mr-4"
          />
        </div>
      </div>
    </div>
  );
}

Oauth2.propTypes = {
  title: PropTypes.string,
  state: PropTypes.number,
  redirectUrl: PropTypes.string,
};

export default Oauth2;
