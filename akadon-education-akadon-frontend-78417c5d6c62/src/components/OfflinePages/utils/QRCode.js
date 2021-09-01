import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QRC from "qrcode.react";

import DownloadIcon from "../../../assets/icons/download-icon.svg";

function QRCode({ qrCodeUrl, size }) {
  const [downloadUrl, setDownloadUrl] = useState("");
  useEffect(() => {
    const canvasTag = Array.from(document.getElementsByTagName("canvas"))[0];
    if (canvasTag) {
      setDownloadUrl(canvasTag.toDataURL("image/png"));
    }
  }, []);
  return (
    <div className="w-100">
      <div className="text-right mb-2">
        <a href={downloadUrl} download="akadon">
          <img
            className="cursor-pointer"
            src={DownloadIcon}
            alt="download"
            width={36}
          />
        </a>
      </div>
      <div id="qrcode" className="text-center">
        <QRC value={qrCodeUrl} size={size} />
      </div>
    </div>
  );
}

QRCode.propTypes = { qrCodeUrl: PropTypes.string };

export default QRCode;
