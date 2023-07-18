import { useState } from "react";
import { HuePicker } from "react-color";

export default function ColorPicker({ color, onChange }) {
  const [currentColor, setCurrentColor] = useState(color);

  return (
    <HuePicker
      color={currentColor}
      onChange={(value) => {
        setCurrentColor(value);
        onChange(value);
      }}
    />
  );
}
