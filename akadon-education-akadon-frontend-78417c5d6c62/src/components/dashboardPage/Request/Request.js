import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
} from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { useQuery } from "../../../module";
import OpeningRequest from "./OpeningRequests/OpeningRequest";
import PreAcceptRequest from "./PreAcceptRequests/PreAcceptRequest";
import ClosingRequest from "./ClosingRequests/ClosingRequest";

const Request = ({ match }) => {
  const query = useQuery();
  const status = query.get("status");
  const [activeTab, setActiveTab] = useState(status);

  const { t } = useTranslation(["request-page", "common"]);
  const history = useHistory();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // LONG THÊM mb-2, ml-3  CHO TIÊU ĐỀ VÀ THANH DƯỚI TIÊU ĐỀ

  return (
    <div className="course-request card-style flex-box flex-column align-items-stretch h-100 mb-3 px-0">
      {/* COMPONENT'S HEADER */}
      <div className="flex-box justify-content-between mb-2 pl-12px pr-12px">
        <h4 className="font-weight-bold flex-grow ml-3">{t("title")}</h4>
        <Link
          to={`${match.path}/request-form`}
          className="gradiant-btn main-btn text-nowrap text-decoration-none px-4 py-2 font-weight-bold"
        >
          {t("request-page:student-btn")}
        </Link>
      </div>
      <Nav
        className="dashboard-navbar mx-auto mb-2"
        style={{ width: "calc(100% - 1.5rem)" }}
      >
        <NavItem>
          <NavLink
            className={`${
              activeTab === "open-request" ? "active" : " "
            } hv-boder`}
            onClick={() => {
              toggle("open-request");
              history.push({ search: "?status=open-request" });
            }}
          >
            <span id="openRequest">{t("nav-item-1")}</span>
            <UncontrolledTooltip
              innerClassName="border-radius-2 bg-hightlight-1 text-justify p-3"
              popperClassName="navbar-tooltip"
              placement="right"
              target="openRequest"
            >
              Danh sách các yêu cầu tìm gia sư bạn đã đăng
            </UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${
              activeTab === "pre-accept-bid" ? "active" : " "
            }  hv-boder`}
            onClick={() => {
              toggle("pre-accept-bid");
              history.push({ search: "?status=pre-accept-bid" });
            }}
          >
            <span id="preAccept">{t("nav-item-2")}</span>
            <UncontrolledTooltip
              innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
              popperClassName="navbar-tooltip"
              placement="right"
              target="preAccept"
            >
              Danh sách các các yêu cầu học thử
            </UncontrolledTooltip>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${
              activeTab === "close-request" ? "active" : " "
            } hv-boder`}
            onClick={() => {
              toggle("close-request");
              history.push({ search: "?status=close-request" });
            }}
          >
            <span id="closeRequest">{t("nav-item-3")}</span>
            <UncontrolledTooltip
              innerClassName="border-radius-2 bg-hightlight-1 text-left text-justify p-3"
              popperClassName="navbar-tooltip"
              placement="left"
              target="closeRequest"
            >
              Danh sách các yêu cầu khi bạn đã ngừng tìm gia sư
            </UncontrolledTooltip>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane
          tabId="open-request"
          style={{ overflowX: "auto", minHeight: "400px", background: "white" }}
        >
          <OpeningRequest match={match} />
        </TabPane>
        <TabPane
          style={{ overflowX: "auto", minHeight: "400px", background: "white" }}
          tabId="pre-accept-bid"
        >
          <PreAcceptRequest match={match} />
        </TabPane>
        <TabPane
          style={{ overflowX: "auto", minHeight: "400px", background: "white" }}
          tabId="close-request"
          className="p-0"
        >
          <ClosingRequest />
        </TabPane>
      </TabContent>
    </div>
  );
};

Request.propTypes = {
  studentRequests: PropTypes.object,
  getRequestsRequest: PropTypes.func,
  preAcceptBids: PropTypes.object,
  match: PropTypes.object,
};

export default Request;
