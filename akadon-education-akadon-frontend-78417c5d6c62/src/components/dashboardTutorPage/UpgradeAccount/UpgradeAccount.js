import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./index.scss";
import { editUserRequest } from "../../../redux/actions/userActions";
import Goback from "../../utils/Goback";
import { upgradeAccount, getUser } from "../../../api";
import LegalcyContent from "./LegalcyContent";
import WaitingForm from "./WaitingForm";
import VerifyAccountSuccess from "./VerifyAccountSuccess";
import UpgradeSteps from "./UpgradeSteps";
import InfoForm from "./InfoForm";
import Success from "./Success";

const UpgradeAccount = ({ match, user, editUserRequest }) => {
  // EXTRACT PROPS

  const paramsType = match.params.accountType;
  const {
    upgrade_acc_to_premium_fee,
    upgrade_acc_to_standard_fee,
    confirm_progress,
    user_file,
  } = user;

  // INIT LOCAL STATE
  const initUpgradeContent = {
    confirmLegal: 1,
    idNumber: "",
    userFiles: [],
    image: [],
  };

  // LOCAL STATE DECLARATIONS
  const [legalcyModal, setLegalcyModal] = useState(false);
  const [step, setStep] = useState(confirm_progress);
  const [upgradeContent, setUpgradeContent] = useState(initUpgradeContent);
  const [accountType, setAccountType] = useState(paramsType * 1);
  const [getuser, setGetuser] = useState([]);
  const { t } = useTranslation(["upgrade","toast"]);

  // LONG THÊM CAAL API GETUSSER LẤY CÁC TRUOWNGFG CÒN THIẾU
  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const res = await getUser();
      if (res.status < 400) {
        setGetuser({ ...res.data });
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    })();
  }, []);
  // SIDE EFFECTS
  useEffect(() => {
    if (paramsType) {
      setAccountType(paramsType * 1);
    }
  }, []);

  // FUNCTION DECLARATIONS
  function converBase64(file) {
    // CHECK VALID IMAGE
    // CONVER SPECIFY FILE TO BASE64
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result);
    });
  }

  const removeLegalcyImage = (image) => {
    // REMOVE UPLOADED FILE VIA IMAGE NAME
    const updatedLegalcyImages = upgradeContent.userFiles.filter((file) => {
      return file !== image;
    });
    setUpgradeContent({ ...upgradeContent, userFiles: updatedLegalcyImages });
  };

  const handleUpgrade = async (e) => {
    // CONVERT FILE TO BASE 64
    // CALL API
    e.preventDefault();
    if (!upgradeContent.image[0]) {
      toast.error(t("alert-1"), {
        autoClose: false,
      });
      return false;
    }

    const base64Image = await converBase64(upgradeContent.image[0]);
    // List unrelative files following by backend guy request
    const userFileOld = user_file.map((file) => file.id);
    let formData = new FormData();

    if (upgradeContent.userFiles.length === 0) {
      formData.append("user_file", null);
    } else {
      upgradeContent.userFiles.map((file) => {
        formData.append("user_file", file);
      });
    }

    formData.append("face_image", base64Image);
    formData.append("user_file_old", JSON.stringify(userFileOld));
    formData.append("priority", accountType);
    formData.append("confirm_legal", upgradeContent.confirmLegal);
    formData.append("identity_number", upgradeContent.idNumber);

    const res = await upgradeAccount(formData);
    if (res.status < 400) {
      toast.success(t("alert-3"));
      // Hard confirm progress to 3 to implement payment
      editUserRequest({
        confirm_progress: 3,
        // LONG THÊM 4 TRUONGF PHÍA DỨOI
        user_file_old: JSON.stringify(userFileOld),
        user_file: "[]",
        level: JSON.stringify(getuser.level),
        specialize: JSON.stringify(getuser.specialize),
      });
      setStep(2);
    }
  };

  return (
    <>
      <Goback />
      <div className="upgrade-form flex-grow card-style border-radius-2 p-4 pb-0">
        <h4 className="mb-3 text-bold2">{t("title")}</h4>

        <UpgradeSteps step={step} />

        {step === 1 && (
          <InfoForm
            handleUpgrade={handleUpgrade}
            accountType={accountType}
            setAccountType={setAccountType}
            upgradeContent={upgradeContent}
            setUpgradeContent={setUpgradeContent}
            converBase64={converBase64}
            removeLegalcyImage={removeLegalcyImage}
            legalcyModal={legalcyModal}
            setLegalcyModal={setLegalcyModal}
          />
        )}

        {step === 2 && <WaitingForm />}

        {step === 3 && (
          <VerifyAccountSuccess
            setStep={setStep}
            accountType={accountType}
            upgrade_acc_to_premium_fee={upgrade_acc_to_premium_fee}
            upgrade_acc_to_standard_fee={upgrade_acc_to_standard_fee}
          />
        )}

        {step === 4 && <Success accountType={accountType} />}
      </div>
      <LegalcyContent modal={legalcyModal} setModal={setLegalcyModal} />
    </>
  );
};

UpgradeAccount.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
};

const mapStateTopProps = ({ user }) => {
  const { info } = user;
  return { user: info };
};

const mapDispatchToProps = {
  editUserRequest,
};

export default connect(mapStateTopProps, mapDispatchToProps)(UpgradeAccount);
