import classNames from "classnames";
import { useState } from "react";
import DatepickerElement from "tailwind-datepicker-react";

export default function Datepicker({ inputClassName, ...otherProps }) {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const classes = classNames();

  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    theme: {
      background:
        "border !border-[rgba(255,255,255,.1)] !bg-[rgba(36,36,36,1)]",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: `!bg-transparent !border-none focus:border-none focus-visible:outline-none ${inputClassName}`,
      inputIcon: "!hidden",
      selected:
        "bg-white/80 !text-[rgba(0,0,0,0.9)] hover:!bg-white/50 active:!bg-slate-500",
    },
    datepickerClassNames: "top-5",
    language: "en",
  };

  return (
    <DatepickerElement
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
}
