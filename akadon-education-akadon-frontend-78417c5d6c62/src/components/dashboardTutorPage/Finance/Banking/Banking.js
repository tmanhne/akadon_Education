import React, { useState, useEffect } from "react";
import { Card, Modal } from "reactstrap";
import {toast} from "react-toastify";

import { getBankList, setBankDefault } from "../../../../api";
import "./index.scss";
import Goback from "../../../utils/Goback";
import InfoModal from "./InfoModal";
import OtpModal from "./OtpModal";
import BankCard from "./BankCard";
import SubLoader from "../../../utils/SubLoader";
import BankModal from "./BankModal";
import { useTranslation } from "react-i18next";

export default function Banking() {
  // INIT LOCAL STATE
  const initInfo = {
    phone: "",
    id_number: "",
    card_name: "",
    bank_name: "",
    bank_number: "",
    isDefault: false,
  };

  // LOCAL STATE DECLARATIONS
  const [info, setInfo] = useState(initInfo);
  const [bankList, setBankList] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [bankModal, setBankModal] = useState({ isOpen: false, content: {} });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(["payment","toast"]);

  // SIDE EFFECTS
  useEffect(() => {
    fetchBankList();
  }, []);

  async function fetchBankList() {
    const res = await getBankList();
    setLoading(false);
    if (res.status < 400) {
      // Take bank with is_default true to top
      const data = res.data || [];
      let fetchedData = [];
      data.map((d) => {
        if (d.is_default) {
          fetchedData.unshift(d);
        } else {
          fetchedData.push(d);
        }
      });
      setBankList([...fetchedData]);
    }
  }

  async function setDefault(bank) {
    const payload = {
      bank_account_id: bank.id,
    };
    setLoading(true)
    const res = await setBankDefault(payload);
    if (res.status < 400) {
      await fetchBankList();
      setLoading(false)
      toast.success(`Bạn đã chọn ${bank.bank} làm mặc định !`);
      setBankModal({...bankModal, isOpen: false})
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <>
      <Goback />
      {loading ? (
        <SubLoader />
      ) : (
        <div className="card-style py-3 px-4 border-radius-2 h-100 mb-3">
          <h6 className="text-bold2 mb-12px">{t("payment:overview-5")}</h6>
          <div className="flex-box flex-wrap">
            <div className="px-3 mb-4">
              <Card
                onClick={() => setInfoModal(true)}
                className="center-box flex-column cursor-pointer bank-empty"
              >
                <h4 className="mb-3 text-grey text-center">+</h4>
                <p className="text-grey mb-0 text-center">
                  {t("payment:overview-5")}
                </p>
              </Card>
            </div>

            {bankList.map((bank,index) => (
              <BankCard setBankModal={setBankModal} bank={bank} key={index}/>
            ))}
          </div>
        </div>
      )}
      <Modal
        contentClassName="banking-modal card-style p-0"
        centered={true}
        isOpen={infoModal}
      >
        <InfoModal
          info={info}
          setInfo={setInfo}
          setInfoModal={setInfoModal}
          setOtpModal={setOtpModal}
        />
      </Modal>

      <Modal
        contentClassName="banking-modal card-style p-0"
        centered={true}
        isOpen={otpModal}
      >
        <OtpModal setOtpModal={setOtpModal} phone_number={info.phone} />
      </Modal>

      <Modal
        contentClassName="card-style p-0"
        centered={true}
        isOpen={bankModal.isOpen}
      >
        <BankModal setDefault={setDefault} modal={bankModal} setModal={setBankModal} />
      </Modal>
    </>
  );
}
