import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../assets/icons/user-standard-icon-1.svg";
import Logo from "../../assets/images/akadon-logo-mobile.png";
import Notify from "../Notify/Notify";
import ChatDropdown from "./ChatDropdown";
import ProfileDropdownContainer from "./containers/ProfileDropdownContainer";
import MobileMenu from "./MobileMenu";

function MobileTopNav({ userType }) {
  const [menu, setMenu] = useState(false);

  return (
    <div className="top-navbar flex-box justify-content-between px-3">
      <div className="flex-box">
        <FontAwesomeIcon
          onClick={() => setMenu(true)}
          icon={["fas", "bars"]}
          className="mr-3 h5 mb-0"
        />
        <Link to="/" target="_blank">
          <img src={Logo} alt="akadon" width={63} height={57} />
        </Link>
      </div>
      <div className="info-box flex-box justify-content-end">
        {userType === "tutor" && (
          <>
            <img
              className="mr-2 box-shadow rounded-circle"
              src={Img}
              alt="user type"
              width={30}
            />
            <Link
              className="econtract-link center-box text-light rounded-circle bg-hightlight font-weight-bold text-light mr-2"
              to="/dashboard-tutor/e-contract?type=pre-accept"
              alt="econtract"
            >
              E
            </Link>
          </>
        )}

        <ChatDropdown userType={userType} />
        <Notify />
        <ProfileDropdownContainer />
      </div>
      {menu && <MobileMenu userType={userType} setMenu={setMenu} />}
    </div>
  );
}

MobileTopNav.propTypes = {
  userType: PropTypes.string,
};

export default MobileTopNav;
