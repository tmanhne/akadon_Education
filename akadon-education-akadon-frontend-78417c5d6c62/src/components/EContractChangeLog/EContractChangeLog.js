import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getBidChange,
  getBidDetail,
  getRequestDetail,
  historyEcontract,
} from "../../api";
import Goback from "../utils/Goback";
import CurrentEContract from "./CurrentEContract";
import EContractLog from "./EContractLog";
import "./index.scss";
import UserBox from "./UserBox";
import { useTranslation } from "react-i18next";

const EContractChangeLog = ({ match, userType }) => {
  const { t } = useTranslation("toast");
  // PROPS EXTRACT
  const { contractId, eContractId } = match.params;
  // INIT LOCAL STATES
  const initEcontract = {
    studentInfo: "",
    studentpropose: "",
    schedule: [],
    teachPlan: "",
    lessonTimeLength: "",
    lessonLength: "",
    fee: 0,
    latestUpdate: "",
    history: [],
  };
  const initContract = {
    id: "",
    subjectName: "",
    level: "",
    offlineFlag: false,
    city: "",
    dis: "",
    startDate: "",
    finishDate: "",
    student: {
      avatar: "",
      name: "",
      rating: 3,
    },
    tutor: {
      avatar: "",
      name: "",
      rating: 3,
      describe: "",
      specilize: [],
    },
  };
  // LOCAL STATE DECLARATIONS
  const [econtract, setEcontract] = useState(initEcontract);
  const [contract, setContract] = useState(initContract);
  const [firstEContract, setFirstEContract] = useState({});

  const [changeList, setChangeList] = useState([]);
  // SIDE EFFECTS
  // call api
  useEffect(() => {
    (async () => {
      if (contract.id) {
        const payload = { contract_id: contract.id };
        const res = await historyEcontract(payload);
        if (res.status < 400) {
          setChangeList(res.data.request_change_bid);
        } else if (res.response) {
          toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
        }
      }
    })();
  }, [contract.id]);
  const a = changeList.length - 1;
  const eContractChangeId = changeList[a]?.id;

  // 1. Contract (for more info)
  useEffect(() => {
    (async () => {
      const res = await getRequestDetail(contractId);
      if (res.status < 400) {
        const rawData = { ...res.data };

        const lessons = rawData.lessons || [];
        const lastLesson = lessons[lessons.length - 1];
        const finishDate = lastLesson ? lastLesson.lesson_date : "";

        const student = rawData.student
          ? {
              avatar: rawData.student.avatar,
              name: rawData.student.name,
              rating: rawData.student.rating,
            }
          : {};

        const tutor = rawData.tutor
          ? {
              avatar: rawData.tutor.avatar,
              name: rawData.tutor.name,
              rating: rawData.tutor.rating,
              describe: rawData.tutor.describe,
              specilize: rawData.tutor.specialize,
            }
          : {};

        const updateEcontract = {
          id: rawData.id,
          subjectName: rawData.subject_name,
          level: rawData.subject_level,
          offlineFlag: rawData.offline_flag,
          city: rawData.city,
          dis: rawData.district,
          startDate: rawData.first_lesson_date,
          finishDate: finishDate,
          student: student,
          tutor: tutor,
        };

        setContract(updateEcontract);
      }
    })();
  }, [contractId]);
  // 2. First bid
  useEffect(() => {
    (async () => {
      if (econtract.history.length !== 0) {
        return true;
      }
      const res = await getBidDetail(eContractId);
      if (res.status < 400) {
        setFirstEContract({ ...res.data });
      } else if (res.response) {
        toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
      }
    })();
  }, [eContractId]);
  // 3. Bid contract change

  useEffect(() => {
    (async () => {
      if (eContractChangeId) {
        const res = await getBidChange(eContractChangeId);
        if (res.status < 400) {
          const rawData = { ...res.data };
          const updateEcontract = {
            studentInfo: rawData.student_info,
            studentpropose: rawData.student_propose,
            schedule: [],
            teachPlan: rawData.contract_plan,
            lessonTimeLength: rawData.lesson_time_length,
            lessonLength: rawData.number_lesson,
            fee: rawData.fee,
            latestUpdate: rawData.created_datetime,
            history: rawData.history || [],
          };
          setEcontract({ ...updateEcontract });
        } else if (res.response) {
          toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
        }
      }
    })();
  }, [eContractChangeId]);
  // EXTRACT DATA AFTER CALL API
  const listChange =
    econtract.history.length === 0
      ? [{ ...firstEContract }]
      : [...econtract.history];
  return (
    <>
      <Goback />
      <div className="e-contract-change-log flex-box align-items-stretch">
        <div className="e-contract-change-log__current card-style border-radius-2 mr-3 mb-3">
          <UserBox
            tutor={contract.tutor}
            student={contract.student}
            latestUpdate={econtract.latestUpdate}
          />
          <CurrentEContract
            contract={contract}
            econtract={econtract}
            userType={userType}
            econtractId={eContractId}
            contractId={contractId}
            firstEContract={firstEContract}
            eContractChangeId={eContractChangeId}
          />
        </div>
        <EContractLog listChange={listChange} changeList={changeList} />
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

EContractChangeLog.propTypes = {
  userType: PropTypes.string,
  match: PropTypes.object,
};

export default connect(mapStateToProps, null)(EContractChangeLog);
