import React from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import PassportPlaceHolder from "../../../assets/images/passport-placeholder.png";
import StandardLogo from "../../../assets/icons/user-standard.png";
import ProLogo from "../../../assets/icons/user-pro.png";
import LegalcyImg from "../../../assets/images/legalcy.png";
import LegalcyImagesBox from "./LegalcyImagesBox";

function InfoForm({
  handleUpgrade,
  accountType,
  setAccountType,
  upgradeContent,
  setUpgradeContent,
  converBase64,
  removeLegalcyImage,
  legalcyModal,
  setLegalcyModal
}) {
  const { t } = useTranslation("upgrade");
  return (
    <Form onSubmit={handleUpgrade}>
      <div className="form-content flex-box mb-5">
        <div>
          <p className="mb-12px text-bold2 text-dark">{t("header-1")}</p>
          <div className="flex-box mb-4">
            <div
              className="main-btn standard-btn mr-4 position-relative"
              style={{ width: "15rem" }}
            >
              <img src={StandardLogo} alt="standard user" />
              <span className="text-light text-bold2 ml-2">Standard</span>
              {accountType !== 1 && (
                <div
                  onClick={() => setAccountType(1)}
                  className="position-absolute inactive-btn"
                ></div>
              )}
            </div>
            <div
              className="main-btn pro-btn mr-4 position-relative"
              style={{ width: "15rem" }}
            >
              <img src={ProLogo} alt="standard user" />
              <span className="text-light text-bold2 ml-2">Professional</span>
              {accountType !== 2 && (
                <div
                  onClick={() => setAccountType(2)}
                  className="position-absolute inactive-btn"
                ></div>
              )}
            </div>
          </div>
          <p className="mb-12px text-bold2 text-dark">{t("header-2")}</p>
          <LegalcyImagesBox
            setUpgradeContent={setUpgradeContent}
            upgradeContent={upgradeContent}
            converBase64={converBase64}
            removeLegalcyImage={removeLegalcyImage}
          />
          <FormGroup className="mb-12px text-bold2 mb-4">
            <Label className="text-bold2 text-dark" htmlFor="passport">
              {t("header-3")}
            </Label>
            <Input
              type="number"
              required
              className="border-radius-2 p-3"
              placeholder={t("header-3-placeholder")}
              id="passport"
              value={upgradeContent.idNumber}
              onChange={async (e) => {
                setUpgradeContent({
                  ...upgradeContent,
                  idNumber: e.target.value,
                });
              }}
            />
          </FormGroup>
          <p className="mb-12px text-bold2 text-dark">{t("header-4")}</p>
          <div className="flex-box flex-column justify-content-center mb-3">
            <Label
              for="passport-img"
              className="mt-12px"
              style={{ cursor: "pointer" }}
            >
              {upgradeContent.image.length === 0 ? (
                <img src={PassportPlaceHolder} alt="passport or id card" />
              ) : (
                upgradeContent.image[0] && (
                  <img
                    src={URL.createObjectURL(upgradeContent.image[0])}
                    alt="passport or id card"
                  />
                )
              )}
              <p className="text-grey mt-12px text-center">
                {t("header-4-label")}
              </p>
            </Label>
            <Input
              onChange={(e) =>
                setUpgradeContent({
                  ...upgradeContent,
                  image: [e.target.files[0]],
                })
              }
              className="d-none"
              type="file"
              id="passport-img"
            />
          </div>
        </div>
        <div className="flex-box justify-content-center align-self-end">
          <button
            type="submit"
            className="main-btn shadow-btn-hover"
            style={{ width: "15rem" }}
          >
            {t("next")}
            <FontAwesomeIcon className="ml-3" icon={["fal", "arrow-right"]} />
          </button>
        </div>
      </div>
      <div className="position-relative" style={{ margin: "0 -1.5rem" }}>
        <img height={210} className="w-100" src={LegalcyImg} alt="legalcy" />
        <div
          className="flex-box position-absolute justify-content-center flex-column w-100"
          style={{
            zIndex: "9",
            top: "0",
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1 className="mb-3 text-light text-center">{t("header-5")}</h1>
          <div
            onClick={() => setLegalcyModal(!legalcyModal)}
            style={{ width: "10rem" }}
            className="main-btn bg-hightlight font-weight-bold orange-btn-hover"
          >
            {t("view-more")}
          </div>
        </div>
      </div>
    </Form>
  );
}

InfoForm.propTypes = {
  handleUpgrade: PropTypes.func,
  accountType: PropTypes.number,
  setAccountType: PropTypes.func,
  upgradeContent: PropTypes.object,
  setUpgradeContent: PropTypes.func,
  converBase64: PropTypes.func,
  removeLegalcyImage: PropTypes.func,
  legalcyModal: PropTypes.bool,
  setLegalcyModal: PropTypes.func
};

export default InfoForm;
