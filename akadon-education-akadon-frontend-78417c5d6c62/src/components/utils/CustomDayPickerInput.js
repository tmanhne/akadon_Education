import React from "react";
import { FormGroup, InputGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayPickerInput from "react-day-picker/DayPickerInput";

const CustomDayPickerInput = ({ selectedDays, setSelectedDays }) => {
  const handleMultiplePicker = (day) => {
    const dayOfMonth = day.getDate();
    const month = day.getMonth() + 1;
    const year = day.getFullYear();
    const selectedDate = `${dayOfMonth}/${month}/${year}`;
    const selectedDayIndex = selectedDays.findIndex(
      (d) => d === selectedDate
    );
    if (selectedDayIndex === -1) {
      setSelectedDays([...selectedDays, selectedDate]);
    }
  };
  const removeSelectedDay = (removeDay) => {
    const newSelectedDays = selectedDays.filter((d) => d !== removeDay);
    setSelectedDays([...newSelectedDays]);
  };
  return (
    <FormGroup className="mb-3">
      <InputGroup className="flex-box multi-day-picker align-items-stretch">
        <div className="fake-input flex-box border border-right-0 p-2">
          {selectedDays.map((day) => (
            <div
              key={day}
              className="selected-day flex-box px-2 py-1 mr-2 my-2"
            >
              <span className="mr-2">{day}</span>
              <FontAwesomeIcon
                className="text-hightlight text-small-1"
                icon={["fas", "times-circle"]}
                onClick={() => removeSelectedDay(day)}
              />
            </div>
          ))}
        </div>
        <InputGroupAddon
          className="flex-box p-2 border border-left-0"
          addonType="prepend"
        >
          <DayPickerInput
            hideOnDayClick={false}
            dayPickerProps={{
              selectedDays: selectedDays.length > 0 ? selectedDays.map(
                (day) => new Date(day.split("/").reverse().join(","))
              ) : [],
            }}
            onDayChange={handleMultiplePicker}
          />
          <FontAwesomeIcon
            className="text-hightlight1"
            icon={["fal", "calendar-alt"]}
          />
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  );
};

export default CustomDayPickerInput;
