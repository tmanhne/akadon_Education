import axios from "axios";
import { store } from "./redux";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "https://testapi.akadon.edu.vn";
axios.defaults.timeout = 0;

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// AXIOS INTERCEPTORS CONFIG
// 12331231
axios.interceptors.request.use((req) => {
  const { url } = req;
  const rootUrl = url.split("?")[0];

  if (rootUrl === "/api/auth/login/") {
    store.dispatch({ type: "LOADING_REQUEST", url });
  }
  return req;
});

axios.interceptors.response.use(
  (res) => {
    const { url } = res.config;
    if (url === "/api/auth/login/") {
      store.dispatch({ type: "LOADING_RESPONSE" });
    }
    return res;
  },
  (error) => {
    const { url } = error.config;
    if (url === "/api/auth/login/") {
      store.dispatch({ type: "LOADING_RESPONSE" });
    }

    if (!error.response) {
      error.response = { status: "Server Error !" };
    }

    const errorStatus = error.response.status;
    if (errorStatus === 401) {
      store.dispatch({ type: "LOGOUT_REQUEST" });
    }

    return error;
  }
);

// GET API WITH CUSTOM TOKEN
function getApiWithCustomToken(url, token) {
  return axios
    .get(`/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

// 1.
const getLessonWithQRCode = (token) => {
  return getApiWithCustomToken(
    "api/applications/qr_code/lesson/get_info/",
    token
  );
};

// 2.
const startLessonWithQRCode = (token) => {
  return getApiWithCustomToken(
    "api/applications/qr_code/lesson/start_lesson/",
    token
  );
};

// 3.
const closeLessonWithQRCode = (token) => {
  return getApiWithCustomToken(
    "api/applications/qr_code/lesson/close_lesson/",
    token
  );
};

// POST API WITH CUSTOM TOKEN
function postApiWithCustomToken(url, token, payload) {
  return axios
    .post(`/${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

// 1.
const feedbackLessonWithQRCode = (token, payload) => {
  return postApiWithCustomToken(
    "api/applications/qr_code/lesson/review_lesson/",
    token,
    payload
  );
};

// GET API
function getApi(url) {
  const token = getLocalStorage("access_token");
  return axios
    .get(`/${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no auth",
      },
    })
    .then((res) => res)
    .catch((err) => err);
}
// 1.
const tutorPreAcceptList = () => {
  return getApi("api/applications/tutor/contracts/?status=2");
};
// 2.
const getRequestList = () => {
  return getApi("api/applications/tutor/open_contracts/");
};
// 3.
const getBidChange = (bidId) => {
  return getApi(`api/applications/bid_contract/request_change/${bidId}/`);
};
// 4.
const getActiveLesson = () => {
  return getApi("api/applications/student/get_active_lessons/");
};

// 8.
const getRequestDetail = (requestId) => {
  return getApi(`api/applications/contract/${requestId}/`);
};
// 9.
const getBidDetail = (bidId) => {
  return getApi(`api/applications/bid_contract/${bidId}/`);
};
// 10.
const getInprogressCourses = () => {
  return getApi("api/applications/student/courses/?status=5");
};
// 11.
const getPendingCourses = () => {
  return getApi("api/applications/student/courses/?status=3");
};
// 12.
const getDoneCourses = () => {
  return getApi("api/applications/student/courses/?status=6");
};
// 13.
const getCourseDetail = (courseid) => {
  return getApi(`api/applications/student/courses/${courseid}/`);
};
// 14.
const getLessonDetail = (lessonId) => {
  return getApi(`api/applications/lesson/detail/${lessonId}/`);
};

// 16.
const getChatHistory = () => {
  return getApi("api/chat/history/");
};

// 17.
const chatRoomDetail = (room) => {
  return getApi(`api/chat/detail/?room=${room}`);
};

// 18.
const getUser = () => {
  return getApi(`api/users/`);
};

// 19.
const getNotifyHistory = (pageNo) => {
  return getApi(`api/users/notifications/?page=${pageNo}`);
};

// 20.
const getContractSummary = () => {
  return getApi(`api/applications/total_contract/`);
};

// 21.
const getUpcomingLessons = () => {
  return getApi(`api/applications/contract/upcoming_lesson/`);
};

// 22.
const getUserSettings = () => {
  return getApi(`api/users/settings/`);
};

// 22.
const getEcontract = (user_role, status) => {
  return getApi(
    `api/applications/next_lessons/?user_role=${user_role}&status=${status}`
  );
};

// 23.
const getTutorReviewList = () => {
  return getApi("api/applications/tutor/review_list/");
};

// 24.
const getPaymentHistory = () => {
  return getApi("api/payments/payment_history/");
};

// 25.
const getLessonPaymentList = (contract_id) => {
  return getApi(`api/payments/lesson_payment_list/?contract_id=${contract_id}`);
};

// 26.
const getNewNotify = () => {
  return getApi("api/users/notification/count/");
};

// 27.
const readNotify = (noti_id) => {
  return getApi(`api/users/notification/?noti_id=${noti_id}`);
};

// 25.
const getBankList = () => {
  return getApi("api/payments/list_account/");
};

//26.
const getlimit = () => {
  return getApi("api/applications/tutor/get_limit/");
};

// 62.
const getVideo = (composition_sid) => {
  return getApi(`code/user_file/lesson/${composition_sid}.mp4`);
};

// 62.
const getRecommendTutor = () => {
  return getApi("api/users/outstanding_tutor/");
};

// POST API
function postApi(url, payload) {
  const token = getLocalStorage("access_token");
  return axios
    .post(`/${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

// 1.
const tutorAcceptABid = (payload) => {
  return postApi("api/applications/tutor/accept_contract/", payload);
};

// 2.
const upgradeAccount = (payload) => {
  return postApi("api/users/upgrade_account/", payload);
};

// 3.
const bidContract = (payload) => {
  return postApi("api/applications/bid_contract/", payload);
};

// 4.
const editContractDecided = (payload) => {
  return postApi(
    "api/applications/bid_contract/request_change/accept/",
    payload
  );
};

// 5.
const cancleRequest = (payload) => {
  return postApi("api/applications/cancel_contract/", payload);
};

// 6.
const pushRequest = (payload) => {
  return postApi("api/applications/student/push_contract_top/", payload);
};

// 7.
const editBidContract = (payload) => {
  return postApi("api/applications/bid_contract/request_change/", payload);
};

// 8.
const createStudentRequest = (payload) => {
  return postApi("api/applications/create_open_contract/", payload);
};

// 10.
const getBidList = (payload) => {
  return postApi(`api/applications/bid_contracts/`, payload);
};

// 11.
const acceptABid = (payload) => {
  return postApi("api/applications/student/accept_contract/", payload);
};

// 12.
const editCourse = (payload) => {
  return postApi("api/applications/change_course/request/", payload);
};

// 13.
const reviewCourse = (payload) => {
  return postApi("api/applications/contract/review/create/", payload);
};

// 14.
const chatReport = (payload) => {
  return postApi("api/chat/report/", payload);
};

// 15.
const addReview = (payload) => {
  return postApi("api/applications/lesson/review/create/", payload);
};

// 16.
const addNote = (payload) => {
  return postApi("api/applications/lesson/note/create/", payload);
};

// 17.
const getNoteList = (payload) => {
  return postApi("api/applications/lesson/note/list/", payload);
};

// 18.
const getChatToken = (payload) => {
  return postApi("api/chat/join/", payload);
};

// 19.
const startVideoCall = (payload) => {
  return postApi("api/video_call/start/", payload);
};

// 20.
const joinVideoCall = (payload) => {
  return postApi("api/video_call/join/", payload);
};

// 21.
const userReport = (payload) => {
  return postApi("api/video_call/report/", payload);
};

// 22.
const uploadHomework = (payload) => {
  return postApi("api/applications/homework/upload/", payload);
};

// 23.
const getListHomework = (payload) => {
  return postApi("api/applications/homework/list/", payload);
};

// 24.
const uploadDoc = (payload) => {
  return postApi("api/applications/study_docs/upload/", payload);
};

// 25.
const logout = () => {
  return postApi("api/auth/logout/", {});
};

// 28.
const lessonClose = (payload) => {
  return postApi("api/applications/lesson/close/", payload);
};

// 29.
const deleteFile = (payload) => {
  return postApi("api/applications/files/delete/", payload);
};

// 30.
const reOpenContract = (payload) => {
  return postApi("api/applications/student/reopen_contract/", payload);
};

// 31.
const pushContractHistory = (payload) => {
  return postApi("api/applications/student/push_contract_history/", payload);
};
// 32.
const userSettings = (payload) => {
  return postApi("api/users/settings/", payload);
};

// 33.
const verifyPassword = (payload) => {
  return postApi("api/users/password_security/", payload);
};

// 34.
const createCalendarNote = (payload) => {
  return postApi("api/applications/lesson/note/create/", payload);
};

//35.
const getCalendarNote = (payload) => {
  return postApi("api/applications/lesson/note/list/", payload);
};

//36.
const confirmPhoneNumber = (payload) => {
  return postApi("api/users/confirm_phone_number/", payload);
};

// 37.
const historyEcontract = (payload) => {
  return postApi("api/applications/request_change_list/", payload);
};

// 38.
const addBank = (payload) => {
  return postApi("api/payments/add_bank/", payload);
};

// 39.
const getOtp = (payload) => {
  return postApi("api/payments/send_confirm_bank/", payload);
};

// 40.
const confirmOtp = (payload) => {
  return postApi("api/payments/confirm_phone/", payload);
};

// 41.
const setBankDefault = (payload) => {
  return postApi("api/payments/set_default_bank/", payload);
};

//42.
const createPayment = (payload) => {
  return postApi("api/payments/create_payment/", payload);
};

//43.
const updatePayment = (payload) => {
  return postApi("api/payments/update_payment/", payload);
};

// 44.
const notifyMarkReadAll = (payload) => {
  return postApi("api/users/notification/read_all/", payload);
};

// 45.
const lessonFeedback = (payload) => {
  return postApi("api/applications/lesson/reviews/", payload);
};

// 46.
const updateSchedule = (payload) => {
  return postApi("api/applications/courses/change_lesson_schedule/", payload);
};

// 47.
const payout = (payload) => {
  return postApi("api/payments/payout_onepay/", payload);
};

// 48.
const addLessons = (payload) => {
  return postApi("api/applications/lesson/request_more/", payload);
};

// 49.
const addLessonsDecide = (payload) => {
  return postApi("api/applications/lesson/request_more/decide/", payload);
};

// 50.
const getModifySchedule = (payload) => {
  return postApi("api/applications/lesson/get_request_more/", payload);
};

// 49.
const editLessonsDecide = (payload) => {
  return postApi("api/applications/courses/change_lesson_decide/", payload);
};

// 50.
const fetchOpenContract = (payload, pageNo) => {
  return postApi(
    `api/applications/tutor/open_contracts/?page=${pageNo}`,
    payload
  );
};

// 51 Long thêm api lý do từ chối đề nghị dạy ACA-887.
const rejectBidContract = (payload) => {
  return postApi("api/applications/student/reject_bid_contract/", payload);
};

// 52.
const submitTrialDate = (payload) => {
  return postApi("api/applications/student/select_trial_date/", payload);
};

// 53.
const trialDateDecide = (payload) => {
  return postApi("api/applications/student/accept_reject_course/", payload);
};

// 54.
const submitSchedule = (payload) => {
  return postApi("api/applications/tutor/start_contract_trial/", payload);
};

// 55 Long thêm api khóa học đang chờ học viên bắt đàu hoặc từ chối khóa học.
const StudentRejectCourse = (payload) => {
  return postApi("api/applications/student/accept_reject_timeline/", payload);
};

// 56.
const getTutorOpenRequests = (payload, pageNo) => {
  return postApi(
    `api/applications/tutor/contract_bided/?page=${pageNo}`,
    payload
  );
};

// 57. Request TutorPre
const getTutorPreAcceptRequests = (payload, pageNo) => {
  return postApi(
    `api/applications/tutor/contract_bided/?page=${pageNo}`,
    payload
  );
};
// 58. Request Tutorclose
const getTutorCloseRequests = (payload, pageNo) => {
  return postApi(
    `api/applications/tutor/contract_bided/?page=${pageNo}&status=4`,
    payload
  );
};

// 59.
const getStudentRequests = (payload, pageNo) => {
  return postApi(
    `api/applications/student/open_contracts/?page=${pageNo}`,
    payload
  );
};

// 60. LONG thay status 2->8 flow mới.
const getPreAcceptBids = (payload, pageNo) => {
  return postApi(
    `api/applications/student/open_contracts/?page=${pageNo}`,
    payload
  );
};

// 61.
const getClosingRequest = (payload, pageNo) => {
  return postApi(
    `api/applications/student/open_contracts/?page=${pageNo}`,
    payload
  );
};

// 62.
const updateAvatar = (payload) => {
  return postApi("api/users/update_avatar/", payload);
};

// 63 Long THÊM API ĐỂ GỌI XEM CHI TIẾT THANH TOÁN TỪNG BUỔI
const paymentDetailLesson = (payload) => {
  return postApi("api/payments/payment_detail/", payload);
};

// 64 Long THÊM API HỦY BUỔI HỌC THỬ SAU 1 KHOẢNG THỜI GIAN
const after15Post = (payload) => {
  return postApi("api/applications/trial_lesson/force_cancel/", payload);
};

// 65
const getSystemMessages = () => {
  return postApi("api/system_messages/all/", {});
};

// 66
const readAllSystemMessages = () => {
  return postApi("api/system_messages/all/read/", {});
};
// 67
const realTimeLength = (payload) => {
  return postApi("api/applications/lesson/start_count_time/", payload);
};

const createUnoauthRequest = (payload) => {
  return axios
    .post("api/applications/landing_page/contract/create/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const getSmsCode = (payload) => {
  return axios
    .post("api/users/sms/send_confirm_code/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const quandaRegistration = (payload) => {
  return axios
    .post("api/users/qanda/registration/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const updateQuandaUser = (payload) => {
  return postApi("api/users/qanda/update_user_info/", payload);
};

// 64.
const registerWithFacebook = (payload) => {
  return axios
    .post("api/users/facebook/registration/", payload)
    .then((res) => res)
    .catch((err) => err);
};

// 65.
const loginWithFacebook = (payload) => {
  return axios
    .post("api/users/facebook/login/", payload)
    .then((res) => res)
    .catch((err) => err);
};

// 66.
const registerWithZalo = (payload) => {
  return axios
    .post("api/users/zalo/registration/", payload)
    .then((res) => res)
    .catch((err) => err);
};

// 67.
const loginWithZalo = (payload) => {
  return axios
    .post("api/users/zalo/login/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const faqQuestion = (payload) => {
  return axios
    .post("api/questions/create_question/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const registerform = (payload) => {
  return axios
    .post("api/users/landing_page_subcribe/", payload)
    .then((res) => res)
    .catch((err) => err);
};

const deleteSettingsField = (payload) => {
  const token = getLocalStorage("access_token");
  return axios
    .delete(`/api/users/settings/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    })
    .then((res) => res)
    .catch((err) => err);
};

const bidAction = (bidId, payload) => {
  //PREACCEPT OR UNACCEPT A BID
  const token = getLocalStorage("access_token");
  return axios
    .put(`/api/applications/temp_accept_bid/${bidId}/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

const editUser = (user) => {
  const token = getLocalStorage("access_token");
  return axios
    .put(`/api/users/`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

const downLoadHomework = (fileId, fileName) => {
  const token = getLocalStorage("access_token");
  return axios
    .post(
      `/api/applications/homework/download/`,
      { file_id: fileId },
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => err);
};

const login = (email, password, role, student_request_id) => {
  return axios
    .post(`/api/auth/login/`, {
      email,
      password,
      role,
      student_request_id,
    })
    .then((res) => res)
    .catch((err) => err);
};

const forgotPassword = (payload) => {
  return axios
    .post(`/api/auth/forgot_password/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const createPassword = (payload) => {
  return axios
    .post(`/api/auth/change_password/`, payload)
    .then((res) => res.status)
    .catch((err) => err.response.status);
};

const studentRegister = (name, email, password, role) => {
  return axios
    .post(`/api/users/registration/`, {
      name,
      email,
      password,
      role,
    })
    .then((res) => res)
    .catch((err) => err);
};

const tutorRegister = (
  email,
  name,
  dob,
  phone_number,
  district,
  city,
  gender,
  confirm_legal,
  role,
  password
) => {
  return axios
    .post(`/api/users/registration/`, {
      email,
      name,
      dob,
      phone_number,
      district,
      city,
      gender,
      confirm_legal,
      role,
      password,
    })
    .then((res) => res)
    .catch((err) => err);
};

const verifyEmail = (payload) => {
  return axios
    .post(`/api/users/send_regis_verify_code/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const confirmCode = (payload) => {
  return axios
    .post(`/api/users/confirm_regis_verify_code/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const verifyPhone = (payload) => {
  return axios
    .post(`/api/users/sms/send_confirm_code/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const confirmPhone = (payload) => {
  return axios
    .post(`/api/users/sms/verify_confirm_code/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const userRegister = (payload) => {
  return axios
    .post(`/api/users/registration/`, payload)
    .then((res) => res)
    .catch((err) => err);
};

const getZaloAccessToken = (payload) => {
  return axios
    .post("api/users/zalo/get_info/", payload)
    .then((res) => res)
    .catch((err) => err);
};

export {
  getStudentRequests,
  createStudentRequest,
  tutorRegister,
  studentRegister,
  login,
  logout,
  faqQuestion,
  forgotPassword,
  createPassword,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  getBidList,
  bidAction,
  getRequestList,
  bidContract,
  getPreAcceptBids,
  getRequestDetail,
  getBidDetail,
  acceptABid,
  getInprogressCourses,
  getCourseDetail,
  uploadHomework,
  editCourse,
  getListHomework,
  startVideoCall,
  joinVideoCall,
  downLoadHomework,
  getChatToken,
  addNote,
  getNoteList,
  addReview,
  editBidContract,
  getUser,
  editUser,
  getBidChange,
  editContractDecided,
  uploadDoc,
  userReport,
  upgradeAccount,
  pushRequest,
  getChatHistory,
  tutorAcceptABid,
  getPendingCourses,
  chatReport,
  getLessonDetail,
  chatRoomDetail,
  lessonClose,
  tutorPreAcceptList,
  reviewCourse,
  deleteFile,
  getUpcomingLessons,
  getNotifyHistory,
  getContractSummary,
  getDoneCourses,
  verifyEmail,
  confirmCode,
  userRegister,
  getActiveLesson,
  cancleRequest,
  getClosingRequest,
  // getTutorBided,
  getTutorOpenRequests,
  getTutorPreAcceptRequests,
  getTutorCloseRequests,
  reOpenContract,
  pushContractHistory,
  userSettings,
  verifyPassword,
  getUserSettings,
  deleteSettingsField,
  createCalendarNote,
  getCalendarNote,
  confirmPhoneNumber,
  getEcontract,
  getTutorReviewList,
  getPaymentHistory,
  getLessonPaymentList,
  historyEcontract, // HISTORY ECONTRACT CHANGE LIST
  addBank,
  getNewNotify,
  readNotify,
  getOtp,
  confirmOtp,
  getBankList,
  setBankDefault,
  registerform,
  getlimit,
  createPayment,
  updatePayment,
  notifyMarkReadAll,
  lessonFeedback,
  updateSchedule,
  payout,
  addLessons,
  addLessonsDecide,
  getModifySchedule,
  editLessonsDecide,
  fetchOpenContract,
  rejectBidContract,
  submitTrialDate,
  trialDateDecide,
  submitSchedule,
  StudentRejectCourse,
  updateAvatar,
  registerWithZalo,
  getZaloAccessToken,
  loginWithZalo,
  paymentDetailLesson,
  registerWithFacebook,
  loginWithFacebook,
  getVideo,
  getSmsCode,
  updateQuandaUser,
  quandaRegistration,
  verifyPhone,
  confirmPhone,
  after15Post,
  getSystemMessages,
  createUnoauthRequest,
  readAllSystemMessages,
  realTimeLength,
  getLessonWithQRCode,
  startLessonWithQRCode,
  closeLessonWithQRCode,
  feedbackLessonWithQRCode,
  getRecommendTutor,
};
