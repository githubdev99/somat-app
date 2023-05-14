import { Link } from "@remix-run/react";
import classNames from "classnames";

export default function Button(props) {
  const {
    type,
    color,
    size,
    to = "#",
    className = "",
    children,
    ...otherProps
  } = props;

  const classes = classNames(
    `cursor-pointer rounded-lg px-2 py-1 text-sm font-normal shadow-sm transition duration-200 ease-in flex items-center justify-center gap-3 active:opacity-80 ${className}`,
    {
      "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white":
        color === "primary",
      "bg-white/10 text-white shadow-sm hover:bg-white/20 active:bg-slate-500":
        color === "secondary",
      "hover:bg-[#414141] text-[rgba(255,255,255,.64)] active:bg-slate-500":
        color === "transparent",
      "ring-1 ring-inset ring-[#414141] hover:bg-[#414141] text-[rgba(255,255,255,.64)] active:ring-slate-500 active:bg-slate-500":
        color === "outlined-secondary",
    }
  );

  switch (type) {
    case "external-link":
      return (
        <a
          href={to}
          className={classes}
          target="_blank"
          rel="noreferrer"
          {...otherProps}
        >
          {children}
        </a>
      );
    case "link":
      return (
        <Link to={to} className={classes} prefetch="intent" {...otherProps}>
          {children}
        </Link>
      );
    default:
      return (
        <button className={classes} {...otherProps}>
          {children}
        </button>
      );
  }
}
