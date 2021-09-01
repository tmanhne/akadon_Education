import React from "react";

import "./index.scss";
import { QRCode as QRC, LessonCard, Header } from "../utils";
import SubLoader from "../../utils/SubLoader";
import { getLessonWithQRCode } from "../../../api";
import useFetchObject from "../../customHooks/useFetchObject";

export default function QRCode({ match }) {
  const { token } = match.params;
  const [lesson, loading] = useFetchObject(getLessonWithQRCode, token);
  if (loading && loading.length > 0) return <SubLoader />;
  const url = window.location.origin + `/start-lesson/${token}`;
  return (
    <div className="qrcode-page mx-auto pb-5 mb-5">
      <Header />
      <div className="px-3 pb-12px mb-4 border-bottom">
        <LessonCard lesson={lesson ? lesson : {}} />
      </div>
      <div className="px-4">
        <div className="hightlight-box text-bold2 text-center py-3 mb-4  border-radius-1 text-hightlight">
          QR Code
        </div>
        <p className="mb-3 text-grey text-center">
          Khi gia sư đến dạy, bạn hãy đưa mã QR Code này cho Gia sư để bắt đầu
          buổi học
        </p>
        <QRC qrCodeUrl={url} size={225} />
      </div>
    </div>
  );
}
