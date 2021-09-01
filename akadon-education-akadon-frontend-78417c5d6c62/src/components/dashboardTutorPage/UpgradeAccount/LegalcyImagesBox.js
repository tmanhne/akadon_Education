import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const LegalcyImagesBox = ({
  setUpgradeContent,
  upgradeContent,
  removeLegalcyImage
}) => {
  const {t} = useTranslation("upgrade");
  return (
    <>
      <div className="flex-box pl-4">
        <FormGroup style={{ width: "10rem" }}>
          <Input
            defaultChecked
            type="radio"
            name="legalcy"
            id="legalcy-yes"
            onChange={() =>
              setUpgradeContent({ ...upgradeContent, confirmLegal: 1 })
            }
          />
          <Label htmlFor="legalcy-yes" className="ml-2">
            {t("yes")}
          </Label>
        </FormGroup>
        <FormGroup style={{ width: "10rem" }}>
          <Input
            type="radio"
            name="legalcy"
            id="legalcy-no"
            onChange={() =>
              setUpgradeContent({ ...upgradeContent, confirmLegal: 0 })
            }
          />
          <Label htmlFor="legalcy-no" className="ml-2">
          {t("no")}
          </Label>
        </FormGroup>
      </div>
      {upgradeContent.confirmLegal === 1 ? (
        <div className="mb-12px">
          <div className="flex-box mb-12px">
            <div
              style={{ height: "48px" }}
              className="border-radius-2 border flex-grow mr-3 p-2 flex-box align-items-center"
            >
              {document.getElementById("legalcy-img")
                ? document.getElementById("legalcy-img").value
                : ""}
            </div>
            <Label for="legalcy-img" style={{height: "48px"}} className="mb-0">
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #EDEDED 0%, #D0D0D0 100%)",
                }}
                className="center-box border border-radius-2 p-2 h-100"
              >
                <FontAwesomeIcon
                  className="text-light mr-2"
                  icon={["fas", "sticky-note"]}
                />
                <span className="text-grey text-bold2 h5 mb-0 cursor-pointer">
                  Browse
                </span>
              </div>
              <Input
                onChange={(e) => setUpgradeContent({...upgradeContent, userFiles: Array.from(e.target.files)})}
                type="file"
                multiple
                id="legalcy-img"
                className="d-none"
              />
            </Label>
          </div>
          {/* UPLOADED IMAGES */}
          {
            upgradeContent.userFiles.map(file => (
              <div key={file.name} className="position-relative d-inline-block">
                <img className="mr-2" width={113} height={113} src={URL.createObjectURL(file)} />
                <FontAwesomeIcon
                  style={{ top: "0", right: "0.25rem" }}
                  className="text-danger position-absolute"
                  icon={["fas", "times-circle"]}
                  onClick={() => removeLegalcyImage(file)}
                />
              </div>
            ))
          }
        </div>
      ) : (
        <div
          style={{ background: "#FFF2CC", border: "1px solid #FFC107" }}
          className="flex-box mb-4 px-3 pt-12px pb-12px border-radius-1"
        >
          <FontAwesomeIcon
            style={{ color: "#F3B704" }}
            className="h4 mb-0"
            icon={["fas", "exclamation-circle"]}
          />
          <p className="mb-0 ml-2">
          {t("alert-1")}
          </p>
        </div>
      )}
    </>
  );
};

PropTypes.propTypes = {
  setUpgradeContent: PropTypes.func,
  upgradeContent: PropTypes.object,
  removeLegalcyImage: PropTypes.func
}

export default LegalcyImagesBox;
