import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import "react-input-range/lib/css/index.css";

import CurrencyFormat from "../CurrencyFormat";

const FilterFee = ({ maxFee, feeRange, setFeeRange }) => {
  // LOCAL STATE DECLARATIONS
  const [value, setValue] = useState({ min: 10000, max: maxFee });
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation("filter");

  // SIDE EFFECTS
  useEffect(() => {
    setValue({ min: 10000, max: maxFee });
  }, [maxFee]);

  useEffect(() => {
    if (feeRange) {
      setValue({ min: feeRange.min, max: feeRange.max });
    }
  }, [feeRange]);

  useEffect(() => {
    const feeContainer = document.getElementById("filter-fee");
    if (toggle) {
      feeContainer.style.display = "none";
    } else {
      feeContainer.style.display = "block";
    }
  });

  // FUNCTION DECLARATIONS
  function accept() {
    setFeeRange({ max: value.max, min: value.min });
    setToggle(!toggle);
  }
  function cancle() {
    setFeeRange();
    setValue({ min: 10000, max: maxFee });
    setToggle(!toggle);
  }

  return (
    <div id="filter-fee" className="card-style box-shadow mx-auto">
      <div className="py-3 px-2 mb-3">
        <div className="px-3 filter-range">
          <InputRange
            step={10000}
            maxValue={maxFee + 50000}
            minValue={0}
            value={value}
            formatLabel={(value) => <CurrencyFormat value={value} />}
            onChange={(e) => {
              setValue({ ...e });
            }}
          />
        </div>
      </div>
      <div className="flex-box mb-4">
        <Input
          onChange={(e) => setValue({ ...value, min: e.target.value })}
          value={value.min}
          className="text-center border-radius-2"
          placeholder="0 VNĐ"
          type="number"
        />
        <span className="mx-2">-</span>
        <Input
          onChange={(e) => setValue({ ...value, max: e.target.value })}
          value={value.max}
          className="text-center border-radius-2"
          placeholder="0 VNĐ"
          type="number"
        />
      </div>
      <div className="center-box">
        <div onClick={cancle} className="cancel-btn py-1 px-5 mr-12px">
          {t("cancel")}
        </div>
        <div
          onClick={accept}
          className="main-btn py-1 pl-2 pr-2 shadow-btn-hover"
        >
          {t("accept")}
        </div>
      </div>
    </div>
  );
};

export default FilterFee;
