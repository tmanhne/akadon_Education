import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ErrorHandler from "../../../ErrorHandler";
import CheckboxDropdown from "./CheckboxDropdown";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BackgroundModal = ({ setModal, user, editUserRequest, isLoading }) => {
  const language = useSelector(({ appConfig }) => appConfig.language);
  console.log(language);
  // EXTRACT PROPS
  const { level, specialize } = user;
  const { t } = useTranslation("profile");

  // INIT LOCAL STATES
  const initUser = {
    level: user.profession || 0,
    exp: user.describe || "",
  };

  // LOCAL STATE DECLARATIONS
  const [userInfo, setUserInfo] = useState(initUser);
  const [levels, setLevels] = useState([]);
  const [specializes, setSpecializes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SIDE EFFECTS
  useEffect(() => {
    setLevels([...level]);
    setSpecializes([...specialize]);
  }, [level, specialize]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading && loading) {
      setLoading(false);
      setModal(false);
    }
  }, [isLoading]);

  // INIT SOME STATIC DATA AND FUNCTION DECLARATIONS
  const initSpecialize =
    language === "vi"
      ? [
          "Toán học",
          "Ngữ văn",
          "Sinh học",
          "Vật lý",
          "Hóa học",
          "Địa lý",
          "Lịch sử",
          "Tiếng Anh",
          "Tin học",
        ]
      : [
          "Math",
          "Literature",
          "Biological",
          "Physical",
          "Chemistry",
          "Geography",
          "History",
          "Information Technology",
        ];
  const initLevel =
    language === "vi"
      ? [
          "Lớp 1",
          "Lớp 2",
          "Lớp 3",
          "Lớp 4",
          "Lớp 5",
          "Lớp 6",
          "Lớp 7",
          "Lớp 8",
          "Lớp 9",
          "Lớp 10",
          "Lớp 11",
          "Lớp 12",
          "Đại học",
        ]
      : [
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
          "Grade 9",
          "Grade 10",
          "Grade 11",
          "Grade 12",
          "University",
        ];

  const handleEditUser = (e) => {
    e.preventDefault();
    // CHECK EMPTY FIELDS
    if (!userInfo.level && userInfo.level !== 0) {
      setError({ path: "level", message: t("alert-4") });
      return false;
    }
    if (levels && levels.length === 0) {
      setError({
        path: "teach-level",
        message: t("alert-5"),
      });
      return false;
    }
    if (!userInfo.exp) {
      setError({ path: "exp", message: t("alert-6") });
      return false;
    }
    if (specializes && specializes.length === 0) {
      console.log(specializes);
      setError({
        path: "specializes",
        message: t("alert-7"),
      });
      return false;
    }

    // CHECK IS SOMETHING CHANGE
    const user_file_old = user.user_file.map((file) => file.id);

    const originalData = {
      profession: initUser.level,
      describe: initUser.exp,
      specialize: JSON.stringify(specialize),
      level: JSON.stringify(level),
      user_file: "[]",
      user_file_old: JSON.stringify(user_file_old),
      // level: JSON.stringify(level),
      // specialize: JSON.stringify(specialize),
    };

    const payload = {
      profession: userInfo.level,
      describe: userInfo.exp,
      specialize: JSON.stringify(specializes),
      level: JSON.stringify(levels),
      user_file: "[]",
      user_file_old: JSON.stringify(user_file_old),
      // specialize: JSON.stringify(specializes)
    };
    const isChange = JSON.stringify(originalData) === JSON.stringify(payload);

    if (isChange) {
      toast.warning(t("alert-8"));
      return;
    }

    // RESET ERROR AND DISPATCH ACTION
    setError({});
    editUserRequest(payload);
  };

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <div className="flex-box py-2 mb-4 border-bottom">
        <h4 className="mb-0 text-center flex-grow text-bold2">
          {t("modal-1")}
        </h4>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          className="h4 mb-0 mr-3 text-grey"
          icon={["fal", "times"]}
        />
      </div>

      <FormGroup
        style={{ width: "35rem" }}
        className="flex-box justify-content-around mx-auto mb-3"
      >
        <Label
          style={{ cursor: "pointer", flexBasis: "10rem" }}
          className="mr-3 text-bold1 text-nowrap text-right"
          for="kind"
        >
          {t("level")}
          {error.path === "level" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={error.message} />)
            </p>
          )}
        </Label>
        <Input
          style={{ width: "25rem" }}
          type="select"
          id="kind"
          value={userInfo.level}
          onChange={(e) => setUserInfo({ ...userInfo, level: e.target.value })}
        >
          <option value={0}>{t("lv-1")}</option>
          <option value={1}>{t("lv-2")}</option>
          <option value={2}>{t("lv-3")}</option>
          <option value={3}>{t("lv-4")}</option>
        </Input>
      </FormGroup>

      <FormGroup
        style={{ width: "35rem" }}
        className="flex-box justify-content-around align-items-center mx-auto mb-3"
      >
        <Label
          style={{ flexBasis: "10rem" }}
          className="mr-3 cursor-pointer mb-0 text-bold1 text-right"
        >
          {t("teach-level")}
          {error.path === "teach-level" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={error.message} />)
            </p>
          )}
        </Label>
        <div style={{ width: "25rem" }}>
          <CheckboxDropdown
            data={initLevel}
            listKeys={levels}
            setListKeys={setLevels}
            id="level"
            language={language}
          />
        </div>
      </FormGroup>

      <FormGroup
        style={{ width: "35rem" }}
        className="flex-box justify-content-around align-items-start mx-auto mb-3"
      >
        <Label
          style={{ cursor: "pointer", flexBasis: "10rem" }}
          className="mr-3 text-bold1 text-nowrap text-right"
          for="exp"
        >
          {t("exp")}
          {error.path === "exp" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={error.message} />)
            </p>
          )}
        </Label>
        <Input
          style={{ width: "25rem" }}
          type="textarea"
          rows={5}
          id="exp"
          value={userInfo.exp}
          onChange={(e) => setUserInfo({ ...userInfo, exp: e.target.value })}
        />
      </FormGroup>

      <FormGroup
        style={{ width: "35rem" }}
        className="flex-box justify-content-around align-items-center mx-auto mb-3"
      >
        <Label
          style={{ flexBasis: "10rem" }}
          className="mr-3 cursor-pointer mb-0 text-bold1 text-right"
        >
          {t("teach-subject")}
          {error.path === "specializes" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={error.message} />)
            </p>
          )}
        </Label>
        <div style={{ width: "25rem" }}>
          <CheckboxDropdown
            data={initSpecialize}
            listKeys={specializes}
            setListKeys={setSpecializes}
            id="subject"
            language={language}
          />
        </div>
      </FormGroup>

      <div
        style={{ width: "40rem" }}
        className="flex-box justify-content-center mb-5 mx-auto"
      >
        <div
          onClick={() => setModal(false)}
          style={{ width: "15rem" }}
          className="cancel-btn mr-3 text-bold1"
        >
          {t("cancle")}
        </div>
        {isLoading ? (
          <button style={{ width: "15rem" }} className="main-btn py-0">
            <Spinner />
          </button>
        ) : (
          <button
            onClick={handleEditUser}
            style={{ width: "15rem" }}
            className="main-btn border-0 py-0"
          >
            {t("change")}
          </button>
        )}
      </div>
    </Form>
  );
};

BackgroundModal.propTypes = {
  setModal: PropTypes.func,
  user: PropTypes.object,
  editUserRequest: PropTypes.func,
};
export default BackgroundModal;
