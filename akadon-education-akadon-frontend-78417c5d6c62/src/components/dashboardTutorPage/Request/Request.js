import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import "./index.scss";
import ClosingRequests from "./ClosingRequests/ClosingRequests";
import PreAcceptRequests from "./PreAcceptRequests/PreAcceptRequests";
import OpenRequests from "./OpenRequests/OpenRequests";
import { useQuery } from "../../../module";
import { useTranslation } from "react-i18next";

const Request = ({ match }) => {
  // PROPS EXTRACT
  const history = useHistory();
  const query = useQuery();
  const status = query.get("status");
  const { t } = useTranslation(["request-page", "common"]);

  // LOCAL STATE DECLARATIONS
  const [activeTab, setActiveTab] = useState(status);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Card className="card-style tutor-request h-100 mb-3">
      <div className="flex-box justify-content-between mb-3 ml-3">
        <h3 style={{ fontWeight: 800 }}>{t("tutor-title")}</h3>
        <div className="main-btn save-tutor disable-overlay boder-rd-100 cursor-not-allowed">
          {t("save-request")}
        </div>
      </div>
      <Nav className="dashboard-navbar mb-2">
        <NavItem>
          <NavLink
            className={`${
              activeTab === "save" ? "active" : " "
            } w-100 hv-boder`}
            onClick={() => {
              history.push({ search: "status=save" });
              toggle("save");
            }}
          >
            {t("tutor-item-1")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${
              activeTab === "pre-accept-bid" ? "active" : ""
            } w-100 hv-boder`}
            onClick={() => {
              history.push({ search: "status=pre-accept-bid" });
              toggle("pre-accept-bid");
            }}
          >
            {t("tutor-item-2")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={`${
              activeTab === "close" ? "active" : ""
            } w-100 hv-boder`}
            onClick={() => {
              history.push({ search: "status=close" });
              toggle("close");
            }}
          >
            {t("tutor-item-3")}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent
        activeTab={activeTab}
        style={{ overflowX: "auto", minHeight: "70vh" }}
      >
        <TabPane tabId="save" style={{ background: "white" }}>
          <OpenRequests match={match} />
        </TabPane>
        <TabPane tabId="pre-accept-bid" style={{ background: "white" }}>
          <PreAcceptRequests match={match} />
        </TabPane>
        <TabPane tabId="close" style={{ background: "white" }}>
          <ClosingRequests match={match} />
        </TabPane>
      </TabContent>
    </Card>
  );
};

export default Request;
