import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

import {useQuery} from "../../module";
import Courses from "./Courses/Courses";
import "./index.scss";
import PreAccept from "./PreAccept/PreAccept";


function EcontractList({ userType, match }) {
  // EXTRACT PROPS
  const rootUrl =
    userType === "student"
      ? "/dashboard/e-contract"
      : "/dashboard-tutor/e-contract";

  // INIT LOCAL STATES
  const query = useQuery();
  const eContractType = query.get("type");
  const {t} = useTranslation(["econtract-page", "common"]);

  return (
    <div className="econtract-list card-style border-radius-2">
      <h4 className="mb-12px font-weight-bold text-dark">E-contract</h4>

      <Nav className="econtract-list__nav border-radius-2 box-shadow p-0 mb-4">
        <NavItem className="w-50 center-box cursor-pointer">
          <NavLink
          style={{width:"100%"}}
            className={`text-decoration-none  center-box  tab hv-boder ${
              eContractType === "pre-accept" ? "active-tab" : ""
            }`}
            to={`${rootUrl}/?type=pre-accept`}
          >
            {t("header-1")}
          </NavLink>
        </NavItem>
        <NavItem className="w-50 center-box cursor-pointer">
          <NavLink
           style={{width:"100%"}}
            to={`${rootUrl}/?type=courses`}
            className={`text-decoration-none  center-box tab hv-boder ${
              eContractType === "courses" && "active-tab"
            }`}
          >
            {t("header-2")}
          </NavLink>
        </NavItem>
      </Nav>

      <div className="econtract-list__content">
        {eContractType === "pre-accept" ? (
          <PreAccept userType={userType} match={match} />
        ) : (
          <Courses userType={userType} match={match} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(EcontractList);
