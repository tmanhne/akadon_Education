import Joi from "@hapi/joi";

const courseReviewSchema = Joi.object({
  courseId: Joi.number().integer().required(),
  isContentExpected: Joi.number().min(1).max(2).required(),
  commentText: Joi.string().required(),
  feedbackText: Joi.string().required(),
  satisfy: Joi.number().min(0).max(5).required(),
});

const lessonReviewSchema = Joi.object({
  isLessonComplete: Joi.number().integer().required(),
  isTutorOnTime: Joi.number().integer().required(),
  satisfy: Joi.number().integer().required(),
  isContentExpected: Joi.number().integer().required(),
  speed: Joi.number().integer().required(),
  star: Joi.number().integer().required(),
  reviewText: Joi.string().min(25),
});

// LONG BỎ REQUIRE DESCRIBE TUTOR KHONG CÓ DES NEN KHONG GỬI THAY ĐỔI ĐC
const userProfileSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.alternatives(
    Joi.string(),
    Joi.object().required()
  ),
  email: Joi.string().required(),
  describe: Joi.string(),
  gender: Joi.number(),
});

const studentRequestShema = Joi.object({
  requestHeader: Joi.string().required(),
  subjectName: Joi.string().required(),
  subjectLevel: Joi.string().required(),
  fee: Joi.number().required(),
  numberLesson: Joi.number().required(),
  lessonUnit: Joi.number().required(),
  lessonTimeLength: Joi.number().required(),
  offlineFlag: Joi.bool().required(),
  city: Joi.string().allow(""),
  dis: Joi.string().allow(""),
  studentInfo: Joi.string().required(),
  studentWan: Joi.string().required(),
  commitPolAkadon: Joi.bool().default(true).required(),
});

const questionSchema = Joi.object({
  name: Joi.string().required(),
  mobileNumber: Joi.number().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  question: Joi.string().required(),
});

const loginInfoSchemas = Joi.object({
  role: Joi.number().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const studentInfoSchema = Joi.object({
  studentName: Joi.string().required(),
  studentEmail: Joi.string().email({ tlds: { allow: false } }),
  studentPassword: Joi.string().alphanum().required(),
  studentRepeatPassword: Joi.ref("studentPassword"),
  studentRole: Joi.number().required(),
});

const tutorInfoSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  dateOfBirth: Joi.date().required(),
  phone: Joi.string().required(),
  dis: Joi.string().required(),
  city: Joi.string().required(),
  gender: Joi.number().required(),
  legalcy: Joi.number().required(),
  password: Joi.string().alphanum().required(),
  repeatPassword: Joi.ref("password"),
});

const teachRequestSchema = Joi.object({
  fee: Joi.number().required(),
  number_lesson: Joi.number().required(),
  contract_type: Joi.number().required(),
  lesson_time_length: Joi.number().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  plan: Joi.string().required(),
  purpose: Joi.string().required(),
  commitPolAkadon: Joi.bool().default(true).required(),
  offline_flag: Joi.bool().required(),
});

const bankInfoSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  id_number: Joi.number().required(),
  card_name: Joi.string().required(),
  bank_name: Joi.string().required(),
  bank_number: Joi.string().required(),
  isDefault: Joi.bool().required(),
});

const emailAndPasswordSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}$/)
    .required(),
  repeatPassword: Joi.ref("password"),
});

const phoneAndPasswordSchema = Joi.object({
  phone_number: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}$/)
    .required(),
  repeatPassword: Joi.ref("password"),
});

export {
  questionSchema,
  loginInfoSchemas,
  studentInfoSchema,
  tutorInfoSchema,
  studentRequestShema,
  teachRequestSchema,
  userProfileSchema,
  lessonReviewSchema,
  courseReviewSchema,
  bankInfoSchema,
  phoneAndPasswordSchema,
  emailAndPasswordSchema,
};
