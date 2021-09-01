import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";

function InputFee({inputFee, data, setData}) {
    const {t} = useTranslation("landing-page")
  const initFee = [
    { value: 50000, text: "50.000" },
    { value: 100000, text: "100.000" },
    { value: 150000, text: "150.000" },
    { value: 200000, text: "200.000" },
    { value: 250000, text: "250.000" },
    { value: 300000, text: "300.000" },
    { value: 350000, text: "350.000" },
    { value: 400000, text: "400.000" },
    { value: 450000, text: "450.000" },
    { value: 500000, text: "500.000" },
  ];
  return (
    <>
      <Input
        className="border-radius-2"
        id="budget"
        type="select"
        required
        value={inputFee}
        onChange={(e) =>
            setData({
            ...data,
            fee: e.target.value,
          })
        }
      >
        <option value=""> {t("landing-page:btn_req_4")}</option>
        {initFee.map((fee, index) => (
          <option value={fee.value} key={index}>
            {fee.text}
          </option>
        ))}
      </Input>
    </>
  );
}

export default InputFee;
