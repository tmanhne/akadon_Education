import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import ErrorHandler from "../../ErrorHandler";
import provinces from "../../../provinces";

function SubjectInfoInput({
  subjectInfo,
  setSubjectInfo,
  setIsSubjectInfoDone,
  language,
}) {
  const [error, settError] = useState("");
  const { t } = useTranslation(["request-form", "common"]);

  function submit() {
    if (!subjectInfo.requestHeader) {
      settError("requestHeader");
      return;
    }

    if (!subjectInfo.subjectName) {
      settError("subjectName");
      return;
    }

    if (!subjectInfo.subjectLevel) {
      settError("subjectLevel");
      return;
    }

    if (subjectInfo.offlineFlag) {
      if (!subjectInfo.city) {
        settError("city");
        return;
      }
      if (!subjectInfo.district) {
        settError("district");
        return;
      }
    }

    settError("");
    setIsSubjectInfoDone(true);
  }

  return (
    <div className="subject-info-form card-style border-radius-2 mb-12px">
      <h6 className="text-hightlight1 mb-12px text-bold2">{t("header-1")}</h6>

      <FormGroup className="mr-5">
        <Label className="text-bold2 cursor-pointer" for="title">
          {t("common:request-header")} <span className="text-danger">*</span>
          <span>
            {error === "requestHeader" && <ErrorHandler error={t("error-1")} />}
          </span>
        </Label>
        <Input
          className="border-radius-2"
          type="text"
          id="title"
          required
          value={subjectInfo.requestHeader}
          onChange={(e) =>
            setSubjectInfo({ ...subjectInfo, requestHeader: e.target.value })
          }
        />
      </FormGroup>

      <div className="subject-and-level-box flex-box mr-5">
        <FormGroup className="w-50 mr-3">
          <Label className="text-bold2 cursor-pointer" for="requestName">
            {t("common:subject-name")} <span className="text-danger">*</span>
            {error === "subjectName" && <ErrorHandler error={t("error-2")} />}
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            required
            id="requestName"
            value={subjectInfo.subjectName}
            onChange={(e) =>
              setSubjectInfo({ ...subjectInfo, subjectName: e.target.value })
            }
          >
            <option value="">{t("select-subject")}</option>
            {language === "vi" && (
              <>
                <option value="To??n h???c">To??n h???c</option>
                <option value="Ng??? v??n">Ng??? v??n</option>
                <option value="Sinh h???c">Sinh h???c</option>
                <option value="V???t l??">V???t l??</option>
                <option value="H??a h???c">H??a h???c</option>
                <option value="?????a l??">?????a l??</option>
                <option value="L???ch s???">L???ch s???</option>
                <option value="Ti???ng Anh">Ti???ng Anh</option>
                <option value="Tin h???c">Tin h???c</option>
              </>
            )}
            {language === "en" && (
              <>
                <option value="To??n h???c">Mathematics</option>
                <option value="Ng??? v??n">Philological</option>
                <option value="Sinh h???c">Biological</option>
                <option value="V???t l??">Physical</option>
                <option value="H??a h???c">Chemistry</option>
                <option value="?????a l??">Geography</option>
                <option value="L???ch s???">History</option>
                <option value="Ti???ng Anh">English</option>
                <option value="Tin h???c">Informatics</option>
              </>
            )}
          </Input>
        </FormGroup>
        <FormGroup className="w-50">
          <Label className="text-bold2 cursor-pointer" for="student-grade">
            {t("common:level")} <span className="text-danger">*</span>
            {error === "subjectLevel" && <ErrorHandler error={t("error-3")} />}
          </Label>
          <Input
            className="border-radius-2"
            type="select"
            id="student-grade"
            value={subjectInfo.subjectLevel}
            onChange={(e) =>
              setSubjectInfo({ ...subjectInfo, subjectLevel: e.target.value })
            }
          >
            <option value="">{t("select-level")}</option>
            {language === "vi" && (
              <>
                <option value="L???p 1">L???p 1</option>
                <option value="L???p 2">L???p 2</option>
                <option value="L???p 3">L???p 3</option>
                <option value="L???p 4">L???p 4</option>
                <option value="L???p 5">L???p 5</option>
                <option value="L???p 6">L???p 6</option>
                <option value="L???p 7">L???p 7</option>
                <option value="L???p 8">L???p 8</option>
                <option value="L???p 9">L???p 9</option>
                <option value="L???p 10">L???p 10</option>
                <option value="L???p 11">L???p 11</option>
                <option value="L???p 12">L???p 12</option>
                <option value="?????i h???c">?????i h???c</option>
              </>
            )}
            {language === "en" && (
              <>
                <option value="L???p 1">Grade 1</option>
                <option value="L???p 2">Grade 2</option>
                <option value="L???p 3">Grade 3</option>
                <option value="L???p 4">Grade 4</option>
                <option value="L???p 5">Grade 5</option>
                <option value="L???p 6">Grade 6</option>
                <option value="L???p 7">Grade 7</option>
                <option value="L???p 8">Grade 8</option>
                <option value="L???p 9">Grade 9</option>
                <option value="L???p 10">Grade 10</option>
                <option value="L???p 11">Grade 11</option>
                <option value="L???p 12">Grade 12</option>
                <option value="?????i h???c">University</option>
              </>
            )}
          </Input>
        </FormGroup>
      </div>

      <FormGroup className="mr-5 mb-4" tag="fieldset">
        <legend className="text-bold2 mb-12px h6">H??nh th???c</legend>
        <div className="offline-box flex-box align-items-start">
          <FormGroup check className="mr-5">
            <Label
              className={`mb-0 cursor-pointer text-nowrap ${
                subjectInfo.offlineFlag && "text-grey"
              }`}
            >
              {/* LONG thay ?????i defaultChecked khi c?? gi?? tr??? H???C TH??? BIG UPDATE */}
              <Input
                type="radio"
                name="offlineFlag"
                defaultChecked={!subjectInfo.offlineFlag}
                onChange={() =>
                  setSubjectInfo({ ...subjectInfo, offlineFlag: false })
                }
              />
              {t("online")}
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label
              className={`mb-12px cursor-pointer ${
                !subjectInfo.offlineFlag && "text-grey"
              }`}
            >
              <Input
                type="radio"
                name="offlineFlag"
                defaultChecked={subjectInfo.offlineFlag}
                onChange={() =>
                  setSubjectInfo({ ...subjectInfo, offlineFlag: true })
                }
              />
              {t("offline")}
            </Label>
            {subjectInfo.offlineFlag && (
              <div className="address-box flex-box">
                <FormGroup className="w-50 mr-3">
                  <Label className="h6 text-bold2" for="city">
                    {t("common:city")}
                    {error === "city" && <ErrorHandler error={t("error-4")} />}
                  </Label>
                  <Input
                    className="border-radius-2"
                    type="select"
                    id="city"
                    value={subjectInfo.city}
                    onChange={(e) =>
                      setSubjectInfo({ ...subjectInfo, city: e.target.value })
                    }
                  >
                    <option value="">{t("select-city")}</option>
                    {provinces.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="w-50">
                  <Label className="h6 text-bold2" for="dis">
                    {t("common:district")}
                    {error === "district" && (
                      <ErrorHandler error={t("error-5")} />
                    )}
                  </Label>
                  <Input
                    className="border-radius-2"
                    type="select"
                    id="dis"
                    value={subjectInfo.district}
                    onChange={(e) =>
                      setSubjectInfo({
                        ...subjectInfo,
                        district: e.target.value,
                      })
                    }
                  >
                    <option value="">{t("select-dist")}</option>
                    {subjectInfo.city &&
                      provinces
                        .filter((pro) => pro.name === subjectInfo.city)[0]
                        .districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                  </Input>
                </FormGroup>
              </div>
            )}
          </FormGroup>
        </div>
      </FormGroup>

      <div
        onClick={submit}
        className="main-btn flex-box flex-nowrap py-0 px-4 mb-3"
      >
        <span className="mr-3 flex-grow">{t("common:next-btn")}</span>
        <FontAwesomeIcon icon={["fas", "arrow-down"]} />
      </div>
    </div>
  );
}

SubjectInfoInput.propTypes = {
  subjectInfo: PropTypes.object,
  setSubjectInfo: PropTypes.func,
  isSubjectInfoDone: PropTypes.func,
};

const mapStateToProps = ({ appConfig }) => {
  const { language } = appConfig;
  return { language };
};

export default connect(mapStateToProps, null)(SubjectInfoInput);
