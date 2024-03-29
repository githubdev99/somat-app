import { Link } from "@remix-run/react";
import classNames from "classnames";

export default function Button({
  type,
  color,
  size,
  to = "#",
  className = "",
  children,
  ...otherProps
}) {
  const classes = classNames(
    `cursor-pointer rounded-lg px-2 py-1 text-sm font-normal shadow-sm transition duration-200 ease-in flex items-center justify-center gap-2 active:opacity-80 focus:outline-none ${className}`,
    {
      "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-[rgba(255,255,255,.9)]":
        color === "primary",
      "bg-white/10 text-[rgba(255,255,255,.9)] shadow-sm hover:bg-white/20 active:bg-slate-500":
        color === "secondary",
      "hover:bg-[#414141] text-[rgba(255,255,255,.64)] active:bg-slate-500":
        color === "transparent",
      "ring-1 ring-inset ring-[#414141] hover:bg-[#414141] text-[rgba(255,255,255,.64)] active:ring-slate-500 active:bg-slate-500":
        color === "outlined-secondary",
      "bg-white/80 text-[rgba(0,0,0,0.9)] shadow-sm hover:bg-white/50 active:bg-slate-500":
        color === "light",
      "bg-[rgba(36,36,36,1)] text-[rgba(255,255,255,0.9)] shadow-sm hover:bg-[rgba(54,54,54,1)] active:opacity-80":
        color === "dark",
      "bg-[#FE5E85] text-[rgba(0,0,0,0.9)] shadow-sm hover:opacity-80 active:bg-[#db5173]":
        color === "danger",
      "bg-green-500 text-[rgba(0,0,0,0.9)] shadow-sm hover:opacity-80 active:bg-green-600":
        color === "success",
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
        <button className={classes} type={type} {...otherProps}>
          {children}
        </button>
      );
  }
}
