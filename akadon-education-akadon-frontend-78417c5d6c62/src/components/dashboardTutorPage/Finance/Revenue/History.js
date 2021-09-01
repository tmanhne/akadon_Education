import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FilterDayPicker from "../../../utils/Filter/FilterDayPicker";
import Total from "./Total";
import { useTranslation } from "react-i18next";
import PageComingSoon from "../../../PageComing/PageComingSoon";

function History() {
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const history = useHistory();
  const {t} = useTranslation(["payment"])

  function switchTab(tabKey) {
    setActiveTab(tabKey);
    const searchStr = `status=${tabKey}`;
    history.push({ search: searchStr });
  }
  return (
    <>
      <h5 className="text-bold2 text-hightlight1 mb-12px">
        {t("payment:recent-exchange")}
      </h5>

      <UncontrolledDropdown className="revenue__history-filter mb-2">
        <DropdownToggle className="filter-date text-dark flex-box align-items-cener border-radius-2">
          <div className="calendar-icon text-hightlight1 rounded-circle p-1 center-box mr-12px">
            <FontAwesomeIcon icon={["fal", "calendar-alt"]} />
          </div>
          <span className="flex-grow text-left">{t("payment:select-day")}</span>
          <FontAwesomeIcon icon={["fal", "angle-down"]} />
        </DropdownToggle>
        <DropdownMenu className="border-0 p-0 bg-transparent">
          <DropdownItem
            className="p-0 box-shadown border-radius-3"
            toggle={false}
          >
            <FilterDayPicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <div className="revenue__history-nav">
        <Nav tabs className="flex-box border border-radius-2 mb-12px">
          <NavItem className={activeTab === "all" ? "nav-item-active" : ""}>
            <NavLink
              className="color-btn-hover border-0 text-grey text-center h-100 text-bold2 cursor-pointer p-0"
              onClick={() => switchTab("all")}
            >
              {t("payment:nav-item-1")}
            </NavLink>
          </NavItem>
          <NavItem className={activeTab === "revenue" ? "nav-item-active" : ""}>
            <NavLink
              className="color-btn-hover border-0 text-grey text-center h-100 text-bold2 cursor-pointer p-0"
              onClick={() => switchTab("revenue")}
            >
              {t("payment:nav-item-2")}
            </NavLink>
          </NavItem>
          <NavItem
            className={activeTab === "cash-back" ? "nav-item-active" : ""}
          >
            <NavLink
              className="color-btn-hover border-0 text-grey text-center h-100 text-bold2 cursor-pointer p-0"
              onClick={() => switchTab("cash-back")}
            >
              {t("payment:nav-item-3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="all">
            <Total dateRange={dateRange} setDateRange={setDateRange} />
          </TabPane>
          <TabPane tabId="revenue"><PageComingSoon/></TabPane>
          <TabPane tabId="cash-back"><PageComingSoon/></TabPane>
        </TabContent>
      </div>
    </>
  );
}

History.propTypes = {};

export default History;
