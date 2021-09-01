import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import RatingBox from "../../utils/RatingBox";
import EditProfileModal from "../../utils/Profile/EditProfileModal";
import AvatarBox from "./AvatarBox";
import Avatar from "../../utils/Avatar";

const InfoCard = ({ user, editUserRequest }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation("profile");
  const { avatar, name, rating, phone_number, city, email, describe } = user;

  return (
    <div className="card-style border-radius-2 p-3 mb-3">
      <div className="flex-box mb-12px w-100">
        <h4 className="mb-0 font-weight-bold flex-grow">{t("title")}</h4>
        <button
          className="center-box rounded-circle border-0"
          type="submit"
          style={{ width: "36px", height: "36px", background: "#FFEAE2" }}
          onClick={() => setModal(!modal)}
        >
          <FontAwesomeIcon
            className="text-hightlight"
            icon={["fal", "pencil"]}
          />
        </button>
      </div>
      <div className="flex-box align-items-start">
        <div className="position-relative">
          <div className="mr-3">
            <Avatar avatar={avatar} width={96} name={name} />
          </div>
          <AvatarBox />
        </div>
        <div>
          <div className="flex-box mb-12px">
            <h5 className="mb-0 mr-2">{name ? name : t("not_setting_yet")}</h5>
            <div
              className="center-box rounded-circle bg-hightlight-1 mr-4"
              style={{ width: "24px", height: "24px", background: "#FFEAE2" }}
            >
              <FontAwesomeIcon
                className="text-light text-small"
                icon={["fas", "graduation-cap"]}
              />
            </div>
            <RatingBox rate={rating} />
          </div>
          <div className="flex-box flex-wrap">
            <div className="text-grey flex-box mb-12px mr-3">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "birthday-cake"]}
              />
              {user.dob}
            </div>
            <div className="text-grey flex-box mb-12px mr-3">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "phone-alt"]}
              />
              <span>{phone_number ? phone_number : t("not_setting_yet")}</span>
            </div>
            <div className="text-grey flex-box mb-12px mr-3">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "map-marker-alt"]}
              />
              <span>{city ? city : t("not_setting_yet")}</span>
            </div>
            <div className="text-grey flex-box mb-12px">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "envelope"]}
              />
              <span>{email ? email : t("not_setting_yet")}</span>
            </div>
          </div>
          <p className="mb-0 mr-2 p-0 d-inline border-0 text-grey h-auto w-100">
            {describe}
          </p>
        </div>
      </div>
      <Modal
        isOpen={modal}
        className="edit-profile-modal h-75"
        contentClassName="card-style p-0"
      >
        <EditProfileModal
          editUserRequest={editUserRequest}
          modal={modal}
          setModal={setModal}
          user={user}
        />
      </Modal>
    </div>
  );
};

InfoCard.propTypes = {
  user: PropTypes.object,
  editUserRequest: PropTypes.func,
};

export default InfoCard;
