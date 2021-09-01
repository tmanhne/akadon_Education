import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";

import UpgradeAccountModal from "../dashboardTutorPage/UpgradeAccount/UpgradeAccountModal";
import Avatar from "../utils/Avatar";

const ProfileDropdown = ({ logoutRequest, user }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const { t } = useTranslation("topnav");
  const { avatar, userType, name, priority } = user;

  return (
    <div className="avatar-box profile-dropdown">
      <Avatar avatar={avatar} width={56} name={name} />
      <span className="ml-1">{name}</span>

      <UncontrolledDropdown direction="left">
        <DropdownToggle className="border-0 p-0 center-box mb-0">
          <FontAwesomeIcon
            className="text-dark h4"
            icon={["fal", "angle-down"]}
          />
        </DropdownToggle>
        <DropdownMenu className="box-shadow border-radius-2 border p-0">
          <DropdownItem className="border-bottom p-0 color-btn-hover">
            <Link
              to={`${
                userType === "student" ? "/dashboard" : "/dashboard-tutor"
              }/profile`}
              className=" text-dark text-decoration-none w-100 text-left d-block px-3 pt-12px pb-12px text-left "
            >
              {t("header-3")}
            </Link>
          </DropdownItem>
          {userType !== "student" && (
            <DropdownItem
              onClick={() => setUpdateModal(!updateModal)}
              className="px-3 pt-12px pb-12px border-bottom color-btn-hover"
            >
              {t("header-7")}
            </DropdownItem>
          )}
          <DropdownItem className="p-0 border-bottom color-btn-hover">
            <Link
              to={`${
                userType === "student" ? "/dashboard" : "/dashboard-tutor"
              }/settings`}
              className="text-dark text-decoration-none w-100 text-left d-block px-3 pt-12px pb-12px text-nowrap"
            >
              {t("header-5")}
            </Link>
          </DropdownItem>
          <DropdownItem
            onClick={logoutRequest}
            className="px-3 pt-12px pb-12px color-btn-hover"
          >
            {t("header-6")}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UpgradeAccountModal
        modal={updateModal}
        setModal={setUpdateModal}
        priority={priority}
      />
    </div>
  );
};

export default ProfileDropdown;
