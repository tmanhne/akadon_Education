import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card } from "reactstrap";
import { Trans } from "react-i18next";

import Bg from "../../assets/images/qrcode-bg.jpg";
import { QRCode } from "../OfflinePages/utils";

function QRCard({ userType, qr_code_hashed, t }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const canvasTag = Array.from(document.getElementsByTagName("canvas"))[0];
    if (canvasTag) {
      setUrl(canvasTag.toDataURL("image/png"));
    }
  }, []);

  return (
    <Card className="lesson-detail__qr-card card-style pb-0">
      <p className="align-self-start text-bold2 mb-3">QR Code</p>
      {userType === "student" ? (
        <>
          <p className="text-grey text-small">{t("lesson-detail:qr_code_1")}</p>
          <QRCode
            qrCodeUrl={`${window.location.origin}/start-lesson/${qr_code_hashed}`}
            size={200}
          />
        </>
      ) : (
        <div className="text-center">
          <p className="text-grey text-small">
            <Trans
              i18nKey="lesson-detail:qr_code_2"
              components={{
                span: <span className="text-bold2 text-dark" />,
              }}
            />
          </p>
          <img src={Bg} width={308} className="mx-auto" alt="qrcode" />
        </div>
      )}
    </Card>
  );
}

QRCard.propTypes = { userType: PropTypes.string };

export default QRCard;
