export const ICON_COLLAPSIBLE_ROTATE = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
  transition: {
    type: "spring",
    duration: 0.2,
  },
};

export const VISIBLE = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.7,
    },
  },
};

export const VISIBLE_CUSTOM = {
  hidden: { opacity: 0, scale: 0 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.7,
      delay: custom * 0.13,
    },
  }),
};
