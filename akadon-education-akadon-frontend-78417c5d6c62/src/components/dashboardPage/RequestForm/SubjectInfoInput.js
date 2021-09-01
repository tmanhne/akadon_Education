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
                <option value="Toán học">Toán học</option>
                <option value="Ngữ văn">Ngữ văn</option>
                <option value="Sinh học">Sinh học</option>
                <option value="Vật lý">Vật lý</option>
                <option value="Hóa học">Hóa học</option>
                <option value="Địa lý">Địa lý</option>
                <option value="Lịch sử">Lịch sử</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Tin học">Tin học</option>
              </>
            )}
            {language === "en" && (
              <>
                <option value="Toán học">Mathematics</option>
                <option value="Ngữ văn">Philological</option>
                <option value="Sinh học">Biological</option>
                <option value="Vật lý">Physical</option>
                <option value="Hóa học">Chemistry</option>
                <option value="Địa lý">Geography</option>
                <option value="Lịch sử">History</option>
                <option value="Tiếng Anh">English</option>
                <option value="Tin học">Informatics</option>
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
                <option value="Lớp 1">Lớp 1</option>
                <option value="Lớp 2">Lớp 2</option>
                <option value="Lớp 3">Lớp 3</option>
                <option value="Lớp 4">Lớp 4</option>
                <option value="Lớp 5">Lớp 5</option>
                <option value="Lớp 6">Lớp 6</option>
                <option value="Lớp 7">Lớp 7</option>
                <option value="Lớp 8">Lớp 8</option>
                <option value="Lớp 9">Lớp 9</option>
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
                <option value="Đại học">Đại học</option>
              </>
            )}
            {language === "en" && (
              <>
                <option value="Lớp 1">Grade 1</option>
                <option value="Lớp 2">Grade 2</option>
                <option value="Lớp 3">Grade 3</option>
                <option value="Lớp 4">Grade 4</option>
                <option value="Lớp 5">Grade 5</option>
                <option value="Lớp 6">Grade 6</option>
                <option value="Lớp 7">Grade 7</option>
                <option value="Lớp 8">Grade 8</option>
                <option value="Lớp 9">Grade 9</option>
                <option value="Lớp 10">Grade 10</option>
                <option value="Lớp 11">Grade 11</option>
                <option value="Lớp 12">Grade 12</option>
                <option value="Đại học">University</option>
              </>
            )}
          </Input>
        </FormGroup>
      </div>

      <FormGroup className="mr-5 mb-4" tag="fieldset">
        <legend className="text-bold2 mb-12px h6">Hình thức</legend>
        <div className="offline-box flex-box align-items-start">
          <FormGroup check className="mr-5">
            <Label
              className={`mb-0 cursor-pointer text-nowrap ${
                subjectInfo.offlineFlag && "text-grey"
              }`}
            >
              {/* LONG thay đổi defaultChecked khi có giá trị HỌC THỬ BIG UPDATE */}
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
