import React from "react";

import Image from "../../assets/images/quanda-registration-success.jpg";

export default function RegistrationSuccess() {
  return (
    <div>
      <h4 className="font-weight-bold text-center mb-12px">
        Bạn đã đăng ký thành công!
      </h4>
      <p className="px-3 mb-2 text-center" style={{ color: "#646464" }}>
        Hãy đăng nhập ở trên máy tính bảng hoặc PC để có trải nghiệm tốt nhất
        nhé
      </p>
      <div className="text-center">
        <a className="text-hightlight1" href="http://akadon.edu.vn/user/login">
          http://akadon.edu.vn
        </a>
      </div>
      <div className="text-center">
        <img src={Image} alt="registration success" />
      </div>
    </div>
  );
}
