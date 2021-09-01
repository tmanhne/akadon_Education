import React from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CheckboxDropdown({ data, id, listKeys, setListKeys, language }) {
  function handleCheckbox(key) {
    if (listKeys.includes(key)) {
      const updateListKeys = listKeys.filter((k) => k !== key);
      setListKeys([...updateListKeys]);
    } else {
      setListKeys([...listKeys, key]);
    }
  }

  const leveltran = listKeys.map((lev) => {
    switch (lev) {
      case "Lớp 1": {
        return "Grade 1";
      }
      case "Lớp 2": {
        return "Grade 2";
      }
      case "Lớp 3": {
        return "Grade 3";
      }
      case "Lớp 4": {
        return "Grade 4";
      }
      case "Lớp 5": {
        return "Grade 5";
      }
      case "Lớp 6": {
        return "Grade 6";
      }
      case "Lớp 7": {
        return "Grade 7";
      }
      case "Lớp 8": {
        return "Grade 8";
      }
      case "Lớp 9": {
        return "Grade 9";
      }
      case "Lớp 10": {
        return "Grade 10";
      }
      case "Lớp 11": {
        return "Grade 11";
      }
      case "Lớp 12": {
        return "Grade 12";
      }
      case "Đại học": {
        return "University";
      }
      default:
        return {};
    }
  });
  const leveldone = Object.values(leveltran);

  const transpec = listKeys.map((mon) => {
    switch (mon) {
      case "Toán học": {
        return "Math";
      }
      case "Ngữ văn": {
        return "Literature";
      }
      case "Sinh học": {
        return "Biological";
      }
      case "Vật lý": {
        return "Physical";
      }
      case "Hóa học": {
        return "Chemistry";
      }
      case "Địa lý": {
        return "Geography";
      }
      case "Lịch sử": {
        return "History";
      }
      case "Tiếng Anh": {
        return "English";
      }
      case "Tin học": {
        return "Information Technology";
      }

      default:
        return {};
    }
  });
  const specdone = Object.values(transpec);

  return (
    <UncontrolledDropdown className="checkbox-dropdown">
      <DropdownToggle
        style={{ height: "75px", wordBreak: "break-word" }}
        className="w-100 position-relative dropdown-btn bg-light text-left text-dark pr-12px"
      >
        {language === "vi"
          ? listKeys.join(", ")
          : id === "level"
          ? leveldone
          : specdone}
        <div className="position-absolute">
          <FontAwesomeIcon className="text-grey" icon={["fas", "angle-down"]} />
        </div>
      </DropdownToggle>
      <DropdownMenu
        className="w-100"
        style={{ height: "18rem", overflowY: "auto" }}
      >
        {data.map((key, index) => (
          <DropdownItem
            className="flex-box align-items-center"
            key={key}
            toggle={false}
          >
            <FormGroup className="mb-0 w-100 flex-box align-items-center">
              <Input
                onChange={() => handleCheckbox(key)}
                className="my-0"
                value={key}
                id={`${id}-${index}`}
                type="checkbox"
                defaultChecked={listKeys.includes(key) ? true : false}
              />
              <Label
                className="m-0 p-0 w-100 cursor-pointer"
                htmlFor={`${id}-${index}`}
              >
                {key}
              </Label>
            </FormGroup>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

CheckboxDropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  listKeys: PropTypes.array,
  setListKeys: PropTypes.func,
};

export default CheckboxDropdown;
