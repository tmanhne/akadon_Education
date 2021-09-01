import React from "react";
import email from "../../assets/icons/email.png";
import place from "../../assets/icons/location.png";
import phone from "../../assets/icons/phone.png";

import TermsService from "../../assets/images/termservice.png";
import "./index.scss";
import HeaderStep from "../landingPage/NoteTip/HeaderStep";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <HeaderStep t={t} />

      <div className="left" fluid={true}>
        <div className="under-pic">
          <img src={TermsService} alt="student-tutor" />
        </div>

        <span className="head-title">ĐIỀU KIỆN GIAO DỊCH CHUNG</span>
        <span style={{ paddingBottom: "24px", fontSize: "16px" }}>
          Chào mừng bạn đến với Nền tảng cung cấp giải pháp kết nối gia sư và
          học viên Akadon qua trang web{" "}
          <Link to="/">
            <strong>https://akadon.edu.vn</strong>
          </Link>
        </span>

        <div className="dad">
          <span className="index">
            <strong> 1. Quan trọng</strong> – Trước khi sử dụng Trang Akadon
            hoặc tạo tài khoản Akadon (“Tài Khoản”), vui lòng đọc kỹ các Điều
            Khoản của Nền tảng Akadon dưới đây và Quy Chế Hoạt Động Sàn Giao
            Dịch Thương Mại Điện Tử Akadon để hiểu rõ quyền lợi và nghĩa vụ hợp
            pháp của mình đối với Công ty TNHH Akadon và các công ty liên kết và
            công ty con của Akadon (sau đây được gọi riêng là “Akadon”, gọi
            chung là “chúng tôi”, “của chúng tôi”); Nền tảng Akadon bao gồm các
            giải pháp mà chúng tôi cung cấp trên sàn giao dịch trực tuyến kết
            nối người tiêu dùng với nhau nhằm mang đến cơ hội kinh doanh giữa
            người mua (“Người dùng”) và người bán (“Nhà cung ứng dịch vụ”) (gọi
            chung là “bạn”, “Thành viên” hoặc “Các Bên”). Hợp đồng mua bán thật
            sự là trực tiếp giữa Người dùng và Nhà cung ứng dịch vụ. Các Bên
            liên quan đến giao dịch đó sẽ chịu trách nhiệm đối với hợp đồng mua
            bán giữa họ, việc đăng bán hàng hóa, bảo hành sản phẩm và tương tự.
            Akadon không can thiệp vào giao dịch giữa các Thành viên. Akadon có
            thể hoặc không sàng lọc trước Thành viên hoặc Nội Dung hoặc thông
            tin cung cấp bởi Thành viên.
          </span>
          <span className="sub">
            <p>
              BẰNG VIỆC TẠO TÀI KHOẢN TRÊN NỀN TẢNG BẠN ĐỒNG Ý RẰNG BẠN ĐÃ ĐỌC,
              HIỂU, CHẤP NHẬN VÀ ĐỒNG Ý VỚI ĐIỀU KHOẢN SỬ DỤNG, VÀ ĐIỀU KIỆN
              ĐƯỢC QUY ĐỊNH TRONG, VÀ DẪN CHIẾU ĐẾN, ĐIỀU KHOẢN DỊCH VỤ NÀY VÀ
              CHÍNH SÁCH BẢO MẬT ĐƯỢC DẪN CHIẾU THEO ĐÂY; CHỊU SỰ RÀNG BUỘC CỦA
              CÁC ĐIỀU KHOẢN SỬ DỤNG, VÀ BẤT KỲ SỬA ĐỔI, BỔ SUNG NÀO ĐỐI VỚI
              ĐIỀU KHOẢN SỬ DỤNG NÀY ĐƯỢC CÔNG BỐ TẠI TỪNG THỜI ĐIỂM TRÊN ĐỊA
              CHỈ{" "}
              <Link to="/terms-of-service">
                https://akadon.edu.vn/terms-of-service
              </Link>
              &nbsp;VÀ/HOẶC THÔNG QUA NỀN TẢNG. BẠN CŨNG ĐỒNG Ý VỚI CÁC CAM ĐOAN
              MÀ BẠN ĐƯA RA DƯỚI ĐÂY. NẾU BẠN KHÔNG ĐỒNG Ý HOẶC KHÔNG THUỘC PHẠM
              VI ĐIỀU CHỈNH CỦA ĐIỀU KHOẢN SỬ DỤNG NỀN TẢNG VUI LÒNG KHÔNG SỬ
              DỤNG NỀN TẢNG HOẶC TRUY CẬP TRANG AKADON NẾU BẠN LÀ NGƯỜI CHƯA
              THÀNH NIÊN HOẶC BỊ GIỚI HẠN VỀ NĂNG LỰC HÀNH VI DÂN SỰ THEO QUY
              ĐỊNH PHÁP LUẬT TẠI QUỐC GIA BẠN SINH SỐNG, BẠN CẦN NHẬN ĐƯỢC SỰ HỖ
              TRỢ HOẶC CHẤP THUẬN TỪ CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP, TÙY
              TỪNG TRƯỜNG HỢP ÁP DỤNG, ĐỂ MỞ TÀI KHOẢN HOẶC SỬ DỤNG NỀN TẢNG.
              TRONG TRƯỜNG HỢP ĐÓ, CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP, TÙY TỪNG
              TRƯỜNG HỢP ÁP DỤNG, CẦN HỖ TRỢ ĐỂ BẠN HIỂU RÕ HOẶC THAY MẶT BẠN
              CHẤP NHẬN NHỮNG ĐIỀU KHOẢN TRONG THỎA THUẬN NỀN TẢNG NÀY. NẾU BẠN
              CHƯA CHẮC CHẮN VỀ ĐỘ TUỔI CŨNG NHƯ NĂNG LỰC HÀNH VI DÂN SỰ CỦA
              MÌNH, HOẶC CHƯA HIỂU RÕ CÁC ĐIỀU KHOẢN NÀY CŨNG NHƯ QUY ĐỊNH PHÁP
              LUẬT CÓ LIÊN QUAN ÁP DỤNG CHO ĐỘ TUỔI HOẶC NĂNG LỰC HÀNH VI DÂN SỰ
              CỦA MÌNH, VUI LÒNG KHÔNG TẠO TÀI KHOẢN HOẶC SỬ DỤNG NỀN TẢNG CHO
              ĐẾN KHI NHẬN ĐƯỢC SỰ GIÚP ĐỠ TỪ CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP
              PHÁP. NẾU BẠN LÀ CHA MẸ HOẶC NGƯỜI GIÁM HỘ HỢP PHÁP CỦA NGƯỜI CHƯA
              THÀNH NIÊN HOẶC BỊ GIỚI HẠN VỀ NĂNG LỰC HÀNH VI DÂN SỰ, TÙY TỪNG
              TRƯỜNG HỢP THEO QUY ĐỊNH PHÁP LUẬT, BẠN CẦN HỖ TRỢ ĐỂ NGƯỜI ĐƯỢC
              GIÁM HỘ HIỂU RÕ HOẶC ĐẠI DIỆN NGƯỜI ĐƯỢC GIÁM HỘ CHẤP NHẬN CÁC
              ĐIỀU KHOẢN NỀN TẢNG NÀY VÀ CHỊU TRÁCH NHIỆM ĐỐI VỚI TOÀN BỘ QUÁ
              TRÌNH SỬ DỤNG TÀI KHOẢN HOẶC NỀN TẢNG MÀ KHÔNG PHÂN BIỆT TÀI KHOẢN
              ĐÃ HOẶC SẼ ĐƯỢC TẠO LẬP.
            </p>

            <p>
              Điều khoản sử dụng này cấu thành một thỏa thuận pháp lý giữa bạn
              (Thành viên) và
              <strong>
                công ty tnhh công nghệ ứng dụng akadon (mã số doanh nghiệp
                0107979500)
              </strong>
            </p>
            <p>
              Akadon bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm dứt
              tất cả hoặc bất kỳ phần nào của Trang Akadon hoặc Nền tảng vào bất
              cứ thời điểm nào theo qui định pháp luật. Phiên Bản thử nghiệm của
              Nền tảng hoặc tính năng của Nền tảng có thể không hoàn toàn giống
              với phiên bản cuối cùng. Công ty sẽ thông báo cho bạn về những
              chỉnh sửa, thay đổi có liên quan đến Nền tảng thông qua trang
              Akadon và/hoặc địa chỉ email đăng ký của bạn trước thời điểm có
              hiệu lực ít nhất năm (05) ngày làm việc. Phiên bản cập nhật sẽ
              được đăng tải trên trang web{" "}
              <Link to="/">https://akadon.edu.vn</Link>. Bạn xác nhận và đồng ý
              rằng bạn phải có trách nhiệm thường xuyên kiểm tra Điều khoản sử
              dụng cũng như Điều khoản sử dụng tại quốc giao nơi bạn sử dụng Nền
              tảng mà có thể khác so với Điều khoản sử dụng tại quốc gia nơi bạn
              sử dụng Nền tảng(“<strong>Quốc gia Thay thế</strong>
              ”). Việc tiếp tục sử dụng Nền tảng sau khi có bất kỳ thay đổi nào,
              bất kể là bạn đã xem xét chúng hay chưa, sẽ tương đương với việc
              bạn đã chấp thuận và đồng ý đối với những thay đổi đó. Bạn cũng
              đồng ý rằng việc sử dụng Nền tảng tại Quốc gia Thay thế sẽ bị ràng
              buộc bởi Điều khoản sử dụng tại Quốc gia Thay thế đó và thông tin
              này có thể được truy cập tại{" "}
              <Link to="/">https://akadon.edu.vn</Link>. Trường hợp bạn không
              đồng ý hoặc không mong muốn chấp nhận các điểm điều chỉnh, thay
              thế hoặc sửa đổi Điều khoản sử dụng, bạn có thể dừng sử dụng Nền
              tảng bằng việc hủy tài khoản của bạn trên Nền tảng.
            </p>
            <p>
              AKADON LÀ MỘT <strong>CÔNG TY CÔNG NGHỆ</strong> CUNG CẤP NỀN TẢNG
              CHO NGƯỜI DÙNG ĐỂ SỬ DỤNG NỀN TẢNG ĐƯỢC CUNG CẤP BỞI CÁC NHÀ CUNG
              CẤP BÊN THỨ BA. VAI TRÒ CỦA AKADON LÀ LIÊN KẾT NGƯỜI DÙNG VỚI CÁC
              NHÀ CUNG CẤP BÊN THỨ BA. AKADON KHÔNG CHỊU TRÁCH NHIỆM ĐỐI VỚI CÁC
              HÀNH ĐỘNG VÀ/HOẶC THIẾU SÓT CỦA BẤT KỲ NHÀ CUNG CẤP BÊN THỨ BA
              NÀO, CÁC TRÁCH NHIỆM PHÁP LÝ LIÊN QUAN ĐẾN NỀN TẢNG PHẢI DO NHÀ
              CUNG CẤP BÊN THỨ BA CHỊU. NHÀ CUNG CẤP BÊN THỨ BA KHÔNG PHẢI LÀ
              ĐẠI LÝ, NGƯỜI LAO ĐỘNG HAY NHÂN VIÊN CỦA AKADON VÀ CÁC GIẢI PHÁP
              ĐƯỢC CUNG CẤP BỞI NHÀ CUNG CẤP BÊN THỨ BA KHÔNG ĐƯỢC XEM LÀ ĐƯỢC
              CUNG CẤP BỞI AKADON.
            </p>
          </span>
        </div>
        <div className="dad">
          <span className="index ">2. Các định nghĩa</span>
          <span className="sub">
            <p>
              Trong Điều Khoản Sử Dụng này, các từ sau sẽ có nghĩa như được mô
              tả dưới đây:
            </p>
            <div className="pl-3">
              <p>
                <strong>“ Công ty”</strong> nghĩa là: Công ty TNHH Công Nghệ Ứng
                Dụng Akadon
              </p>
              <p>
                <strong>“Website Akadon”,</strong> | là website cung cấp Nền
                tảng sàn giao dịch TMĐT, do Công ty TNHH Công Nghệ Ứng dụng
                Akadon thực hiện vận hành và hoạt động:{" "}
                <Link to="/">https://akadon.edu.vn</Link>
              </p>
              <p>
                <strong>“Thông tin cá nhân”</strong>
                là bất kỳ thông tin nào có thể được sử dụng để nhận dạng bạn
                hoặc từ đó bạn có thể được nhận dạng. Điều này bao gồm nhưng
                không giới hạn ở tên, quốc tịch, số điện thoại, chi tiết thẻ tín
                dụng và ngân hàng, sở thích cá nhân, địa chỉ email, hình ảnh của
                bạn, số nhận dạng do chính phủ cấp, dữ liệu sinh trắc học, chủng
                tộc, ngày sinh, tình trạng hôn nhân, tôn giáo, thông tin sức
                khỏe, thông tin xe và bảo hiểm;
              </p>
              <p>
                <strong> “Nền tảng”</strong>
                nghĩa là các giải phap công nghệ của website{" "}
                <Link to="/">https://akadon.edu.vn</Link> cho phép kết nối
              </p>
              <p>Nhà cung ứng dịch vụ và Người dùng</p>
              <p>
                <strong>“Chính sách bảo mật”</strong>
                nghĩa là chính sách bảo mật của chúng tôi có thể truy cập tại:
                https://akadon.edu.vn/privacy/ được sửa đổi theo thời gian;
              </p>
              <p>
                <strong>
                  “Người bán”; “Nhà cung ứng dịch vụ”; “Nhà cung cấp” (“Gia sư”)
                </strong>{" "}
                | là thương nhân, tổ chức, cá nhân bán, cung cấp dịch vụ thông
                qua Website Akadon để kết nối với Người dùng;
              </p>
              <p>
                <strong> “Khách hàng “; “Người dùng” (“Học viên”) </strong>
                là thương nhân, tổ chức, cá nhân có nhu cầu sử dụng Nền tảng
                giáo dục sử dụng Website Akadon đăng thông báo về nhu cầu sử
                dụng Nền tảng giáo dục để mua Nền tảng
              </p>
              <p>
                <strong> “Thành viên”</strong>| là thương nhân, tổ chức, cá nhân
                đăng ký sử dụng sàn giao dịch TMĐT Akadon, bao gồm cả người dùng
                và nhà cung cấp;
              </p>
              <p>
                <strong>“Phí thành viên” </strong>
                nghĩa là các khoản phí mà Thành viên phải trả để sử dụng nền
                tảng công nghệ của Akadon. (Gói lựa chọn dành cho người bán)
              </p>
            </div>
          </span>
        </div>
        <div className="dad">
          <span className="index">3. QUYỀN RIÊNG TƯ</span>
          <span className="sub">
            + Akadon coi trọng việc bảo mật thông tin của bạn. Để bảo vệ quyền
            lợi người dùng, Akadon cung cấp Chính Sách Bảo Mật tại Akadon.vn để
            giải thích chi tiết các hoạt động bảo mật của Akadon. Vui lòng tham
            khảo Chính Sách Bảo Mật để biết cách thức Akadon thu thập và sử dụng
            thông tin liên quan đến Tài Khoản và/hoặc việc sử dụng Dịch Vụ của
            Thành viê(“Thông Tin Thành viên”). Điều Khoản Dịch Vụ này có liên
            quan mật thiết với Chính Sách Bảo Mật. Bằng cách sử dụng Dịch Vụ
            hoặc cung cấp thông tin trên Trang Akadon, Thành viên:
            <span className="sub-text pt-3">
              A. Cho phép akadon thu thập, sử dụng, công bố và/hoặc xử lý các
              nội dung, Thông tin cá nhân của bạn và thông tin thành viên như
              được quy định trong chính sách bảo mật;
            </span>
            <span className="sub-text">
              B. Đồng ý và công nhận rằng các thông tin được cung cấp trên trang
              akadon sẽ thuộc sở hữu chung của bạn và akadon; và
            </span>
            <span className="sub-text mb-3">
              C. Sẽ không, dù là trực tiếp hay gián tiếp, tiết lộ các thông tin
              thành viên cho bất kỳ bên thứ ba nào, hoặc bằng bất kỳ phương thức
              nào cho phép bất kỳ bên thứ ba nào được truy cập hoặc sử dụng
              Thông Tin Người Dùng của bạn.
            </span>
            + Trường hợp Thành viên sở hữu Thông tin cá nhân của Thành viên khác
            thông qua việc sử dụng Dịch Vụ (“Bên Nhận Thông Tin”) theo đây đồng
            ý rằng, mình sẽ tuân thủ mọi qui định pháp luật về bảo vệ an toàn
            thông tin cá nhân liên quan đến những thông tin đó; cho phép Thành
            viên là chủ sở hữu của các thông thông tin cá nhân mà Bên Nhận Thông
            Tin thu thập được (“Bên Tiết Lộ Thông Tin”) được phép xóa bỏ thông
            tin của mình được thu thập từ cơ sở dữ liệu của Bên Nhận Thông Tin;
            và cho phép Bên Tiết Lộ Thông Tin rà soát những thông tin đã được
            thu thập về họ bởi Bên Nhận Thông Tin, phù hợp với hoặc theo yêu cầu
            của các qui định pháp luật hiện hành.
          </span>
        </div>
        <div className="dad">
          <span className="index">4. GIỚI HẠN TRÁCH NHIỆM</span>
          <span className="sub">
            Akadon trao cho Thành viên quyền phù hợp để truy cập và sử dụng các
            Dịch Vụ theo các điều khoản và điều kiện được quy định trong Điều
            Khoản Dịch Vụ này. Tất cả các Nội Dung, thương hiệu, nhãn hiệu dịch
            vụ, tên thương mại, biểu tượng và tài sản sở hữu trí tuệ khác độc
            quyền (“Tài Sản Sở Hữu Trí Tuệ”) hiển thị trên Trang Akadon đều
            thuộc sở hữu của Akadon và bên sở hữu thứ ba, nếu có. Không một bên
            nào truy cập vào Trang Akadon được cấp quyền hoặc cấp phép trực tiếp
            hoặc gián tiếp để sử dụng hoặc sao chép bất kỳ Tài Sản Sở Hữu Trí
            Tuệ nào, cũng như không một bên nào truy cập vào Trang Akadon được
            phép truy đòi bất kỳ quyền, quyền sở hữu hoặc lợi ích nào liên quan
            đến Tài Sản Sở Hữu Trí Tuệ. Bằng cách sử dụng hoặc truy cập Dịch Vụ,
            bạn đồng ý tuân thủ các quy định pháp luật liên quan đến bản quyền,
            thương hiệu, nhãn hiệu dịch vụ hoặc bất cứ quy định pháp luật nào
            khác bảo vệ Dịch Vụ, Trang Akadon và Nội Dung của Trang Akadon. Bạn
            đồng ý không được phép sao chép, phát tán, tái bản, chuyển giao,
            công bố công khai, thực hiện công khai, sửa đổi, phỏng tác, cho
            thuê, bán, hoặc tạo ra các sản phẩm phái sinh của bất cứ phần nào
            thuộc Dịch Vụ, Trang Akadon và Nội Dung của Trang Akadon. Bạn không
            được nhân bản hoặc chỉnh sửa bất kỳ phần nào hoặc toàn bộ nội dung
            của Trang Akadon trên bất kỳ máy chủ hoặc như là một phần của bất kỳ
            website nào khác mà chưa nhận được sự chấp thuận bằng văn bản của
            Akadon. Ngoài ra, bạn đồng ý rằng bạn sẽ không sử dụng bất kỳ robot,
            chương trình do thám (spider) hay bất kỳ thiết bị tự động hoặc
            phương thức thủ công nào để theo dõi hoặc sao chép Nội Dung của
            Akadon khi chưa có sự đồng ý trước bằng văn bản của Akadon (sự chấp
            thuận này được xem như áp dụng cho các công cụ tìm kiếm cơ bản trên
            các webside tìm kiến trên mạng kết nối người dùng trực tiếp đến
            website đó).
          </span>
        </div>
        <div className="dad">
          <span className="index">5. PHẦN MỀM</span>
          <span className="sub">
            Bất kỳ phần mềm nào được cung cấp bởi Akadon tới Thành viên đều
            thuộc phạm vi điều chỉnh của các Điều Khoản Dịch Vụ này. Akadon bảo
            lưu tất cả các quyền liên quan đến phần mềm không được cấp một các
            rõ ràng bởi Akadon theo đây. Bất kỳ tập lệnh hoặc mã code, liên kết
            đến hoặc dẫn chiếu từ Dịch Vụ, đều được cấp phép cho bạn bởi các bên
            thứ ba là chủ sở hữu của tập lệnh hoặc mã code đó chứ không phải bởi
            Akadon.
          </span>
        </div>
        <div className="dad">
          <span className="index">6. TÀI KHOẢN VÀ BẢO MẬT</span>
          <span className="sub">
            <p>
              1. Một vài tính năng của Dịch Vụ chúng tôi yêu cầu phải đăng ký
              một Tài Khoản bằng cách lựa chọn một tên Thành viên không trùng
              lặp (“Tên Đăng Nhập”) và mật khẩu đồng thời cung cấp một số thông
              tin cá nhân nhất định. Bạn có thể sử dụng Tài Khoản của mình để
              truy cập vào các sản phẩm, website hoặc dịch vụ khác mà Akadon cho
              phép, có mối liên hệ hoặc đang hợp tác. Akadon không kiểm tra và
              không chịu trách nhiệm đối với bất kỳ nội dung, tính năng năng,
              bảo mật, dịch vụ, chính sách riêng tư, hoặc cách thực hiện khác
              của các sản phẩm, website hay dịch vụ đó.. Trường hợp bạn sử dụng
              Tài Khoản của mình để truy cập vào các sản phẩm, website hoặc dịch
              vụ khác mà Akadon cho phép, có mối liên hệ hoặc đang hợp tác, các
              điều khoản dịch vụ của những sản phẩm, website hoặc dịch vụ đó,
              bao gồm các chính sách bảo mật tương ứng vẫn được áp dụng khi bạn
              sử dụng các sản phẩm, website hoặc dịch vụ đó ngay cả khi những
              điều khoản dịch vụ này khác với Điều Khoản Dịch Vụ và/hoặc Chính
              Sách Bảo Mật của Akadon.
            </p>
            <p>
              2. Bạn đồng ý (a) giữ bí mật mật khẩu và chỉ sử dụng Tên Đăng Nhập
              và mật khẩu khi đăng nhập, (b) đảm bảo bạn sẽ đăng xuất khỏi tài
              khoản của mình sau mỗi phiên đăng nhập trên Trang Akadon, và (c)
              thông báo ngay lập tức với Akadon nếu phát hiện bất kỳ việc sử
              dụng trái phép nào đối với Tài Khoản, Tên Đăng Nhập và/hoặc mật
              khẩu của bạn. Bạn phải chịu trách nhiệm với hoạt động dưới Tên
              Đăng Nhập và Tài Khoản của mình, bao gồm tổn thất hoặc thiệt hại
              phát sinh từ việc sử dụng trái phép liên quan đến mật khẩu hoặc từ
              việc không tuân thủ Điều Khoản này của Thành viên.
            </p>
            <p>
              3. Bạn đồng ý rằng Akadon có toàn quyền xóa Tài Khoản và Tên Đăng
              Nhập của Thành viên ngay lập tức, gỡ bỏ hoặc hủy từ Trang Akadon
              bất kỳ Nội Dung nào liên quan đến Tài Khoản và Tên Đăng Nhập của
              Thành viên với bất kỳ lý do nào mà có hoặc không cần thông báo hay
              chịu trách nhiệm với Thành viên hay bên thứ ba nào khác. Căn cứ để
              thực hiện các hành động này có thể bao gồm (a) Tài Khoản và Tên
              Đăng Nhập không hoạt động trong thời gian dài, (b) vi phạm điều
              khoản hoặc tinh thần của các Điều Khoản Dịch Vụ này, (c) có hành
              vi bất hợp pháp, lừa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm
              dụng, (d) có nhiều tài khoản người dùng khác nhau, (e) mua sản
              phẩm trên Trang Akadon với mục đích kinh doanh, (f) mua hàng số
              lượng lớn từ một Người Bán hoặc một nhóm Người Bán có liên quan,
              (g) lạm dụng mã giảm giá hoặc tài trợ hoặc quyền lợi khuyến mại
              (bao gồm việc bán mã giảm giá cho các bên thứ ba cũng như lạm dụng
              mã giảm giá ở Trang Akadon), (h) có hành vi gây hại tới những
              Thành viên khác, các bên thứ ba hoặc các lợi ích kinh tế của
              Akadon. Việc sử dụng Tài Khoản cho các mục đích bất hợp pháp, lừa
              đảo, quấy rối, xâm phạm, đe dọa hoặc lạm dụng có thể được gửi cho
              cơ quan nhà nước có thẩm quyền theo quy định pháp luật.
            </p>
            <p>
              4. Thành viên có thể yêu cầu xóa tài khoản bằng cách thông báo
              bằng văn bản đến Akadon. Tuy nhiên, Thành viên vẫn phải chịu trách
              nhiệm và nghĩa vụ đối với bất kỳ giao dịch nào chưa hoàn thành
              (phát sinh trước hoặc sau khi tài khoản bị xóa) hay việc vận
              chuyển hàng hóa liên quan đến tài khoản bị yêu cầu xóa. Khi đó,
              theo Điều Khoản Dịch Vụ, Thành viên phải liên hệ với Akadon sau
              khi đã nhanh chóng và hoàn tất việc thực hiện và hoàn thành các
              giao dịch chưa hoàn tất. Người Sử Dụng chịu trách nhiệm đối với
              yêu cầu xóa tài khoản của mình.
            </p>
            <p>
              5. Bạn chỉ có thể sử dụng Dịch Vụ và/hoặc mở Tài Khoản tại Akadon
              nếu bạn đáp ứng đủ các điều kiện để chấp nhận Điều Khoản Dịch Vụ
              này.
            </p>
          </span>
        </div>
        <div className="dad">
          <span className="index">7. ĐIỀU KHOẢN SỬ DỤNG</span>
          <span className="sub">
            <p>
              - Quyền được phép sử dụng Trang Akadon và Dịch Vụ có hiệu lực cho
              đến khi bị chấm dứt. Quyền được phép sử dụng sẽ bị chấm dứt theo
              Điều Khoản Dịch Vụ này hoặc trường hợp Thành viên vi phạm bất cứ
              điều khoản hoặc điều kiện nào được quy định tại Điều Khoản Dịch Vụ
              này. Trong trường hợp đó, Akadon có thể chấm dứt việc sử dụng của
              Thành viên bằng hoặc không cần thông báo.
            </p>
            <p>
              - Khi đăng ký trở thành thành viên của Akadon và được Akadon đồng
              ý và kích hoạt tài khoản, thành viên sẽ được thực hiện mua bán
              dịch vụ qua Nền tảng Akadon ;
            </p>
            <p>
              - Mỗi thành viên sẽ được cấp một tên đăng ký và mật khẩu riêng để
              sử dụng trong việc thực hiện mua bán và quản lý các giao dịch qua
              Nền tảng Akadon;
            </p>
            <p>
              - Thành viên sẽ được nhân viên của Akadon hướng dẫn sử dụng các
              công cụ, tính năng phục vụ cho việc tiến hành giao dịch, quản lý
              giao dịch và sử dụng các dịch vụ tiện ích khác trên Nền tảng
              Akadon;
            </p>
            <p>
              - Thành viên có quyền đóng góp ý kiến cho sàn giao dịch TMĐT
              Akadon trong quá trình hoạt động. Các kiến nghị được gửi trực tiếp
              bằng thư, fax, điện thoại, qua Nền tảng Akadon, thư điện tử hoặc
              các kênh phản ánh khác không trái pháp luật đến sàn giao dịch TMĐT
              Akadon.
            </p>
            <p>
              - Đọc và hiểu rõ quy chế hoạt động, điều khoản, điều kiện sử dụng
              dịch vụ sàn giao dịch TMĐT Akadon và dịch vụ được cung cấp qua sàn
              giao dịch TMĐT Akadon trước khi đăng ký tài khoản và sử dụng dịch
              vụ, và đọc và hiểu các điều khoản, điều kiện sử dụng dịch vụ khi
              nhận được thông báo về thay đổi, điều chỉnh quy chế hoạt động,
              điều khoản, điều kiện sử dụng dịch vụ này. Việc thành viên sử dụng
              dịch vụ hoặc tiếp tục sử dụng dịch vụ được coi là thành viên đã
              đọc, hiểu và đồng ý với quy chế hoạt động, điều khoản, điều kiện
              sử dụng dịch vụ sàn giao dịch TMĐT Akadon và dịch vụ được cung cấp
              qua sàn giao dịch TMĐT Akadon;
            </p>
            <p>
              - Tự chịu trách nhiệm về bảo mật, lưu giữ và mọi hoạt động sử dụng
              dịch vụ dưới tên đăng ký, mật khẩu và hòm thư điện tử của mình;
            </p>
            <p>
              - Thông báo kịp thời cho Akadon về những hành vi sử dụng trái
              phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu
              của mình để hai bên cùng hợp tác xử lý;
            </p>
            <p>
              - Cam kết những thông tin thành viên cung cấp cho Akadon là chính
              xác và hoàn chỉnh và giữ cho thông tin của thành viên trên Nền
              tảng Akadon được cập nhật, chính xác và hoàn chỉnh;
            </p>
            <p>
              -Tự chịu trách nhiệm về nội dung, hình ảnh, thông tin doanh nghiệp
              và các thông tin khác, cũng như toàn bộ quá trình giao dịch với
              các đối tác qua Nền tảng Akadon;
            </p>
            <p>
              - Hợp tác và cung cấp thông tin cần thiết cho Akadon để phục vụ
              việc giải quyết tranh chấp phát sinh giữa người mua và nhà cung
              cấp được thực hiện qua Nền tảng Akadon;
            </p>
            <p>
              - Cam kết, đồng ý không sử dụng dịch vụ của sàn giao dịch TMĐT
              Akadon cho những mục đích bất hợp pháp, không hợp lý, lừa đảo, đe
              dọa, thăm dò thông tin bất hợp pháp, phá hoại, tạo ra và phát tán
              vi-rút gây hư hại tới hệ thống, cấu hình, truyền tải thông tin của
              sàn giao dịch TMĐT Akadon hay sử dụng dịch vụ của Akadon cho mục
              đích đầu cơ, tạo lệnh đặt dịch vụ giả, lũng đoạn thị trường, bao
              gồm phục vụ cho việc phán đoán nhu cầu thị trường. Trong trường
              hợp vi phạm thì thành viên phải chịu trách nhiệm về các hành vi
              của mình trước pháp luật;
            </p>
            <p>
              - Cam kết không thay đổi, chỉnh sửa, sao chép, truyền bá, phân
              phối, cung cấp và tạo những công cụ tương tự của dịch vụ do Akadon
              cung cấp cho một bên thứ ba nếu không được sự đồng ý của Akadon;
            </p>
            <p>
              - Không được hành động gây mất uy tín của sàn giao dịch TMĐT
              Akadon dưới mọi hình thức, bao gồm nhưng không giới hạn, việc gây
              mất đoàn kết giữa các thành viên bằng cách sử dụng tên đăng ký thứ
              hai, thông qua một bên thứ ba, hoặc tuyên truyền, phổ biến những
              thông tin không có lợi cho uy tín của Akadon.
            </p>
            <p>- Thành viên không được phép:</p>
            <div className="ml-3 mt-2 mb-2">
              <p>
                + tải lên, đăng, truyền tải hoặc bằng cách khác công khai bất cứ
                Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối,
                gây hoang mang, lo lắng, xuyên tạc, phỉ báng, xúc phạm, khiêu
                dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, gây căm
                phẫn, hoặc phân biệt chủng tộc, dân tộc hoặc bất kỳ nội dung
                không đúng đắn nào khác;
              </p>
              <p>
                + vi phạm pháp luật, quyền lợi của bên thứ ba hoặc Chính Sách
                Cấm/Hạn Chế Sản Phẩm của Akadon;
              </p>
              <p>
                + đăng tải, truyền tin, hoặc bằng bất kỳ hình thức nào khác hiển
                thị bất kỳ Nội dung nào có sự xuất hiện của người chưa thành
                niên hoặc sử dụng Dịch vụ gây tổn hại cho người chưa thành niên
                dưới bất kỳ hình thức nào;
              </p>
              <p>
                + sử dụng Dịch Vụ hoặc đăng tải Nội Dung để mạo danh bất kỳ cá
                nhân hoặc tổ chức nào, hoặc bằng cách nào khác xuyên tạc cá nhân
                hoặc tổ chức;
              </p>
              <p>
                + giả mạo các tiêu đề hoặc bằng cách khác ngụy tạo các định dạng
                nhằm che giấu nguồn gốc của bất kỳ Nội Dung nào được tryền tải
                thông qua Dịch Vụ;
              </p>
              <p>+ gỡ bỏ bất kỳ thông báo độc quyền nào từ Trang Akadon;</p>
              <p>
                + gây ra, chấp nhận hoặc ủy quyền cho việc sửa đổi, cấu thành
                các sản phẩm phái sinh, hoặc chuyển thể của Dich Vụ mà không
                được sự cho phép rõ ràng của Akadon;
              </p>
              <p>
                + sử dụng Dịch Vụ phục vụ lợi ích của bất kỳ bên thứ ba nào hoặc
                bất kỳ hành vi nào không được chấp nhận theo Điều Khoản Dịch Vụ
                này;
              </p>
              <p>
                + sử dụng Dịch Vụ hoặc đăng tải Nội Dung cho mục đích gian lận,
                không hợp lý, sai trái, gây hiểu nhầm hoặc gây nhầm lẫn;
              </p>
              <p>
                + mở và vận hành nhiều tài khoản người dùng khác nhau liên quan
                đến bất kỳ hành vi nào vi phạm điều khoản hoặc tinh thần của
                Điều Khoản Dịch Vụ này;
              </p>
              <p>
                + truy cập sàn giao dịch thương mại điện tử Akadon, mở tài khoản
                hoặc bằng cách khác truy cập tài khoản người dùng của mình thông
                qua bất kỳ phần mềm hoặc phần cứng không được chấp thuận hoặc
                cung cấp bởi Akadon, bao gồm phần mềm giả lập, thiết bị giả lập,
                phần mềm tự động hoặc bất kỳ phần mềm, thiết bị hoặc phần cứng
                nào có chức năng tương tự.
              </p>
              <p>
                + chỉnh sửa giá của bất kỳ sản phẩm nào hoặc can thiệp vào danh
                mục hàng hóa của Thành viên khác.
              </p>
              <p>
                + thực hiện bất kỳ hành động nào làm sai lệch hệ thống đánh giá
                hoặc tiếp nhận phản hồi của Akadon;
              </p>
              <p>
                + cố gắng chuyển đổi mã chương trình, đảo ngược kỹ thuật, tháo
                gỡ hoặc xâm nhập (hack) Dịch Vụ (hoặc bất cứ hợp phần nào theo
                đó); hoặc phá bỏ hoặc vượt qua bất kỳ công nghệ mã hóa hoặc biện
                pháp bảo mật nào được Akadon áp dụng đối với các Dịch Vụ và/hoặc
                các dữ liệu được truyền tải, xử lý hoặc lưu trữ bởi Akadon;
              </p>
              <p>
                + khai thác hoặc thu thập bất kỳ thông tin nào liên quan đến Tài
                Khoản của Người Sử Dụng khác, bao gồm bất kỳ thông tin hoặc
                Thông tin cá nhân nào;
              </p>
              <p>
                + tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác
                công khai bất kỳ Nội Dung nào mà bạn không được cho phép theo
                bất kỳ luật hoặc quan hệ hợp đồng hoặc tín thác nào (chẳng hạn
                thông tin nội bộ, thông tin độc quyền và thông tin mật được biết
                hoặc tiết lộ như một phần của quan hệ lao động hoặc theo các
                thỏa thuận bảo mật);
              </p>
              <p>
                + tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác
                công khai bất kỳ Nội Dung nào dẫn đến trường hợp vi phạm các
                quyền về sáng chế, thương hiệu, bí quyết kinh doanh, bản quyền
                hoặc bất cứ đặc quyền nào của bất cứ bên nào;
              </p>
              <p>
                + tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác
                công khai bất kỳ quảng cáo, các tài liệu khuyến mại, “thư quấy
                rối”, “thư rác”, “chuỗi ký tự” không được phép hoặc không hợp
                pháp, hoặc bất kỳ hình thức lôi kéo không được phép nào khác;
              </p>
              <p>
                + tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác
                công khai bất cứ tài liệu chứa các loại vi-rút, worm, trojan
                hoặc bất kỳ các mã, tập tin hoặc chương trình máy tính được
                thiết kế để trực tiếp hoặc gián tiếp gây cản trở, điều khiển,
                gián đoạn, phá hỏng hoặc hạn chế các chức năng hoặc tổng thể của
                bất kỳ phần mềm hoặc phần cứng hoặc dữ liệu hoặc thiết bị viễn
                thông của máy tính;
              </p>
              <p>
                + làm gián đoạn các dòng tương tác thông thường, đẩy nhanh tốc
                độ “lướt (scroll)” màn hình hơn những Thành viên khác có thể đối
                với Dịch Vụ, hoặc bằng cách khác thực hiện thao tác gây ảnh
                hưởng tiêu cực đến khả năng tham gia giao dịch thực của những
                Thành viên khác,
              </p>
              <p>
                + can thiệp, điều khiển hoặc làm gián đoạn Dịch Vụ hoặc máy chủ
                hoặc hệ thống được liên kết với Dịch Vụ hoặc tới việc sử dụng và
                trải nghiệm Dịch Vụ của Thành viên khác, hoặc không tuân thủ bất
                kỳ các yêu cầu, quy trình, chính sách và luật lệ đối với các hệ
                thống được liên kết với Trang Akadon;
              </p>
              <p>
                + thực hiện bất kỳ hành động hoặc hành vi nào có thể trực tiếp
                hoặc gián tiếp phá hủy, vô hiệu hóa, làm quá tải, hoặc làm suy
                yếu Dịch Vụ hoặc máy chủ hoặc hệ thống liên kết với Dịch Vụ;
              </p>
              <p>
                + sử dụng Dịch Vụ để vi phạm pháp luật, quy chế, quy tắc, chỉ
                thị, hướng dẫn, chính sách áp dụng của địa phương, liên bang,
                quốc gia hoặc quốc tế (có hoặc chưa có hiệu lực) một cách có chủ
                ý hoặc vô ý liên quan đến phòng chống rửa tiền hoặc phòng chống
                khủng bố;
              </p>
              <p>
                + sử dụng Dịch Vụ để vi phạm hoặc phá vỡ bất kỳ hình phạt hay
                lệnh cấm vận nào được quản lý hay thực thi bởi các cơ quan có
                liên quan.
              </p>
              <p>
                + sử dụng Dịch Vụ để xâm hại tới quyền riêng tư của người khác
                hoặc để “lén theo dõi” hoặc bằng cách khác quấy rối người khác;
              </p>
              <p>
                + xâm phạm các quyền của Akadon, bao gồm bất kỳ quyền sở hữu trí
                tuệ và gây nhầm lẫn cho các quyền đó;
              </p>
              <p>
                + sử dụng Dịch vụ để thu thập hoặc lưu trữ Thông tin cá nhân của
                Thành viên khác liên quan đến các hành vi và hoạt động bị cấm
                như đề cập ở trên; và/hoặc
              </p>
              <p>
                + liệt kê các hàng hóa xâm phạm quyền tác giả, nhãn hiệu hoặc
                các quyền sở hữu trí tuệ khác của các bên thứ ba hoặc sử dụng
                Dịch Vụ theo các cách thức có thể xâm phạm đến quyền sở hữu trí
                tuệ của các bên khác.
              </p>
            </div>

            <p>
              - Thành viên hiểu rằng các Nội Dung, dù được đăng công khai hoặc
              truyền tải riêng tư, là hoàn toàn thuộc trách nhiệm của người đã
              tạo ra Nội Dung đó. Điều đó nghĩa là bạn, không phải Akadon, phải
              hoàn toàn chịu trách nhiệm đối với những Nội Dung mà bạn tải lên,
              đăng, gửi thư điện tử, chuyển tải hoặc bằng cách nào khác công
              khai trên Trang Akadon. Thành viên hiểu rằng bằng cách sử dụng
              Trang Akadon, bạn có thể gặp phải Nội Dung mà bạn cho là phản cảm,
              không đúng đắn hoặc chưa phù hợp. Akadon sẽ không chịu trách nhiệm
              đối với Nội Dung, bao gồm lỗi hoặc thiếu sót liên quan đến Nội
              Dung, hoặc tổn thất hoặc thiệt hại xuất phát từ việc sử dụng, hoặc
              dựa trên, Nội Dung được đăng tải, gửi thư, chuyển tải hoặc bằng
              cách khác công bố trên Trang Akadon.
            </p>
            <p>
              - Thành viên thừa nhận rằng Akadon và các bên được chỉ định của
              mình có toàn quyền (nhưng không có nghĩa vụ) sàng lọc, từ chối,
              xóa, dừng, tạm dừng, gỡ bỏ hoặc dời bất kỳ Nội Dung có sẵn trên
              Trang Akadon, bao gồm bất kỳ Nội Dung hoặc thông tin nào bạn đã
              đăng. Akadon có quyền gỡ bỏ Nội Dung (i) xâm phạm đến Điều Khoản
              Dịch Vụ; (ii) trong trường hợp Akadon nhận được khiếu nại hơp lệ
              theo quy định pháp luật từ Thành viên khác; (iii) trong trường hợp
              Akadon nhận được thông báo hợp lệ về vi phạm quyền sở hữu trí tuệ
              hoặc yêu cầu pháp lý cho việc gỡ bỏ; hoặc (iv) những nguyên nhân
              khác theo quy định pháp luật. Akadon có quyền chặn các liên lạc
              (bao gồm việc cập nhật trạng thái, đăng tin, truyền tin và/hoặc
              tán gẫu) về hoặc liên quan đến Dịch Vụ như nỗ lực của chúng tôi
              nhằm bảo vệ Dịch Vụ hoặc Thành viên của Akadon, hoặc bằng cách
              khác thi hành các điều khoản trong Điều Khoản Dịch Vụ này. Thành
              viên đồng ý rằng mình phải đánh giá, và chịu mọi rủi ro liên quan
              đến, việc sử dụng bất kỳ Nội Dung nào, bao gồm bất kỳ việc dựa vào
              tính chính xác, đầy đủ, hoặc độ hữu dụng của Nội Dung đó. Liên
              quan đến vấn đề này, Thành viên thừa nhận rằng mình không phải và,
              trong giới hạn tối đa pháp luật cho phép, không cần dựa bào bất kỳ
              Nội Dung nào được tạo bởi Akadon hoặc gửi cho Akadon, bao gồm các
              thông tin trên các Diễn Đàn Akadon hoặc trên các phần khác của
              Trang Akadon.
            </p>
            <p>
              - Thành viên chấp thuận và đồng ý rằng Akadon có thể truy cập, duy
              trì và tiết lộ thông tin Tài Khoản của Thành viên trong trường hợp
              pháp luật có yêu cầu hoặc theo lệnh của tòa án hoặc cơ quan chính
              phủ hoặc cơ quan nhà nước có thẩm quyền yêu cầu Akadon hoặc những
              nguyên nhân khác theo quy định pháp luật: (a) tuân thủ các thủ tục
              pháp luật; (b) thực thi Điều Khoản Dịch Vụ; (c) phản hồi các khiếu
              nại về việc Nội Dung xâm phạm đến quyền lợi của bên thứ ba; (d)
              phản hồi các yêu cầu của Thành viên liên quan đến chăm sóc khách
              hàng; hoặc (e) bảo vệ các quyền, tài sản hoặc an toàn của Akadon,
              Thành viên và/hoặc cộng đồng.
            </p>
          </span>
        </div>
        <div className="dad">
          <span className="index">Chính sách bảo hành hàng hóa</span>
          <span className="sub">
            Website akadon.edu.vn là website cung cấp nền tảng kết nối nhà cung
            ứng dịch vụ gia sư với khách hàng, giao dịch giữa nhà cung ứng dịch
            vụ và khách hàng là dạy thêm và học thêm, nên AKADON không có quy
            trình bảo hành, bảo trì sản phẩm.
            <p>
              Tuy nhiên AKADON khuyến khích người mua cần tham khảo kỹ nhà cung
              ứng dịch vụ về chính sách bảo hành, bảo trì dịch vụ (nếu có).
            </p>
            * Mọi chi tiết hoặc thắc mắc quý khách vui lòng liên hệ với chúng
            tôi qua số điện thoại hỗ trợ 0858836632 hoặc để lại lời nhắn tại
            website <Link to="/">https://akadon.edu.vn</Link>.
          </span>
        </div>
        <div className="dad">
          <span className="index">
            + Chính sách đổi, trả sản phẩm và hoàn trả tiền cho khách hang
          </span>
          <span className="sub">
            <span>
              Website akadon.edu.vn là website cung cấp nền tảng kết nối nhà
              cung ứng dịch vụ gia sư với khách hàng, việc mua bán, giao dịch
              diễn ra trực tiếp giữa nhà cung ứng dịch vụ và khách hàng là dạy
              thêm và học thêm nên AKADON không có Chính sách hoàn trả hàng hóa
            </span>
            Tuy nhiên đối với những trường hợp:
            <div className="ml-3 mt-2">
              <p>. Nhà cung ứng dịch vụ không hoàn tất dịch vụ;</p>
              <p>. Thực hiện không đúng tiến độ;</p>
              <p>. Cung cấp dịch vụ không đúng như thỏa thuận...</p>
              thì người mua xác nhận tình trạng ngay, không thanh toán, hoặc yêu
              cầu hoàn phí (nếu đã thanh toán trước) và báo lại cho chúng tôi
              trong vòng 24 giờ.
            </div>
          </span>
        </div>
        <div className="dad">
          <span className="index">8. VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</span>
          <span className="sub">
            + Việc vi phạm chính sách này có thể dẫn tới một số hành động, bao
            gồm bất kỳ hoặc tất cả các hành động sau:
            <div className="ml-3 mt-2 mb-2">
              <p>- Xóa danh mục sản phẩm;</p>
              <p>- Giới hạn quyền sử dụng Tài Khoản;</p>
              <p>- Đình chỉ và chấm dứt Tài Khoản;</p>
            </div>
            <p>
              + Thu hồi tiền/tài sản có được do hành vi gian lận, và các chi phí
              có liên quan như chi phí vận chuyển của đơn hàng, phí thanh toán…;
            </p>
            <p>+ Cáo buộc hình sự;</p>+ Áp dụng biện pháp dân sự, bao gồm khiếu
            nại bồi thường thiệt hại và/hoặc áp dụng biện pháp khẩn cấp tạm
            thời;
            <p>
              + Các hành động hoặc biện pháp chế tài khác theo Tiêu Chuẩn Cộng
              Đồng, Quy Chế Hoạt Động, hoặc các Chính Sách Akadon.
            </p>
            + Nếu bạn phát hiện Thành viên trên Trang Akadon của chúng tôi có
            hành vi vi phạm Điều Khoản Dịch Vụ, vui lòng liên hệ Akadon
          </span>
        </div>
        <div className="dad">
          <span className="index">9. BỒI THƯỜNG</span>
          <span className="sub">
            Bạn đồng ý bồi thường, bảo vệ và không gây hại cho Akadon, công ty
            con, công ty liên kết, giám đốc, viên chức, đại lý, đồng sở hữu
            thương hiệu hoặc đối tác, và nhân viên của Akadon (gọi chung là “Bên
            Được Bồi Thường”) liên quan đến khiếu nại, hành động, thủ tục tố
            tụng, và các vụ kiện cũng như nghĩa vụ, tổn thất, thanh toán, khoản
            phạt, tiền phạt, chi phí và phí tổn có liên quan (bao gồm chi phí
            giải quyết tranh chấp) do Bên Được Bồi Thường gánh chịu, phát sinh
            từ (a) giao dịch được thực hiện trên Trang Akadon, hoặc tranh chấp
            liên quan đến giao dịch đó (trừ trường hợp Akadon hoặc các công ty
            liên kết của Akadon là Người Bán đối với giao dịch liên quan đến
            khiếu nại), (b) Chính Sách Đảm Bảo của Akadon, (c) việc tổ chức,
            hoạt động, quản trị và/hoặc điều hành các Dịch Vụ được thực hiện bởi
            hoặc đại diện cho Akadon, (d) vi phạm hoặc không tuân thủ bất kỳ
            điều khoản nào trong các Điều Khoản Dịch Vụ này hoặc bất kỳ chính
            sách hoặc hướng dẫn nào được tham chiếu theo đây, (e) việc bạn sử
            dụng hoặc sử dụng không đúng Dịch Vụ, hoặc (f) vi phạm của bạn đối
            với bất kỳ luật hoặc bất kỳ các quyền của bên thứ ba nào, hoặc (g)
            bất kỳ Nội Dung nào được đăng tải bởi Thành viên.
          </span>
        </div>
        <div className="dad">
          <span className="index">10. TÍNH RIÊNG LẺ</span>
          <span className="sub">
            Nếu bất kì điều khoản nào trong Điều Khoản Dịch Vụ này không hợp
            pháp, bị bãi bỏ, hoặc vì bất kỳ lý do nào không thể thực thi theo
            pháp luật, thì điều khoản đó sẽ được tách ra khỏi các điều khoản và
            điều kiện này và sẽ không ảnh hưởng tới hiệu lực cũng như tính thi
            hành của bất kỳ điều khoản còn lại nào cũng như không ảnh hưởng tới
            hiệu lực cũng như tính thi hành của điều khoản sẽ được xem xét theo
            luật.
          </span>
        </div>
        <div className="dad">
          <span className="index">11. LUẬT ÁP DỤNG</span>
          <span className="sub">
            Các Điều Khoản Dịch Vụ này sẽ được điều chỉnh bởi và diễn giải theo
            luật pháp của Việt Nam. Bất kỳ tranh chấp, tranh cãi, khiếu nại hoặc
            sự bất đồng dưới bất cứ hình thức nào phát sinh từ hoặc liên quan
            đến các Điều Khoản Dịch Vụ này chống lại hoặc liên quan đến Akadon
            hoặc bất kỳ Bên Được Bồi Thường nào thuộc đối tượng của các Điều
            Khoản Dịch Vụ này sẽ được giải quyết bằng Trung Tâm Trọng Tài Quốc
            Tế Việt Nam (VIAC). Ngôn ngữ phán xử của trọng tài là Tiếng Việt.
          </span>
        </div>
        <div className="dad">
          <span className="index">12. QUY ĐỊNH CHUNG</span>
          <span className="sub">
            <p>
              + Akadon bảo lưu tất cả các quyền lợi không được trao theo đây.
            </p>
            <p>
              + Akadon có quyền chỉnh sửa các Điều Khoản Dịch Vụ này vào bất cứ
              thời điểm nào thông qua việc đăng tải các Điều Khoản Dịch Vụ được
              chỉnh sửa lên Trang Akadon. Việc Người Dùng tiếp tục sử dụng Trang
              Akadon sau khi việc thay đổi được đăng tải sẽ cấu thành việc Thành
              viên chấp nhận các Điều Khoản Dịch Vụ được chỉnh sửa.
            </p>
            <p>
              + Thành viên không được phép chuyển giao, cấp lại quyền hoặc
              chuyển nhượng bất kỳ các quyền hoặc nghĩa vụ được cấp cho Thành
              viên theo đây.
            </p>
            <p>
              + Không một quy định nào trong các Điều Khoản Dịch Vụ này sẽ cấu
              thành quan hệ đối tác, liên doanh hoặc quan hệ đại lý – chủ sở hữu
              giữa bạn và Akadon.
            </p>
            <p>
              + Tại bất kỳ hoặc các thời điểm nào, nếu Akadon không thể thực
              hiện được bất kỳ điều khoản nào theo đây sẽ không ảnh hưởng, dưới
              bất kỳ hình thức nào, đến các quyền của Akadon vào thời điểm sau
              đó để thực thi các quyền này trừ khi việc thư thi các quyền này
              được miễn trừ bằng văn bản.
            </p>
            <p>
              + Các Điều Khoản Dịch Vụ này hoàn toàn phục vụ cho lợi ích của
              Akadon và Thành viên mà vì lợi ích của bất kỳ cá nhân hay tổ chức
              nào khác, trừ các công ty liên kết và các công ty con của Akadon
              (và cho từng bên kế thừa hay bên nhận chuyển giao của Akadon hoặc
              của các công ty liên kết và công ty con của Akadon).
            </p>
            <p>
              + Các điều khoản được quy định trong Điều Khoản Dịch Vụ này và bất
              kỳ các thỏa thuận và chính sách được bao gồm hoặc được dẫn chiếu
              trong các Điều Khoản Dịch Vụ này cấu thành nên sự thỏa thuận và
              cách hiểu tổng thể của các bên đối với Dịch Vụ và Trang Akadon và
              thay thế bất kỳ thỏa thuận hoặc cách hiểu trước đây giữa các bên
              liên quan đến vấn đề đó. Với việc các bên giao kết thỏa thuận được
              tạo thành theo các Điều Khoản Dịch Vụ này, các bên không dựa vào
              bất kỳ tuyên bố, khẳng định, đảm bảo, cách hiểu, cam kết, lời hứa
              hoặc cam đoan nào của bất kỳ người nào trừ những điều được nêu rõ
              trong các Điều Khoản Dịch Vụ này. Các Điều Khoản Dịch Vụ này có
              thể sẽ không mâu thuẫn, giải thích hoặc bổ sung như là bằng chứng
              của các thỏa thuận trước, bất kỳ thỏa thuận miệng hiện tại nào
              hoặc bất kỳ các điều khoản bổ sung nhất quán nào.
            </p>
            <p>
              + Bạn đồng ý tuân thủ mọi quy định pháp luật hiện hành liên quan
              đến chống tham nhũng và chống hối lộ.
            </p>
            <p>
              + Nếu bạn có bất kỳ câu hỏi hay thắc mắc nào liên quan đến Điều
              Khoản Dịch Vụ hoặc các vấn đề phát sinh liên quan đến Điều Khoản
              Dịch Vụ trên Trang Akadon, vui lòng liên hệ Akadon
            </p>
            <p>
              Bằng việc sử dụng Nền tảng, bạn cam đoan và bảo đảm một cách cụ
              thể rằng bạn có đầy đủ quyền hợp pháp để chấp thuận và đồng ý với
              Điều khoản sử dụng và rằng bạn đủ mười tám (18) tuổi. Xin lưu ý
              Nền tảng không dành cho người dưới mười tám (18) tuổi hay những
              đối tượng bị ngăn cấm tham gia vào một thỏa thuận mang tính hợp
              đồng dưới bất kỳ hình thức nào. Bằng việc sử dụng Nền tảng, bạn
              cam đoan và bảo đảm thêm rằng bạn có quyền, thẩm quyền và năng lực
              để sử dụng Nền tảng và để tuân theo Điều khoản sử dụng. Bạn cũng
              đồng thời xác nhận rằng những thông tin bạn cung cấp là đúng, đầy
              đủ và chính xác. Việc bạn sử dụng Nền tảng là để phục vụ riêng cho
              cá nhân bạn. Bạn cam kết sẽ không ủy quyền cho người khác sử dụng
              danh tính hoặc tư cách người dùng Nền tảng của mình, và bạn không
              được chuyển giao hoặc bằng cách khác chuyển nhượng tài khoản người
              dùng của bạn cho bất kỳ cá nhân hoặc tổ chức nào khác. Khi sử dụng
              Nền tảng, bạn đồng ý tuân thủ tất cả các luật lệ áp dụng tại quốc
              gia của mình hoặc tại quốc gia, tiểu bang và thành phố nơi bạn có
              mặt khi đang sử dụng Nền tảng.
            </p>
            <p>
              Bạn chỉ có thể sử dụng Nền tảng theo các phương thức được hỗ trợ
              trên Nền tảng phụ thuộc vào tính sẵn có của công nghệ mà Akadon sử
              dụng. Bạn có trách nhiệm kiểm tra và đảm bảo rằng bạn đang sử dụng
              đúng nền tảng. Akadon không chịu trách nhiệm đối với việc bạn
              không có một thiết bị tương thích hoặc nếu bạn đã sử dụng một
              phiên bản không đúng hoặc không tương thích dành cho thiết bị của
              bạn. Công ty bảo lưu quyền không cho phép bạn sử dụng Nền tảng
              trong trường hợp bạn sử dụng Nền tảng trên một thiết bị không
              tương thích hay không được cho phép hoặc sử dụng với mục đích khác
              với mục đích mà Nền tảng hỗ trợ.
            </p>
            Bằng việc sử dụng Nền tảng, bạn đồng ý rằng:
            <ul>
              <li>Bạn sẽ chỉ sử dụng Nền tảng cho các mục đích hợp pháp;</li>
              <li>
                Bạn sẽ chỉ sử dụng Nền tảng phù hợp với mục đích mà Nền tảng hỗ
                trợ;
              </li>
              <li>
                Bạn sẽ không sử dụng Nền tảng để gửi và lưu trữ bất kỳ tài liệu
                hoặc thông tin trái phép nào hoặc phục vụ các mục đích lừa đảo;
              </li>
              <li>
                Bạn sẽ không sử dụng Nền tảng để làm phiền, quấy rối, quấy nhiễu
                hoặc thực hiện đặt sử dụng Nền tảng giả mạo;
              </li>
              <li>
                Bạn sẽ không sử dụng Nền tảng vì mục đích nào khác ngoài mục
                đích sử dụng Nền tảng;
              </li>
              <li>
                Bạn sẽ không liên hệ với Nhà Cung cấp Nền tảng vì những mục đích
                khác ngoài mục đích sử dụng Nền tảng trừ trường hợp thực hiện
                quyền khiếu nại theo quy định pháp luật;
              </li>
              <li>
                Bạn sẽ không sử dụng thông tin của Nhà Cung cấp Nền tảng vì mục
                đích nào khác ngoài mục đích sử dụng Nền tảng trừ trường hợp
                thực hiện quyền khiếu nại theo quy định pháp luật;
              </li>
              <li>
                Bạn sẽ không thực hiện những hành động có thể làm ảnh hưởng xấu
                đến hoạt động bình thường của Nền tảng;
              </li>
              <li>
                Bạn sẽ không hoặc không có ý định, cho dù là cố ý hay vô ý, gây
                ra thiệt hại đối với Nhà Cung cấp Nền tảng;
              </li>
              <li>
                Bạn sẽ không làm tổn hại đến Nền tảng dưới bất kỳ hình thức nào;
              </li>
              <li>
                Bạn sẽ không sao chép, hoặc phân phối Nền tảng hoặc nội dung
                khác mà không có sự cho phép bằng văn bản của Công ty;
              </li>
              <li>
                Bạn sẽ chỉ sử dụng Nền tảng cho riêng bạn và sẽ không bán lại
                cho một bên thứ ba;
              </li>
              <li>
                Bạn sẽ bảo toàn và bảo mật mật khẩu tài khoản của mình hoặc bất
                kỳ phương thức nhận dạng nào mà chúng tôi cung cấp để bạn sử
                dụng Nền tảng và/hoặc tiếp cận sử dụng Nền tảng;
              </li>
              <li>
                Bạn sẽ cung cấp cho chúng tôi các thông tin nhận dạng như họ và
                tên, địa chỉ liên lạc, số điện thoại, địa chỉ email, số tài
                khoản, số thẻ thanh toán mà chúng tôi có thể yêu cầu một cách
                hợp lý nhằm cung cấp Nền tảng và các hoạt động khác có liên quan
                đến việc cung cấp Nền tảng;
              </li>
              <li>
                Bạn đồng ý cung cấp thông tin chính xác, cập nhật và đầy đủ theo
                yêu cầu của Nền tảng và có trách nhiệm duy trì và cập nhật thông
                tin của bạn một cách kịp thời để đảm bảo rằng các thông tin này
                luôn chính xác, cập nhật và đầy đủ vào mọi thời điểm trong thời
                hạn của Thỏa thuận này. Bạn đồng ý rằng Công ty có thể tin cậy
                vào tính chính xác, cập nhật và đầy đủ của các thông tin mà bạn
                cung cấp. Bạn xác nhận rằng nếu các thông tin về bạn là không
                đúng, thiếu chính xác, chưa cập nhật hoặc không đầy đủ trên bất
                kỳ phương diện nào thì Công ty có quyền, nhưng không phải nghĩa
                vụ, chấm dứt Thỏa thuận này và chấm dứt việc sử dụng Nền tảng
                của bạn bằng một thông báo được gửi qua số điện thoại hoặc địa
                chỉ email đăng ký của bạn nhằm đảm bảo việc nhận diện khách hàng
                được chính xác;
              </li>
              <li>
                Bạn sẽ chỉ sử dụng một điểm truy cập hoặc tài khoản dữ liệu (AP)
                mà bạn được phép sử dụng;
              </li>
              <li>
                Bạn không được sử dụng bất kỳ phương tiện nào để lừa đảo Công ty
                hoặc làm giàu cho bản thân, bằng bất kỳ hình thức nào, cho dù là
                mang tính chất lừa đảo hay tính chất khác, thông qua bất kỳ sự
                kiện, hoạt động quảng cáo hoặc chiến dịch nào do Công ty tiến
                hành để khuyến khích tài khoản mới hoặc việc sử dụng Nền tảng
                bởi các khách hàng mới hoặc hiện tại;
              </li>
              <li>
                Bạn ý thức rõ rằng khi yêu cầu các Nền tảng thông qua Nền tảng
                hoặc khi sử dụng Nền tảng, mức cước viễn thông tiêu chuẩn sẽ
                được áp dụng;
              </li>
              <li>
                Bạn sẽ không quấy rối hoặc có hành vi không đúng đắn hoặc thiếu
                tôn trọng đối với Công Ty và/hoặc Nhà Cung cấp Nền tảng cho dù
                là bạn có thể có những mối quan ngại đối với Công ty hoặc Nhà
                Cung cấp Nền tảng. Để tránh nhầm lẫn, nội dung này không loại
                trừ quyền khiếu nại của bạn đối với Công ty và/hoặc Nhà Cung cấp
                Nền tảng thứ ba;
              </li>
              <li>
                Bạn không được làm ảnh hưởng xấu hoặc phá hoại sự vận hành bình
                thường của Nền tảng một cách bất hợp pháp;
              </li>
              <li>
                Bạn đồng ý rằng Nền tảng được cung cấp trên cơ sở nỗ lực thương
                mại hợp lý;
              </li>
              <li>
                Bạn đồng ý rằng việc sử dụng Nền tảng, Nền tảng và/hoặc các tính
                năng được tích hợp trên Nền tảng của bạn sẽ phụ thuộc vào Chính
                sách Bảo mật của Công ty mà có thể được sửa đổi theo thời gian
                phù hợp với quy định của pháp luật; và
              </li>
              <li>
                Bạn đồng ý nhận hoàn toàn trách nhiệm và nghĩa vụ đối với toàn
                bộ tổn thất hoặc thiệt hại được gây ra cho chính bản thân bạn,
                Nhà Cung cấp Nền tảng, Công ty và bất kỳ bên thứ ba nào khi bạn
                vi phạm bất kỳ quy định nào của Điều khoản sử dụng này mà không
                phải do lỗi của Công Ty hoặc Nhà Cung cấp Nền tảng.
              </li>
            </ul>
            <span className="index"> Thanh toán</span>
            <ul>
              <p>
                Khi bạn đã hoàn thành việc sử dụng d ịch v ụ, bạn được yêu cầu
                thanh toán đầy đủ cho Nhà Cung Cấp Bên Thứ Ba bằng cách chọn một
                trong các phương thức thanh toán có sẵn trên Nền Tảng. Bất kỳ
                khoản thanh toán nào theo lựa chọn đó sẽ là tự động và không
                được hoàn lại.
              </p>
              <li>
                Bạn có thể lựa chọn việc thanh toán Nền tảng bằng tiền mặt và
                khi được áp dụng, bằng thẻ tín dụng và/hoặc thẻ ghi nợ (
                <strong>“Thẻ”</strong>) hoặc bằng ví điện tử thông qua cổng
                thanh toán OnePay (<strong>“Cổng thanh toán”</strong>).
              </li>
              <li>
                Trong trường hợp bạn chọn thanh toán Nền tảng bằng Thẻ, hoặc
                bằng Ví điện tử, bạn chấp thuận các điều khoản sử dụng của cả
                Nền tảng và Cổng thanh toán.
              </li>
              <li>
                Trong trường hợp Thẻ là của một người khác bạn cam đoan và bảo
                đảm rằng bạn đã có sự tất cả chấp thuận cần thiết đối với việc
                sử dụng Thẻ đó để thanh toán cho việc sử dụng Nền tảng và tất cả
                các Nền tảng được cung cấp thông qua Nền tảng.
              </li>
              <li>
                Khi bạn đã hoàn tất sử dụng Nền tảng thông qua Nền tảng, bạn có
                nghĩa vụ phải thanh toán toàn bộ tiền phí Nền tảng cho Nhà Cung
                cấp Nền tảng thứ ba. Trong trường hợp bạn có bất kỳ khiếu nại
                nào liên quan đến Nền tảng giáo dục đã được cung cấp, các khiếu
                nại này sẽ được Công ty tiếp nhận và phối hợp với các Nhà Cung
                cấp Nền tảng thứ ba để xử lý.
              </li>
              <li>
                Công Ty có quyền ngừng xử lý bất kỳ giao dịch nào mà Công ty,
                trong phạm vi hiểu biết hợp lý, tin rằng giao dịch đó có thể là
                lừa đảo, bất hợp pháp hoặc có liên quan tới các hành vi phạm
                tội, rửa tiền, tài trợ khủng bố HOẶC khi Công Ty trên cơ sở hợp
                lý tin rằng Thẻ được sử dụng thanh toán giao dịch có thể là giả
                mạo, bất hợp pháp, hoặc liên quan đến bất kỳ hành vi vi phạm
                hình sự hoặc khi Công Ty trên cơ sở hợp lý tin rằng bạn đã vi
                phạm Điều Khoản Sử Dụng.
              </li>
              <li>
                Bạn đồng ý sẽ hợp tác trong việc sàng lọc tội phạm tài chính khi
                có yêu cầu và hỗ trợ chúng tôi trong việc tuân thủ các quy định
                pháp luật áp dụng.
              </li>
              <li>
                Bạn có trách nhiệm tự giải quyết các tranh chấp với đơn vị phát
                hành Thẻ của bạn đối với các quan hệ tranh chấp có liên quan đến
                việc phát hành và sử dụng Thẻ.
              </li>
            </ul>
            <strong>Xếp hạng</strong>
            <p>
              Người Dùng và Nhà Cung Cấp Bên Thứ Ba có thể được phép đánh giá
              lẫn nhau về Các Giải Pháp được cung cấp.
            </p>
            <p>
              Mọi xếp hạng sẽ được tự động đăng nhập vào hệ thống Akadon và
              Akadon có thể phân tích tất cả các xếp hạng nhận được.
            </p>
            <strong>Miễn trừ trách nhiệm</strong>
            <p>
              Akadon không tuyên bố hay bảo đảm dưới bất kỳ hình thức nào, một
              cách rõ ràng hay ngụ ý, về dịch vụ được cung cấp bởi Nhà Cung Cấp
              Bên Thứ Ba hoặc bất kỳ dịch vụ nào được mua thông qua việc sử dụng
              Nền Tảng Akadon. Bạn đồng ý rằng bạn sẽ chịu mọi rủi ro phát sinh
              từ việc bạn sử dụng các dịch vụ do Nhà Cung Cấp Bên Thứ Ba cung
              cấp và sẽ không có quyền truy đòi Akadon.
            </p>
          </span>
        </div>

        <div className="dad pb-5">
          <span className="index">Liên hệ với chúng tôi</span>
          <span className="sub">
            Nếu có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật này, bạn
            có thể liên hệ với chúng tôi bằng cách sử dụng thông tin bên dưới:
            <span className="name">Akadon Education Việt Nam</span>
            <br />
            <span>
              <img className="pr-2" src={place} alt="Location" />
              Tầng 3, số 26 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội
            </span>
            <br />
            <span>
              <img className="pr-2" src={phone} alt="phone" />
              024 3633 4387
            </span>
            <br />
            <span>
              <img className="pr-2" src={email} alt="email" />
              contact@akadon.com.vn
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
