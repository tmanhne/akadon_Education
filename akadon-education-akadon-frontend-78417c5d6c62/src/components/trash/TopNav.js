import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
} from "reactstrap";
import Notify from "../../Notify/Notify";

const TopNav = ({match}) => {
  return (
    <div className="dashboard-page__top-navbar mb-3">
      <div className="info-box flex-box">
        <p className="date text-truncate">
          <span className="text-hightlight1 font-weight-bold">Thứ Sáu</span>, ngày 28 tháng 08
          năm 2020
        </p>
        <Link to={`${match.path}/messages/:roomId`} className="icon icon-active center-box box-shadow rounded-circle border-0">
          <FontAwesomeIcon icon={["fas", "comment-lines"]} />
          <span className="number center-box text-light">1</span>
        </Link>
        <Notify />
        <div className="avatar-box">
          <img
            className="mr-1 image-avatar"
            src="http://via.placeholder.com/64x64"
            width={64}
            height={64}
            alt="avatar"
          />
          <span className="text-truncate">
            Dong ThachDong ThachDong ThachDong ThachDong ThachDong Thach
          </span>
          <UncontrolledButtonDropdown>
            <DropdownToggle className="border-0 p-0 center-box mb-0">
              <FontAwesomeIcon
                className="text-dark h4"
                icon={["fal", "angle-down"]}
              />
            </DropdownToggle>
          </UncontrolledButtonDropdown>
        </div>
      </div>
      {/* Action box */}
      <div className="flex-box action-box">
        <InputGroup className="search-box box-shadow text-small1 mr-2 border-radius-3">
          <Input className="border-radius-3" placeholder="Bạn muốn được hỗ trợ trong môn học nào?" />
          <InputGroupAddon className="center-box border-radius-3" addonType="append">
            <FontAwesomeIcon icon={["fal", "search"]} />
          </InputGroupAddon>
        </InputGroup>
        <Button className="filter-box box-shadow border-radius-3">
          <FontAwesomeIcon icon={["fal", "sliders-v"]} />
          <span className="text-truncate ml-2">Bộ lọc</span>
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
