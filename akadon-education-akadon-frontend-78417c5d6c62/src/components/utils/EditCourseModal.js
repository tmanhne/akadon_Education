import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { editCourse, getCourseDetail } from "../../api";
import FormatDate from "../utils/FormatDate";
import ErrorHandler from "../ErrorHandler";
import CustomDayPickerInput from "./CustomDayPickerInput";
import { useTranslation, Trans } from "react-i18next";

const EditCourseModal = ({ editCourseModal, setEditCourseModal, courseId }) => {
  const { t } = useTranslation("toast");
  const [editContent, setEditContent] = useState({
    fee: "",
    lessonLength: "",
    isAkadonCalendar: true,
    discript: "",
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // REPEAT CALL API, BECAUSE IS USE IN ANOTHER PLACES, WHERE CAN NOT PASS PROPS
    // INIT CURRENT DATA TO EDIT
    (async () => {
      const res = await getCourseDetail(courseId);
      if (res.status < 400) {
        const course = res.data;
        let nextLesson = course.lessons
          .filter((lesson) => lesson.status === 0)
          .map((lesson) => lesson.lesson_date.split("-").reverse().join("/"));
        nextLesson = [...new Set(nextLesson)];
        const initEditContent = {
          fee: course.fee,
          lessonLength: course.lessons.filter((lesson) => lesson.status === 0)
            .length,
        };
        setEditContent({ ...editContent, ...initEditContent });
        setSelectedDays(nextLesson);
      }
    })();
  }, []);

  const handleEditCourse = async (e) => {
    e.preventDefault();
    const updateInfo = {
      contract_id: courseId,
      lesson_count: editContent.lessonLength * 1,
      fee: editContent.fee,
      lesson_datetime: selectedDays[0],
    };
    const res = await editCourse({ ...updateInfo });
    if (res.status < 400) {
      toast.success(t("toast:sucess_12"));
      setEditCourseModal(false);
    } else {
      toast.error(t("toast:er_47"), { autoClose: false });
    }
  };
  return (
    <Modal
      className="edit-course-modal flex-box"
      isOpen={editCourseModal.editCourseModal}
    >
      <Form className="p-4" onSubmit={handleEditCourse}>
        <FontAwesomeIcon
          onClick={() =>
            setEditCourseModal({ ...editCourseModal, editCourseModal: false })
          }
          className="close-model-icon text-grey"
          icon={["fal", "times"]}
        />
        <h4 className="text-center text-bold2">Thay đổi E-contract</h4>
        <p className="text-center">
          {editCourseModal && <FormatDate date={editCourseModal.lessonDate} />}
        </p>
        {error && (
          <div className="text-center">
            <ErrorHandler error={error} />
          </div>
        )}
        <div className="flex-box" style={{ justifyContent: "space-between" }}>
          <FormGroup>
            <Label
              style={{ cursor: "pointer" }}
              className="text-grey"
              for="price"
            >
              Chi phí 1 buổi học
            </Label>
            <Input
              type="number"
              onChange={(e) =>
                setEditContent({ ...editContent, fee: e.target.value })
              }
              value={editContent.fee}
              id="price"
              min={0}
            />
          </FormGroup>
          <FormGroup>
            <Label
              style={{ cursor: "pointer" }}
              className="text-grey"
              for="lessonLength"
            >
              Số lượng buổi học
            </Label>
            <Input
              type="number"
              value={editContent.lessonLength}
              id="lessonLength"
              min={0}
              onChange={(e) =>
                setEditContent({ ...editContent, lessonLength: e.target.value })
              }
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Label
            style={{ cursor: "pointer" }}
            className="text-grey"
            for="nextClass"
          >
            Lịch học tiếp theo
          </Label>
          <CustomDayPickerInput
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </FormGroup>
        <FormGroup>
          <Label
            style={{ cursor: "pointer" }}
            className="text-grey"
            for="akadonCalendar"
          >
            Đăng ký sử dụng lịch
          </Label>
          <Input
            type="select"
            id="akadonCalendar"
            value={editContent.isAkadonCalendar}
            onChange={(e) =>
              setEditContent({
                ...editContent,
                isAkadonCalendar: e.target.value,
              })
            }
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label style={{ cursor: "pointer" }} className="text-grey" for="note">
            Chi tiết
          </Label>
          <Input
            type="textarea"
            value={editContent.discript}
            id="note"
            onChange={(e) =>
              setEditContent({ ...editContent, discript: e.target.value })
            }
          />
        </FormGroup>
        <ModalFooter
          className="border-top-0"
          style={{ justifyContent: "center" }}
        >
          <Button
            onClick={() =>
              setEditCourseModal({ ...editCourseModal, editCourseModal: false })
            }
            className="btn main-btn text-bold2 cancel-btn text-dark"
          >
            Huỷ
          </Button>
          <Button className="main-btn text-bold2 text-light" type="submit">
            Gửi
          </Button>{" "}
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditCourseModal;
