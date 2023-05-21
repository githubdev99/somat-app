import { hexToRgba } from "~/lib/utils";

export default function Dropdown(props) {
  const {
    backgroundOpacity = "0.1",
    hexColor,
    textColor,
    borderColor,
    text,
  } = props;

  return (
    <div
      className="inline-block rounded-[4px] px-1 py-0.5"
      style={{
        ...{
          backgroundColor: hexToRgba(hexColor, backgroundOpacity),
          color: textColor || hexColor,
        },
        ...(borderColor && {
          border: `1px solid ${borderColor}`,
        }),
      }}
    >
      {text}
    </div>
  );
}
