import React, { useState } from "react";
import {
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Proptypes from "prop-types";

import { teachRequestSchema } from "../../../validator";
import { bidContract } from "../../../api";
import CustomDayPickerInput from "../../utils/CustomDayPickerInput";
import ErrorHandler from "../../ErrorHandler";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const RequestForm = ({
  teachModal,
  setTeachModal,
  setDetailModal,
  requestId
}) => {

  const { t } = useTranslation("toast");
  const initRequestContent = {
    courseType: 0,
    lessionLength: "",
    fee: "",
    teachMethod: "offline",
    akadonCalendar: false,
    teachSchedule: "",
  };
  const [requestContent, setRequestContent] = useState(initRequestContent);
  const [error, setError] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const teactRequest = async (e) => {
    // 1. PREVENT NATIVE DEFAULT
    e.preventDefault();
    // 2. JOI VALIDATE USER INPUT AND SET ERROR
    const validTeachRequest = teachRequestSchema.validate(requestContent);
    if (validTeachRequest.error) {
      setError(validTeachRequest.error.details[0].path[0]);
      return true;
    }
    // 3. RESET ERROR
    setError("");
    // 4. INIT API PAYLOAD AND CALL API
    const lessonsDate = validTeachRequest.value.akadonCalendar
      ? selectedDays.map((date) => ({ lesson_date: date }))
      : [];
    const contract = {
      contract_plan: validTeachRequest.value.teachSchedule,
      number_lesson: validTeachRequest.value.lessionLength,
      contract_id: requestId,
      offline_flag: validTeachRequest.value.teachMethod === "offline" ? 1 : 0,
      course_type: validTeachRequest.value.courseType,
      fee: validTeachRequest.value.fee,
      lessons_date: lessonsDate,
    };
    const res = await bidContract(contract);
    // 5. CATCH API CALL RESULT
    if (res.status < 400) {
      toast.success("Gửi đề nghị dạy thành công !");
      setDetailModal(false);
      setTeachModal(false);
    } else if (res.response) {
      toast.error(
        ` ${t("toast:er_28")}  ${res.response.status}`,
        { autoClose: false }
      );
    }
  };
  return (
    <Modal isOpen={teachModal} className="request-form-modal card-style">
      <div className="flex-box request-form-modal__header">
        <h4 className="text-bold-1 text-center">Đơn đề nghị dạy</h4>
        <FontAwesomeIcon
          className="text-grey h4"
          onClick={() => setTeachModal(false)}
          icon={["fal", "times"]}
        />
      </div>
      <Form
        onSubmit={(e) => teactRequest(e)}
        className="request-form-modal__content"
      >
        <FormGroup tag="fieldset">
          <legend className="h6 text-bold2">Gói buổi học</legend>
          <div className="flex-box">
            <FormGroup check>
              <Label check>
                <Input
                  value={0}
                  type="radio"
                  name="course-type"
                  defaultChecked
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      courseType: e.target.value,
                    })
                  }
                />
                Trọn gói
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  value={1}
                  type="radio"
                  name="course-type"
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      courseType: e.target.value,
                    })
                  }
                />
                Theo tuần
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  value={2}
                  type="radio"
                  name="course-type"
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      courseType: e.target.value,
                    })
                  }
                />
                Theo tháng
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <div className="flex-box">
          <FormGroup className="mb-3 mr-3">
            <Label className="h6 font-weight-bold" for="lession-length">
              Số buổi học <span className="text-danger">*</span>
              {error === "lessionLength" && (
                <ErrorHandler error="(Không hợp lệ)" />
              )}
            </Label>
            <InputGroup>
              <Input
                type="number"
                min={0}
                className="border-right-0"
                id="lession-length"
                value={requestContent.lessionLength}
                onChange={(e) =>
                  setRequestContent({
                    ...requestContent,
                    lessionLength: e.target.value,
                  })
                }
              />
              <InputGroupAddon className="text-small" addonType="prepend">
                buổi
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup className="mb-3">
            <Label className="h6 font-weight-bold" for="fee">
              Chi phí <span className="text-danger">*</span>
              {error === "fee" && <ErrorHandler error="(Không hợp lệ)" />}
            </Label>
            <InputGroup>
              <Input
                id="fee"
                type="number"
                min={0}
                className="border-right-0"
                value={requestContent.fee}
                onChange={(e) =>
                  setRequestContent({ ...requestContent, fee: e.target.value })
                }
              />
              <InputGroupAddon addonType="prepend">VNĐ/buổi</InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </div>
        <FormGroup tag="fieldset">
          <legend className="h6 text-bold2">Hình thức</legend>
          <div className="flex-box">
            <FormGroup check>
              <Label check>
                <Input
                  value="online"
                  type="radio"
                  name="teach-method"
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      teachMethod: e.target.value,
                    })
                  }
                />{" "}
                Online
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  value="offline"
                  type="radio"
                  name="teach-method"
                  defaultChecked
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      teachMethod: e.target.value,
                    })
                  }
                />
                Offline
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend className="h6 text-bold2">Sử dụng lịch của AKADON</legend>
          <div className="flex-box">
            <FormGroup check>
              <Label check>
                <Input
                  value={true}
                  type="radio"
                  name="akadon-calendar"
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      akadonCalendar: e.target.value,
                    })
                  }
                />
                Có
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  value={false}
                  type="radio"
                  name="akadon-calendar"
                  defaultChecked
                  onClick={(e) =>
                    setRequestContent({
                      ...requestContent,
                      akadonCalendar: e.target.value,
                    })
                  }
                />
                Không
              </Label>
            </FormGroup>
          </div>
        </FormGroup>
        {requestContent.akadonCalendar === "true" && (
          <CustomDayPickerInput
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        )}
        <FormGroup>
          <Label className="h6 text-bold2" for="teach-schedule">
            Kế hoạch giảng dạy <span className="text-danger">*</span>
            {error === "teachSchedule" && (
              <ErrorHandler error="(Không hợp lệ)" />
            )}
          </Label>
          <Input
            type="textarea"
            id="teach-schedule"
            value={requestContent.teachSchedule}
            onChange={(e) =>
              setRequestContent({
                ...requestContent,
                teachSchedule: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup className="flex-box cta-box">
          <Button
            onClick={() => setTeachModal(false)}
            className="main-btn mr-3 text-dark font-weight-bold cancle"
          >
            Huỷ
          </Button>
          <Button type="submit" className="main-btn font-weight-bold">
            Gửi
          </Button>
        </FormGroup>
      </Form>
    </Modal>
  );
};

RequestForm.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  requestContent: Proptypes.object,
  setRequestContent: Proptypes.func,
  teactRequest: Proptypes.func,
  error: Proptypes.string,
  selectedDays: Proptypes.array,
  setSelectedDays: Proptypes.func,
};

export default RequestForm;
