import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import RatingBox from "../../utils/RatingBox";
import EditProfileModal from "../../utils/Profile/EditProfileModal";
import AvatarBox from "../../dashboardPage/Profile/AvatarBox";
import Avatar from "../../utils/Avatar";

const InfoCard = ({ user, editUserRequest }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation(["profile"]);

  const { specialize } = user;

  return (
    <div className="profile__info-card card-style flex-grow border-radius-2 p-3 mr-3">
      <div className="flex-box mb-12px w-100">
        <h4 className="mb-0 font-weight-bold mr-4">{t("title")}</h4>
        <div className="flex-box flex-grow text-grey text-bold2">
          <FontAwesomeIcon
            icon={["fas", "exclamation-circle"]}
            className="mr-2"
          />
          <span>
            {user.confirm_legal * 1 === 1 ? t("verify") : t("not-verify")}
          </span>
        </div>
        <button
          className="center-box rounded-circle border-0"
          onClick={() => setModal(!modal)}
          style={{ width: "36px", height: "36px", background: "#FFEAE2" }}
        >
          <FontAwesomeIcon
            className="text-hightlight"
            icon={["fal", "pencil"]}
          />
        </button>
      </div>

      <div className="flex-box align-items-start">
        <div className="position-relative">
          <div className="mr-1">
            <Avatar avatar={user.avatar} width={96} name={user.name} />
          </div>
          <AvatarBox editUserRequest={editUserRequest} user={user} />
        </div>

        <div className="flex-grow ml-3">
          <div className="flex-box mb-12px">
            <h5 className="mb-0 mr-2">{user.name}</h5>
            <div
              className="center-box rounded-circle bg-hightlight mr-3"
              style={{ width: "24px", height: "24px", background: "#FFEAE2" }}
            >
              <FontAwesomeIcon
                className="text-light text-small"
                icon={["fas", "chalkboard-teacher"]}
              />
            </div>
            <RatingBox rate={user.rate} />
          </div>

          <div className="flex-box flex-column align-items-start">
            <div
              style={{ minWidth: "7rem" }}
              className="text-grey flex-box mb-12px"
            >
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "birthday-cake"]}
              />
              <span>{user.dob}</span>
            </div>

            <div
              style={{ minWidth: "10rem" }}
              className="text-grey flex-box mb-12px"
            >
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "phone-alt"]}
              />
              <span>{user.phone_number}</span>
            </div>

            <div
              style={{ minWidth: "10rem" }}
              className="text-grey flex-box mb-12px"
            >
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "map-marker-alt"]}
              />
              <span>{user.city}</span>
            </div>

            <div
              style={{ minWidth: "10rem" }}
              className="text-grey flex-box mb-12px"
            >
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "envelope"]}
              />
              <span>{user.email}</span>
            </div>

            <div className="text-grey flex-box mb-12px">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "venus-mars"]}
              />
              <span>{user.gender === 1 ? t("male") : t("female")}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modal}
        className="edit-profile-modal h-75"
        contentClassName="card-style p-0"
      >
        <EditProfileModal
          user={user}
          editUserRequest={editUserRequest}
          modal={modal}
          setModal={setModal}
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
