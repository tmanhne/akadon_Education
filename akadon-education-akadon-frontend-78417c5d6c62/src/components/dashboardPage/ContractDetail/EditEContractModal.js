import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import moment from "moment";

import { editBidContract, editCourse, historyEcontract } from "../../../api";
import DateClickCalendar from "../../utils/DateClickCalendar";
import { dateFormatForServer } from "../../../module";
import ErrorHandler from "../../ErrorHandler";
import YouSureModel from "./YouSureModel";
import SendChangeDoneModel from "./SendChangeDoneModel";
import SubLoader from "../../utils/SubLoader";
import { useTranslation } from "react-i18next";

const EditEContractModal = ({
  modal,
  setModal,
  bid,
  student_propose,
  is_course,
  request_id,
  setChangeList,
  listChange,
}) => {
  const { t } = useTranslation("toast");
  // state for model
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  // INIT STATE
  const initContract = {
    fee: listChange.fee ? listChange.fee : bid.fee,
    number_lesson: listChange.number_lesson
      ? listChange.number_lesson
      : bid
      ? bid.number_lesson
      : "",
    course_type: bid ? bid.course_type : 0,
    lesson_time_length: listChange.lesson_time_length
      ? listChange.lesson_time_length
      : bid
      ? bid.lesson_time_length
      : "",
    start_date: moment(bid.start_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
    end_date: moment(bid.end_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
    student_info: bid ? bid.student_info : "",
    student_propose: student_propose,
  };

  // LOCAL STATE DECLARATIONS
  const [date, setDate] = useState([]);
  const [contract, setContract] = useState({});
  const [error, setError] = useState({ path: "", message: "" });

  // SIDE EFFECTS
  useEffect(() => {
    setContract({ ...initContract, student_propose });

    const { schedule } = bid;

    const initDate = schedule || [];

    setDate(initDate);
  }, [bid, student_propose]);

  // FUNCTION DECLARATIONS
  const HandleDone = () => {
    setDone(!done);
    setModal(!modal);
  };

  const HandleConfirm = (e) => {
    e.preventDefault();

    // 1.CHECK WHETHER CONTRACT CHANGE
    const isEContractChange =
      JSON.stringify(initContract) === JSON.stringify(contract);

    const isScheduleChange =
      JSON.stringify(bid.schedule || []) === JSON.stringify(date);

    if (isEContractChange && isScheduleChange) {
      setError({ path: "edit-econtract", message: "Bạn chưa nhập thay đổi !" });
      return;
    }

    // 2. CHECK WHETHER INVALID TIME EXIST
    let invalidTime = false;
    date.map((d) => {
      if (d.start_time === "" || d.end_time === "") {
        invalidTime = true;
      }
    });

    if (invalidTime) {
      setError({ path: "date-time", message: "Thời gian học không hợp lệ !" });
      return;
    }

    // 3. CHECK WHETHER SCHEDULE LENGTH AND NUMBER_LESSON IS MATCHED
    if (date.length !== contract.number_lesson * 1) {
      setError({
        path: "lesson-length",
        message: "Số buổi học không khớp lịch học !",
      });
      return;
    }

    // 4. CHECK IS VALID START_DATE AND END_DATE
    const startDate = moment(contract.start_date);
    const endDate = moment(contract.end_date);
    const currentDate = moment();
    const isValidMilisecond =
      startDate < endDate && currentDate < startDate && currentDate < endDate;

    if (!isValidMilisecond) {
      setError({
        path: "start-date",
        message: "Ngày bắt đầu không hợp lệ !",
      });
      return;
    }
    setConfirm(!confirm);
  };

  const handleEditEContract = async (e) => {
    e.preventDefault();
    setConfirm(false);
    setLoading(true);
    // FORMAT END_TIME, START_TIME TO DD/MM/YYY
    const startDate = dateFormatForServer(contract.start_date);
    const endDate = dateFormatForServer(contract.end_date);

    const payload = {
      ...contract,
      start_date: startDate,
      end_date: endDate,
      schedule: date,
      bid_contract_id: bid.id,
    };

    // 5. MAKE CALL API
    let res;
    if (is_course) {
      res = await editCourse(payload);
    } else {
      res = await editBidContract(payload);
    }

    // 6. CHECK API CALL RESULT
    if (res.status < 400) {
      setDone(true);
      if (request_id) {
        const payload = { contract_id: request_id };
        const res = await historyEcontract(payload);
        if (res.status < 400) {
          setChangeList(res.data.request_change_bid);
        } else if (res.response) {
          toast.error(` ${t("toast:er_16")} ${res.response.status}`);
        }
      }
    } else if (res.response) {
      toast.error(` ${t("toast:er_17")}`, {
        autoClose: false,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SubLoader />
      ) : (
        <>
          <div className="flex-box align-items-start mb-3 px-0 py-3 border-bottom">
            <h4 className="text-bold1 text-center flex-grow mb-0">
              Thay đổi E-contract
              {error.path === "edit-econtract" && (
                <p className="font-weight-normal text-small font-italic text-center mb-0">
                  <ErrorHandler error={error.message} />
                </p>
              )}
            </h4>
            <FontAwesomeIcon
              onClick={() => setModal(!modal)}
              className="text-grey mr-3 h4 mb-0"
              icon={["fal", "times"]}
            />
          </div>

          <Form className="card-style py-0 px-3">
            <div className="flex-box">
              <FormGroup className="mr-3 width-300px">
                <Label className="mb-12px text-bold2 cursor-pointer" for="fee">
                  Chi phí <span className="text-danger">*</span>
                </Label>
                <InputGroup>
                  <Input
                    value={contract.fee}
                    onChange={(e) =>
                      setContract({ ...contract, fee: e.target.value })
                    }
                    id="fee"
                    type="number"
                    min={0}
                    className="border-right-0"
                  />
                  <InputGroupAddon className="border-left-0" addonType="append">
                    VNĐ/buổi
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <FormGroup className="mr-3">
                <Label
                  className="mb-12px text-bold2 cursor-pointer"
                  for="numberLesson"
                >
                  Độ dài khoá học
                </Label>
                <InputGroup>
                  <Input
                    className="border-radius-2 mr-2"
                    id="numberLesson"
                    type="number"
                    min={0}
                    value={contract.number_lesson}
                    onChange={(e) =>
                      setContract({
                        ...contract,
                        number_lesson: e.target.value,
                      })
                    }
                  />
                  <Input
                    className="border-radius-2"
                    type="select"
                    value={contract.course_type}
                    onChange={(e) =>
                      setContract({ ...contract, course_type: e.target.value })
                    }
                  >
                    <option value={0}>Buổi</option>
                    <option value={1}>Tuần</option>
                    <option value={2}>Tháng</option>
                    <option value={3}>Năm</option>
                  </Input>
                </InputGroup>
              </FormGroup>

              <FormGroup className="mr-3">
                <Label
                  className="mb-12px text-bold2 cursor-pointer"
                  for="lessonLength"
                >
                  Thời lượng 1 buổi học
                </Label>
                <InputGroup>
                  <Input
                    id="lessonLength"
                    type="number"
                    className="border-right-0"
                    min={0}
                    value={contract.lesson_time_length}
                    onChange={(e) =>
                      setContract({
                        ...contract,
                        lesson_time_length: e.target.value,
                      })
                    }
                  />
                  <InputGroupAddon className="border-left-0" addonType="append">
                    Tiếng
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>

            <div className="flex-box">
              <FormGroup className="mr-3 width-300px">
                <Label
                  className="mb-12px text-bold2 cursor-pointer"
                  for="expected-start-date"
                >
                  Ngày bắt đầu dự kiến
                  {error.path === "start-date" && (
                    <span className="ml-2">
                      <ErrorHandler error={error.message} />
                    </span>
                  )}
                </Label>
                <Input
                  id="expected-start-date"
                  type="date"
                  className="border-radius-2"
                  value={contract.start_date}
                  onChange={(e) =>
                    setContract({ ...contract, start_date: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="mr-3 width-300px">
                <Label
                  className="mb-12px text-bold2 cursor-pointer"
                  for="expected-end-date"
                >
                  Ngày kết thúc dự kiến
                </Label>
                <Input
                  id="expected-end-date"
                  type="date"
                  className="border-radius-2"
                  value={contract.end_date}
                  onChange={(e) =>
                    setContract({ ...contract, end_date: e.target.value })
                  }
                />
              </FormGroup>
            </div>

            <FormGroup className="mb-3">
              <Label className="mb-12px text-bold2">
                Lịch học dự kiến
                {error.path === "lesson-length" && (
                  <span className="ml-2">
                    <ErrorHandler error={error.message} />
                  </span>
                )}
                {error.path === "date-time" && (
                  <span className="ml-2">
                    <ErrorHandler error={error.message} />
                  </span>
                )}
              </Label>
              <DateClickCalendar
                date={date}
                setDate={setDate}
                startDate={contract.start_date}
                endDate={contract.end_date}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label
                className="mb-12px text-bold2 cursor-pointer"
                for="student-info"
              >
                Thông tin về học sinh <span className="text-danger">*</span>
              </Label>
              <Input
                id="student-info"
                className="border-radius-2"
                type="textarea"
                rows={3}
                value={contract.student_info}
                onChange={(e) =>
                  setContract({ ...contract, student_info: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Label
                className="mb-12px text-bold2 cursor-pointer"
                for="expected"
              >
                Mong muốn của học sinh với gia sư
              </Label>
              <Input
                id="expected"
                className="border-radius-2"
                type="textarea"
                rows={3}
                value={contract.student_propose}
                onChange={(e) =>
                  setContract({ ...contract, student_propose: e.target.value })
                }
              />
            </FormGroup>

            <div className="center-box mb-3">
              <div
                onClick={() => setModal(false)}
                style={{ width: "10rem", background: "#E5E5E5" }}
                className="cancel-btn mr-3 text-bold2"
              >
                Huỷ
              </div>
              <div
                onClick={HandleConfirm}
                type="submit"
                style={{ width: "10rem" }}
                className="main-btn"
              >
                Gửi
              </div>
            </div>
          </Form>
        </>
      )}

      {confirm === true && (
        <YouSureModel
          confirm={confirm}
          setConfirm={setConfirm}
          HandleEditEContract={handleEditEContract}
        />
      )}

      {done === true && (
        <SendChangeDoneModel
          done={done}
          setDone={setDone}
          HandleDone={HandleDone}
        />
      )}
    </>
  );
};

EditEContractModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  bid: PropTypes.object,
};

export default EditEContractModal;
