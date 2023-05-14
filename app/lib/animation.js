export const ICON_COLLAPSIBLE_ROTATE = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
  transition: {
    type: "spring",
    duration: 0.2,
  },
};

export const VISIBLE = {
  hidden: { display: "none", opacity: 0, scale: 0 },
  visible: { display: "block", opacity: 1, scale: 1 },
  transition: {
    type: "spring",
    duration: 0.8,
  },
};
