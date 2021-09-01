import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import { Modal } from "reactstrap";
// import PopularIcon from "../../../assets/icons/user-popular.png";
import AccountCard from "./AccountCard";
import "./index.scss";
import FeesPro from "../../../assets/icons/feepro.png";
import FeesBasic from "../../../assets/icons/feesbasic.png";
import FeesStand from "../../../assets/icons/feestand.png";
import blue from "../../../assets/icons/landcostblue.svg";
import orange from "../../../assets/icons/landcostorange.svg";

import purple from "../../../assets/icons/landcostpurple.svg";

const UpgradeAccountModal = ({ modal, setModal, priority, preme, stand }) => {
  const { t } = useTranslation(["landing-page","upgrade"]);

  const basicFeatures = [t("block_8_text_1"), t("block_8_text_2")];
  const standardFeatures = [
    t("block_8_text_3"),
    t("block_8_text_4"),
    t("block_8_text_5"),
    t("block_8_text_6"),
    t("block_8_text_7"),
  ];
  const proFeatures = [
    t("block_8_text_8"),
    t("block_8_text_9"),
    t("block_8_text_10"),
    t("block_8_text_11"),
    t("block_8_text_12"),
  ];

  const changeCurency = (value) => {
    const valueArray = value ? value.toString().split("") : [];
    const valueLength = valueArray.length;
    return valueArray
      .reverse()
      .map((value, index) => {
        if ((index + 1) % 3 === 0 && index + 1 < valueLength) {
          return `.${value}`;
        }
        return value;
      })
      .reverse()
      .join("");
  };

  const feeBa = t("block_8_price_1");
  const feeStand = (
    <div>
      <Trans
        i18nKey={t("block_8_price_2")}
        components={{
          p: <p />,
        }}
      />
    </div>
  );
  const feePro = (
    <div>
      <Trans
        i18nKey={t("block_8_price_3")}
        components={{
          p: <p />,
        }}
      />
    </div>
  );

  return (
    <>
      <Modal
        toggle={() => setModal(!modal)}
        isOpen={modal}
        centered={true}
        modalClassName="update-account__modal"
        contentClassName="bg-light border-radius-3 p-0"
      >
        <div className="flex-box border-bottom p-3 w-100">
          <h5 className="text-center text-bold1 flex-grow mb-0">
            {t("upgrade:current")}
          </h5>
          <FontAwesomeIcon
            onClick={() => setModal(!modal)}
            className="text-grey h4 mb-0"
            icon={["fal", "times"]}
          />
        </div>
        <div className="card-container flex-box justify-content-center align-items-stretch">
          <AccountCard
            modal={modal}
            setModal={setModal}
            features={basicFeatures}
            title={t("block_8_header_1")}
            check={purple}
            color="#8A88F3"
            icon={FeesBasic}
            feekind={feeBa}
            priority={priority}
            cardPriority={0}
            isCurrentAccount={priority === 0 ? true : false}
          />
          <AccountCard
            modal={modal}
            setModal={setModal}
            features={standardFeatures}
            title={t("block_8_header_2")}
            check={orange}
            color="#FF6D34"
            icon={FeesStand}
            feekind={feeStand}
            priority={priority}
            cardPriority={1}
            isCurrentAccount={priority === 1 ? true : false}
          />
          <AccountCard
            modal={modal}
            setModal={setModal}
            features={proFeatures}
            title={t("block_8_header_3")}
            check={blue}
            color="#0367B4"
            icon={FeesPro}
            feekind={feePro}
            priority={priority}
            cardPriority={2}
            isCurrentAccount={priority === 2 ? true : false}
          />
        </div>
      </Modal>
    </>
  );
};

UpgradeAccountModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = ({ user }) => {
  const preme = user.info.upgrade_acc_to_premium_fee;
  const stand = user.info.upgrade_acc_to_standard_fee;
  return { preme, stand };
};

export default connect(mapStateToProps, null)(UpgradeAccountModal);
