import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import publicIp from "public-ip";
import CryptoJS from "crypto-js";

import { createPayment } from "./api";

function subjectColor(subject, lightBg) {
  switch (subject) {
    case "Toán học": {
      return lightBg ? "#F1EFFF" : "#816FFC";
    }
    case "Ngữ văn": {
      return lightBg ? "#FFFAEF" : "#BB9241";
    }
    case "Sinh học": {
      return lightBg ? "#EDF4FF" : "#65A1F5";
    }
    case "Vật lý": {
      return lightBg ? "#FFEFF2" : "#FC6A82";
    }
    case "Hóa học": {
      return lightBg ? "#FFF9F1" : "#FFA42C";
    }
    case "Địa lý": {
      return lightBg ? "#FFF0F3" : "#BEA5A9";
    }
    case "Lịch sử": {
      return lightBg ? "#EFF4FF" : "#7B91BC";
    }
    case "Tiếng Anh": {
      return lightBg ? "#EDFDFF" : "#00B2C7";
    }
    case "Tin học": {
      return lightBg ? "#FFF0FD" : "#C15CB5";
    }
    default:
      return "";
  }
}

function toastSuccess(toastContent) {
  const config = {
    autoClose: 3000000,
    className: "toast-style",
  };
  toast.success(toastContent, config);
}

function dateFormatForServer(date) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
}

function generateOnepayHash(hashString) {
  if (!process.env.REACT_APP_ONEPAY_HASH_KEY) return "";
  const hashKey = CryptoJS.enc.Hex.parse(process.env.REACT_APP_ONEPAY_HASH_KEY);
  const hash = CryptoJS.HmacSHA256(hashString, hashKey);
  return hash.toString(CryptoJS.enc.Hex).toLocaleUpperCase();
}

async function paymentUrl(paymentTitle, vpc_Amount, vpc_ReturnURL, payload) {
  const onePayUrl = "https://onepay.vn/paygate/vpcpay.op";
  const vpc_AccessCode = process.env.REACT_APP_VPC_ACCESSCODE;
  const vpc_Merchant = process.env.REACT_APP_VPC_MERCHANT;
  const vpc_TicketNo = await publicIp.v4();
  const vpc_Version = 2;
  const vpc_Command = "pay";
  const vpc_Locale = "vn";
  let vpc_MerchTxnRef = "";
  let vpc_OrderInfo = "";

  const res = await createPayment(payload);
  if (res.status < 400) {
    vpc_MerchTxnRef = res.data.vpc_MerchTxnRef;
    vpc_OrderInfo = res.data.vpc_OrderInfo;
  } else if (res.response) {
    toast.error(`Error ${res.response.status} !`);
  }

  const hashStr = `vpc_AccessCode=${vpc_AccessCode}&vpc_Amount=${vpc_Amount}&vpc_Command=${vpc_Command}&vpc_Locale=${vpc_Locale}&vpc_MerchTxnRef=${vpc_MerchTxnRef}&vpc_Merchant=${vpc_Merchant}&vpc_OrderInfo=${vpc_OrderInfo}&vpc_ReturnURL=${vpc_ReturnURL}&vpc_TicketNo=${vpc_TicketNo}&vpc_Version=${vpc_Version}`;
  const secureHash = generateOnepayHash(hashStr);

  return `${onePayUrl}?Title=${paymentTitle}&vpc_AccessCode=${vpc_AccessCode}&vpc_Amount=${vpc_Amount}&vpc_Command=${vpc_Command}&vpc_Locale=${vpc_Locale}&vpc_MerchTxnRef=${vpc_MerchTxnRef}&vpc_Merchant=${vpc_Merchant}&vpc_OrderInfo=${vpc_OrderInfo}&vpc_ReturnURL=${vpc_ReturnURL}&vpc_TicketNo=${vpc_TicketNo}&vpc_Version=${vpc_Version}&vpc_SecureHash=${secureHash}`;
}

