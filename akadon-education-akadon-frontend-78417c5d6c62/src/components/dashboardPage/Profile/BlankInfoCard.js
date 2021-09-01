import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlankImg from "../../../assets/images/info-blank.png";
import { useTranslation } from "react-i18next";

const BlankInfoCard = () => {
  const {t} = useTranslation("profile")
  return (
    <div className="card-style border-radius-2 p-3 mb-3">
      <div className="flex-box mb-12px w-100">
        <h4 className="mb-0 font-weight-bold flex-grow">{t("title")}</h4>
        <button
          className="center-box rounded-circle border-0"
          type="submit"
          style={{ width: "36px", height: "36px", background: "#FFEAE2" }}
        >
          <FontAwesomeIcon
            className="text-hightlight"
            icon={["fal", "pencil"]}
          />
        </button>
      </div>
      <div className="flex-box align-items-start w-100">
        <img
          className="mr-3 image-avatar"
          src="http://via.placeholder.com/96x96"
          alt="user"
        />
        <div className='flex-grow'>
          <div className="flex-box mb-3">
            <h5 className="mb-0 mr-2">Jack Simple</h5>
            <div
              className="center-box rounded-circle bg-hightlight-1 mr-3"
              style={{ width: "24px", height: "24px", background: "#FFEAE2" }}
            >
              <FontAwesomeIcon
                className="text-light text-small"
                icon={["fas", "graduation-cap"]}
              />
            </div>
            <span className="text-small text-grey">(Chưa có đánh giá)</span>
          </div>
          <div className="text-center mb-3">
            <img src={BlankImg} width={257} alt="blank info" />
          </div>
          <div style={{width: "15rem"}} className="main-btn mx-auto">Hoàn thành hồ sơ</div>
        </div>
      </div>
    </div>
  );
};

export default BlankInfoCard;
