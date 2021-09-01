import React from "react";
import ClockIcon from "../../assets/icons/clock-icon.png";
import MoneyIcon from "../../assets/icons/money-icon.png";

const LegalcyFAQ = () => {
  return (
    <>
      <h6
        style={{ background: "#0367B4" }}
        className="text-center font-weight-bold text-light text-uppercase mb-4 py-2"
      >
        Lý lịch tư pháp và những điều cần biết
      </h6>
      <h5 className="mb-2 text-danger text-uppercase text-bold2">
        Lý lịch tư pháp (LLTP) là gì?
      </h5>
      <p className="mb-3">
        Đó là một loại tài liệu (phiếu) do Sở tư pháp (hoặc Trung tâm lý lịch tư
        pháp quố gia) cấp, trên đó cung cấp các thông tin chứng minh một người
        có hay không có án tích, bản án, các quyết định xử phạt của Tòa án.
      </p>
      <h5 className="mb-2 text-danger text-uppercase text-bold2">
        Vì sao cần sử dụng LLTP tại Akadon?
      </h5>
      <p className="mb-3">
        LLTP giúp đảm bảo chất lượng Đối tác Akadon, tăng độ tin dùng đối với
        khách hàng, là yếu tố quyết định thu nhập của Đối Tác. Làm một lần duy
        trì được nhiều lần khi nâng cấp/duy trì tài khoản hàng tháng
      </p>
      <h5 className="mb-2 text-danger text-uppercase text-bold2">
        Quy trình làm lý lịch tư pháp
      </h5>
      <div style={{ overflowX: "auto" }}>
        <table className="table-bordered mb-3 mx-4 table_faq">
          <tbody>
            <tr>
              <td>Làm trực tiếp</td>
              <td colSpan={2}>
                <p className="mb-12px">
                  Tại <span className="text-bold2">Sở tư pháp địa phương,</span>{" "}
                  nơi cấp hộ khẩu.
                </p>
                <p className="mb-2 text-bold2">Hồ sơ chuẩn bị:</p>
                <ol className="mb-0 position-relative">
                  <li>
                    Tờ khai yêu cầu cấp Phiếu lý lịch tư pháp{" "}
                    <span className="text-bold2">(Mẫu số 03/2013/TT-LLTP)</span>{" "}
                    (ghi rõ cấp phiếu số 1) <br></br>(có thể tải phiếu tại đường
                    link
                    <a
                      href="http://bit.ly/lltp-gb"
                      rel="noreferrer"
                      target="_blank"
                      className="text-bold2 text-hightlight text-decoration-none"
                    >
                      {" "}
                      http://bit.ly/lltp-gb
                    </a>
                    )
                  </li>
                  <li> CMND hoặc hộ chiếu</li>
                  <li> Sổ hộ khẩu (bản sao công chứng)</li>
                </ol>
                <ul>
                  <li className="ml-2">
                    Lệ phí: <span className="text-bold2">200,000 </span>vnđ
                  </li>
                  <li className="ml-2">
                    Thời gian nhận LLTP:{" "}
                    <span className="text-bold2">Sau 15 ngày </span>từ ngày nộp
                    tờ khai
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Ủy quyền cho người thân làm giúp</td>
              <td colSpan={2}>
                Chỉ chấp nhận người thân là cha, mẹ, con, vợ/chồng.
              </td>
            </tr>
            <tr>
              <td>Làm qua bưu điện VNPOST</td>
              <td colSpan={2}>
                <ul className="px-0">
                  <li className="ml-4">
                    <span className="text-bold2">Tại HCM:</span> đến quầy số 2 -
                    Bưu điện Thành Phố, số 2, Công xã Paris Bến Nghé Quận 1
                  </li>
                  <li className="ml-4">
                    <span className="text-bold2">Tại HN: </span> đến chi nhánh
                    VNPost bất kì
                  </li>
                  <li className="text-bold2 ml-4">
                    <span className="text-hightlight">Hồ sơ</span> giống như làm
                    trực tiếp
                  </li>
                  <li className="ml-4">
                    <p>
                      <span className="text-bold2 text-hightlight">
                        Lệ phí:
                      </span>{" "}
                      <span className="text-bold2">
                        Ngoài 200,000 vnđ làm LLTP, còn:{" "}
                      </span>
                      <br></br>
                      Phí chuyển phát nội tỉnh 1 chiều: <br></br> 22.000 + Phí
                      thu hộ nộp hộ (13.000) ={" "}
                      <span className="text-bold2">35.000 vnđ</span> <br></br>
                      Phí chuyển phát nội tỉnh 2 chiều: <br></br>44.000 + Phí
                      thu hộ nộp hộ (13.000) =
                      <span className="text-bold2">57.000 vnđ</span> <br></br>
                      Phí chuyển phát liên tỉnh 2 chiều: <br></br>88.000 + Phí
                      thu hộ nộp hộ (13.000) ={" "}
                      <span className="text-bold2">101.000 vnđ</span>
                    </p>
                  </li>
                  <li className="ml-4">
                    <span className="text-hightlight">
                      VNPost hỗ trợ làm LLTP tại 55 tỉnh/TP
                    </span>
                    , trừ các địa phương:
                    <span className="text-bold2">
                      Vĩnh Phúc, Tây Ninh, Hải Dương, Hưng Yên, Long An, Hà
                      Tĩnh, Cao bằng, Đắk Lắk
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Làm trực tuyến</td>
              <td colSpan={2}>
                <ul>
                  <li>
                    <div>
                      <p className="mb-2">Truy cập đường link:</p>
                      <a
                        className="ml-4 p-2 bg-hightlight-1 text-light text-bold2"
                        href="http://lltptructuyen.moj.gov.vn/home"
                        rel="noreferrer"
                        target="_blank"
                        alt="lam truc tuyen"
                      >
                        http://lltptructuyen.moj.gov.vn/home
                      </a>
                    </div>
                  </li>
                  <li>Chọn khu vực cư trú và điền thông tin vào phiếu khai.</li>
                  <li>
                    Sau khi hoàn tất, Đối tác sẽ nhận được mã số trực tuyến.
                    Mang mã số này đến Sở tư pháp để được nộp hồ sơ + lệ phí
                    nhanh chóng
                  </li>
                  <li>
                    Nhờ người thân (cha, mẹ, vợ, chồng, con) mang hồ sơ đến sở
                    tư pháp nơi cư trú, cung cấp mã số trực tuyến và nộp hồ sơ +
                    lệ phí
                  </li>
                  <li>
                    Tham khảo hướng dẫn của bộ tư pháp
                    <a
                      className="text-bold2 text-dark text-decoration-none pl-2"
                      href="http://lltptructuyen.moj.gov.vn/share/huongdan/HSD.pdf"
                      rel="noreferrer"
                      target="_blank"
                      alt="lltptructuyen"
                    >
                      http://lltptructuyen.moj.gov.vn/share/huongdan/HSD.pdf
                    </a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex-box justify-content-between">
        <div className="cost-block position-relative ml-4">
          <img className="position-absolute" src={MoneyIcon} alt="cost" />
          <span className="text-bold2">Chi phí: 200.000 VNĐ</span>
        </div>
        <div className="time-block position-relative mr-4">
          <img className="position-absolute" src={ClockIcon} alt="time" />
          <span className="text-bold2">
            Thời gian chờ cấp: 15 ngày làm việc
          </span>
        </div>
      </div>
    </>
  );
};

export default LegalcyFAQ;