function catchOnePayError(errorCode) {
  switch (errorCode) {
    case "1": {
      return "Giao dịch không thành công, Ngân hàng phát hành thẻ không cấp phép cho giao dịch hoặc thẻ chưa được kích hoạt dịch vụ thanh toán trên Internet. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ được hỗ trợ chi tiết.";
    }
    case "2": {
      return "Giao dịch không thành công, Ngân hàng phát hành thẻ từ chối cấp phép cho giao dịch. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ để biết chính xác nguyên nhân Ngân hàng từ chối.";
    }
    case "3": {
      return "Giao dịch không thành công. Vui lòng liên hệ với OnePAY để được hỗ trợ (Hotline: 1900 633 927)";
    }
    case "4": {
      return "Giao dịch không thành công do thẻ hết hạn sử dụng hoặc nhập sai thông tin tháng/ năm hết hạn của thẻ. Vui lòng kiểm tra lại thông tin và thanh toán lại";
    }
    case "5": {
      return "Giao dịch không thành công, Thẻ không đủ hạn mức hoặc tài khoản không đủ số dư để thanh toán. Vui lòng kiểm tra lại thông tin và thanh toán lại";
    }
    case "6": {
      return "Giao dịch không thành công, Quá trình xử lý giao dịch phát sinh lỗi từ ngân hàng phát hành thẻ. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ được hỗ trợ chi tiết.";
    }
    case "7": {
      return "Giao dịch không thành công, Đã có lỗi phát sinh trong quá trình xử lý giao dịch. Vui lòng thực hiện thanh toán lại.";
    }
    case "8": {
      return "Giao dịch không thành công. Số thẻ không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "9": {
      return "Giao dịch không thành công. Tên chủ thẻ không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "10": {
      return "Giao dịch không thành công. Thẻ hết hạn/Thẻ bị khóa. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "11": {
      return "Giao dịch không thành công. Thẻ chưa đăng ký sử dụng dịch vụ thanh toán trên Internet. Vui lòng liên hê ngân hàng theo số điện thoại sau mặt thẻ để được hỗ trợ.";
    }
    case "12": {
      return "Giao dịch không thành công. Ngày phát hành/Hết hạn không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "13": {
      return "Giao dịch không thành công. thẻ/ tài khoản đã vượt quá hạn mức thanh toán. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "21": {
      return "Giao dịch không thành công. Số tiền không đủ để thanh toán. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "22": {
      return "Giao dịch không thành công. Thông tin tài khoản không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "23": {
      return "Giao dịch không thành công. Tài khoản bị khóa. Vui lòng liên hê ngân hàng theo số điện thoại sau mặt thẻ để được hỗ trợ";
    }
    case "24": {
      return "Giao dịch không thành công. Thông tin thẻ không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "25": {
      return "Giao dịch không thành công. OTP không đúng. Vui lòng kiểm tra và thực hiện thanh toán lại";
    }
    case "253": {
      return "Giao dịch không thành công. Quá thời gian thanh toán. Vui lòng thực hiện thanh toán lại";
    }
    case "99": {
      return "Giao dịch không thành công. Người sử dụng hủy giao dịch";
    }
    case "B": {
      return "Giao dịch không thành công do không xác thực được 3D-Secure. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ được hỗ trợ chi tiết.";
    }
    case "E": {
      return "Giao dịch không thành công do nhập sai CSC (Card Security Card) hoặc ngân hàng từ chối cấp phép cho giao dịch. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ được hỗ trợ chi tiết.";
    }
    case "F": {
      return "Giao dịch không thành công do không xác thực được 3D-Secure. Vui lòng liên hệ ngân hàng theo số điện thoại sau mặt thẻ được hỗ trợ chi tiết.";
    }
    case "Z": {
      return "Giao dịch không thành công do vi phạm quy định của hệ thống. Vui lòng liên hệ với OnePAY để được hỗ trợ (Hotline: 1900 633 927)";
    }
    default:
      return "Giao dịch không thành công. Vui lòng liên hệ với OnePAY để được hỗ trợ (Hotline: 1900 633 927)";
  }
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export {
  subjectColor,
  toastSuccess,
  dateFormatForServer,
  useQuery,
  paymentUrl,
  generateOnepayHash,
  catchOnePayError,
};
