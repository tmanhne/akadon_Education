import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { useTranslation, Trans } from "react-i18next";
import moment from "moment";

import "./index.scss";
import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import { bidContract, getRequestDetail } from "../../../api";
import ErrorHandler from "../../ErrorHandler";
import Goback from "../../utils/Goback";
import StepRequest from "../../utils/StepRequest";
import SubLoader from "../../utils/SubLoader";
import InputFeeTime from "./InputFeeTime";
import InputPurpose from "./InputPurpose";
import Cancle from "./Popup/Cancle";
import SuccessSend from "./Popup/SuccessSend";
import ShowFeeTime from "./ShowFeeTime";
import ShowPurpose from "./ShowPurpose";
import Request from "./Request";
import useFetch from "../../customHooks/useFetch";

const SuggestionsTutor = ({ match }) => {
  const { t } = useTranslation(["toast", "suggest"]);
  const { requestId } = match.params;
  const history = useHistory();

  const initRange = {
    id: uuidv4(),
    start_time: "",
    end_time: "",
    day_in_week: [],
  };

  // LOCAL STATE DECLARATIONS
  const [request, setRequest] = useState({});
  const [requestContent, setRequestContent] = useState({});
  const [suggestRange, setSuggestRange] = useState([initRange]);
  const [date, setDate] = useState([]);
  const [isStep1Done, setIsStep1Done] = useState(false);
  const [isStep2Done, setIsStep2Done] = useState(false);
  const [akadonPolicy, setAkadonPolicy] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState([]);

  // state for sendbutton
  const [cancle, setCancle] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  const fetchedRequest = useFetch(
    getRequestDetail,
    setLoading,
    false,
    requestId
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (fetchedRequest) {
      const {
        is_pre_study,
        created_datetime,
        request_header,
        subject_name,
        subject_level,
        offline_flag,
        fee,
        lesson_time_length,
        student_info,
        student_propose,
        city,
        district,
      } = fetchedRequest;

      const end_date = fetchedRequest.end_date
        ? moment(fetchedRequest.end_date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : "";
      const free_time = fetchedRequest.free_time || [];
      const initSuggestRange = free_time.map((time) => ({
        ...time,
        end_time: moment("1970-01-01 " + time.end_time).toDate(),
        start_time: moment("1970-01-01 " + time.start_time).toDate(),
        id: uuidv4(),
      }));

      setSuggestRange(initSuggestRange);

      setRequestContent({
        fee,
        number_lesson: 0,
        contract_type: 0,
        lesson_time_length,
        start_date: "",
        end_date,
        contract_plan: "",
        goal: "",
      });

      setRequest({
        is_pre_study,
        created_datetime,
        request_header,
        subject_name,
        subject_level,
        offline_flag,
        fee,
        lesson_time_length,
        free_time: free_time || [],
        end_date,
        student_info,
        student_propose,
        city,
        district,
      });
    }
  }, [fetchedRequest]);

  // FUNCTION DECLARATIONS
  const teachRequest = async (e) => {
    e.preventDefault();
    if (!akadonPolicy) {
      setError("akadonPolicy");
      return;
    }

    setError("");
    // Api call
    const pre_study_time = date.map((d) => {
      return {
        ...d,
        date: d.date,
      };
    });

    const free_time = suggestRange.map((range) => ({
      start_time: moment(range.start_time).format("HH:mm"),
      end_time: moment(range.end_time).format("HH:mm"),
      day_in_week: range.day_in_week,
    }));

    const payload = {
      lesson_time_length: requestContent.lesson_time_length,
      fee: requestContent.fee,
      number_lesson: requestContent.number_lesson,
      course_type: requestContent.contract_type,
      goal: requestContent.goal,
      contract_plan: requestContent.contract_plan,
      free_time,
      start_date: moment(requestContent.start_date).format("DD/MM/YYYY"),
      end_date: moment(requestContent.end_date).format("DD/MM/YYYY"),
      contract_id: requestId,
      pre_study_time,
      offline_flag: requestContent.offline_flag === "offline" ? 1 : 0,
    };

    // Implement Api call response
    setLoading(["Loading"]);
    const res = await bidContract(payload);
    setLoading([]);

    setAkadonPolicy(false);

    if (res.status < 400) {
      setDetailModal(true);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`, {
        autoClose: true,
      });
    }
  };

  return (
    <div className="master">
      <div className="mb-3">
        <StepRequest step={2} />
      </div>

      <Goback />

      {loading && loading.length > 0 ? (
        <SubLoader />
      ) : (
        <div className="teach-request flex-box align-items-stretch">
          <Form
            className="teach-request__form flex-grow mb-3"
            onSubmit={teachRequest}
          >
            <div className="flex-box mb-12px justify-content-start">
              <h4 className="text-bold2">{t("suggest:sug_1")}</h4>
              <img
                className="mb-3 ml-1 cursor-pointer"
                src={ExclamationIcon}
                alt="note"
              />
            </div>

            {!isStep1Done ? (
              <InputFeeTime
                requestContent={requestContent}
                setRequestContent={setRequestContent}
                date={date}
                setDate={setDate}
                suggestRange={suggestRange}
                setSuggestRange={setSuggestRange}
                end_date={request.end_date}
                is_pre_study={request.is_pre_study}
                setIsStep1Done={setIsStep1Done}
              />
            ) : (
              <ShowFeeTime
                requestContent={requestContent}
                suggestRange={suggestRange}
                date={date}
                is_pre_study={request.is_pre_study}
                setIsStep1Done={setIsStep1Done}
              />
            )}

            {!isStep2Done ? (
              <InputPurpose
                requestContent={requestContent}
                setRequestContent={setRequestContent}
                setIsStep2Done={setIsStep2Done}
                isStep1Done={isStep1Done}
              />
            ) : (
              <>
                <ShowPurpose
                  requestContent={requestContent}
                  setIsStep2Done={setIsStep2Done}
                />

                <FormGroup className="flex-box my-3 ml-3">
                  <Input
                    className="hv-boder cursor-pointer"
                    type="checkbox"
                    id="akadonPolicy"
                    value={akadonPolicy}
                    onClick={() => setAkadonPolicy(!akadonPolicy)}
                  />
                  <Label for="akadonPolicy" className="text-bold1 mb-0">
                    <Trans
                      i18nKey="suggest:sug_2"
                      components={{
                        p: (
                          <Link
                            to="/terms-of-service"
                            target="_blank"
                            className="text-bold2 text-dark"
                            style={{
                              textDecoration: "underline",
                            }}
                          />
                        ),
                      }}
                    />

                    {error === "akadonPolicy" && (
                      <p className="mb-0">
                        <ErrorHandler error={t("suggest:sug_23")} />
                      </p>
                    )}
                  </Label>
                </FormGroup>

                <div className="flex-box  justify-content-center">
                  <div
                    onClick={() => setCancle(!cancle)}
                    className="cancel-btn mr-3 px-5"
                  >
                   {t("suggest:sug_15")}
                  </div>
                  <button type="submit" className="main-btn sw">
                  {t("suggest:sug_16")}
                  </button>
                </div>
              </>
            )}
          </Form>
          <div className="teach-request__sidebar card-style border-radius-2 mb-3 ml-3 ">
            <Request request={request} suggestRange={suggestRange} />
          </div>
        </div>
      )}

      {detailModal === true && (
        <SuccessSend
          history={history}
          detailModal={detailModal}
          setDetailModal={setDetailModal}
        />
      )}
      {cancle && <Cancle cancle={cancle} setCancle={setCancle} />}
    </div>
  );
};
const mapStateToProps = ({ user }) => {
  const tutorData = user.info;
  const { userType } = user.info;
  return { tutorData, userType };
};

export default connect(mapStateToProps, null)(SuggestionsTutor);
