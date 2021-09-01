import React from 'react';
import English from "../../assets/images/englishLogo.png";
import Physical from "../../assets/images/physicsLogo.png";
import Math from "../../assets/images/mathLogo.png";
import Chemistry from "../../assets/images/chemistryLogo.png";
import Philology from "../../assets/images/philology.png";
import History from "../../assets/images/history.png";
import Biology from "../../assets/images/biology.png";
import Geography from "../../assets/images/geography.png";
import MsOffice from "../../assets/images/msoffice.png";

const SubjectImage = ({subject, width, height}) => {
  switch (subject) {
    case "Toán học": {
      return <img src={Math} style={{maxWidth: width, maxHeight: height}} alt="Math" />
    }
    case "Ngữ văn": {
      return <img src={Philology} style={{maxWidth: width, maxHeight: height}} alt="Philology" />
    }
    case "Sinh học": {
      return <img src={Biology} style={{maxWidth: width, maxHeight: height}} alt="Biology" />
    }
    case "Vật lý": {
      return <img src={Physical} style={{maxWidth: width, maxHeight: height}} alt="Physical" />
    }
    case "Hóa học": {
      return <img src={Chemistry} style={{maxWidth: width, maxHeight: height}} alt="Chemistry" />
    }
    case "Địa lý": {
      return <img src={Geography} style={{maxWidth: width, maxHeight: height}} alt="Geography" />
    }
    case "Lịch sử": {
      return <img src={History} style={{maxWidth: width, maxHeight: height}} alt="History" />
    }
    case "Tiếng Anh": {
      return <img src={English} style={{maxWidth: width, maxHeight: height}} alt="English" />
    }
    case "Tin học": {
      return <img src={MsOffice} style={{maxWidth: width, maxHeight: height}} alt="MsOffice" />
    }
    default: return "";
  }
}

export default SubjectImage;