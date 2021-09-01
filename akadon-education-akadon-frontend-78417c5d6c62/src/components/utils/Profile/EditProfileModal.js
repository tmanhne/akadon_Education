import React, { useState, useEffect } from "react";
import { connect} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { DatePicker } from "../index";
import ErrorHandler from "../../ErrorHandler";
import { userProfileSchema } from "../../../validator";

const EditProfileModal = ({ modal, setModal, user, editUserRequest, isLoading }) => {
  // INIT LOCAL STATES
  const initUser = {
    name: user.name,
    dob: user.dob,
    email: user.email,
    describe: user.describe,
    gender: user.gender,
  };

  // LOCAL STATE DECLARATIONS
  const [userInfo, setUserInfo] = useState(initUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation("profile");

  const dob = userInfo.dob ? moment(userInfo.dob, "DD/MM/YYYY") : "";

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading && loading) {
      setLoading(false);
      setModal(false);
    }
  }, [isLoading]);
  
  // FUNCTION DECLARATIONS
  const handleEditUser = async (e) => {
    e.preventDefault();

    const isChange = JSON.stringify(initUser) === JSON.stringify(userInfo);
    if (isChange) {
      toast.warning(t("alert-3"));
      return;
    }

    let validProfile = userProfileSchema.validate(userInfo);

    if (validProfile.error) {
      setError(validProfile.error.details[0].path[0]);
      console.log(error);
      return false;
    } else {
      setError("");
      const user_file_old = user.user_file.map((file) => file.id);
      const { level, specialize } = user;

      const profile = {
        ...userInfo,
        phone_number: userInfo.phone_number,
        user_file: "[]",
        user_file_old: JSON.stringify(user_file_old),
        level: JSON.stringify(level),
        specialize: JSON.stringify(specialize),
      };
      const dateOfBirth = typeof userInfo.dob;
      if (dateOfBirth === "string") {
        profile.dob = userInfo.dob
      } else if (dateOfBirth === "object") {
        profile.dob = moment(userInfo.dob).format("DD/MM/YYYY");
      } else {
        setError("dob");
      }
      editUserRequest(profile);
    }
  };

  return (
    <Form onSubmit={handleEditUser}>
      <div className="flex-box py-2 mb-4 border-bottom">
        <h4 className="mb-0 text-center flex-grow text-bold2">
          {t("modal-1")}
        </h4>
        <FontAwesomeIcon
          onClick={() => setModal(!modal)}
          className="h4 mb-0 mr-3 text-grey"
          icon={["fal", "times"]}
        />
      </div>

      <FormGroup
        style={{ width: "30rem" }}
        className="flex-box justify-content-around mx-auto mb-3"
      >
        <Label
          style={{ cursor: "pointer", flexBasis: "6rem" }}
          className="mr-3 text-bold1 text-nowrap text-right"
          for="username"
        >
          {t("field-1")}
          {error === "name" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={t("alert_9")} />)
            </p>
          )}
        </Label>
        <Input
          style={{ width: "22rem" }}
          type="text"
          id="username"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </FormGroup>

      <FormGroup
        style={{ width: "30rem" }}
        className="datepicker-icon flex-box justify-content-around mx-auto mb-3"
      >
        <Label
          style={{ cursor: "pointer", flexBasis: "6rem" }}
          className="mr-3 text-bold1 text-nowrap text-right"
          for="dob"
        >
          {t("field-2")}
          {error === "dob" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={t("alert_9")} />)
            </p>
          )}
        </Label>
        <DatePicker
          className="border w-100 border-radius-1 px-2"
          wrapperClassName="profile-datepicker"
          id="dob"
          selected={dob.toDate()}
          onChange={(date) =>
            setUserInfo({
              ...userInfo,
              dob: date,
            })
          }
        />
      </FormGroup>

      <FormGroup
        style={{ width: "30rem" }}
        className="flex-box justify-content-around mx-auto"
      >
        <Label
          style={{ cursor: "pointer", flexBasis: "6rem" }}
          className="mr-3 text-bold1 text-nowrap text-right"
          for="email"
        >
          Email
          {error === "email" && (
            <p className="text-danger mb-0">
              {" "}
              (<ErrorHandler error={t("alert_9")} />)
            </p>
          )}
        </Label>
        <Input
          style={{ width: "22rem" }}
          type="text"
          id="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </FormGroup>

      {user.userType === "student" ? (
        <FormGroup
          style={{ width: "30rem" }}
          className="flex-box justify-content-around align-items-start mx-auto mb-5"
        >
          <Label
            style={{ cursor: "pointer", flexBasis: "6rem" }}
            className="mr-3 text-bold1 text-nowrap text-right"
            for="disc"
          >
            {t("field-3")}
            {error === "describe" && (
              <p className="text-danger mb-0">
                {" "}
                (<ErrorHandler error={t("alert_9")} />)
              </p>
            )}
          </Label>
          <Input
            style={{ width: "22rem" }}
            type="textarea"
            rows={5}
            id="disc"
            value={userInfo.describe}
            onChange={(e) =>
              setUserInfo({ ...userInfo, describe: e.target.value })
            }
          />
        </FormGroup>
      ) : (
        <FormGroup
          style={{ width: "30rem" }}
          className="flex-box justify-content-around mx-auto"
        >
          <Label
            style={{ flexBasis: "6rem" }}
            className="mr-3 text-bold1 text-nowrap text-right cursor-pointer mb-0"
            for="gender"
          >
            {t("field-4")}
            {error === "gender" && (
              <p className="text-danger mb-0">
                {" "}
                (<ErrorHandler error={t("alert_9")} />)
              </p>
            )}
          </Label>
          <Input
            style={{ width: "22rem" }}
            type="select"
            id="gender"
            value={userInfo.gender}
            onChange={(e) =>
              setUserInfo({ ...userInfo, gender: e.target.value })
            }
          >
            <option value={0}>{t("female")}</option>
            <option value={1}>{t("male")}</option>
          </Input>
        </FormGroup>
      )}

      <div
        style={{ width: "40rem" }}
        className="flex-box justify-content-center my-5 mx-auto"
      >
        <div
          onClick={() => setModal(!modal)}
          style={{ width: "15rem" }}
          className="cancel-btn mr-3 text-bold1"
        >
          {t("cancle")}
        </div>
        {
          isLoading ? <button
          type="text"
          disabled
          style={{ width: "15rem" }}
          className="main-btn border py-0"
        >
          <Spinner />
        </button> : <button
          type="submit"
          style={{ width: "15rem" }}
          className="main-btn border-0 py-0"
        >
          {t("change")}
        </button>
        }
        
      </div>
    </Form>
  );
};

EditProfileModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  user: PropTypes.object,
  edituserRequest: PropTypes.func,
};

const mapStateToProps = ({user}) => {
  const {isLoading} = user;
  return {isLoading}
}

export default connect(mapStateToProps, null)(EditProfileModal);
