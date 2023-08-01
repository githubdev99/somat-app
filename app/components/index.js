import { createContext } from "react";

import Badge from "./global/Badge";
import Button from "./global/Button";
import Dropdown from "./global/Dropdown";
import Modal from "./global/Modal";
import Datepicker from "./global/Datepicker";
import ToastNotification from "./global/ToastNotification";
import AlertConfirmation from "./global/AlertConfirmation";
import ColorPicker from "./global/ColorPicker";
import Popover from "./global/Popover";

import Sidebar from "./layout/Sidebar";
import Container from "./layout/Container";
import Content from "./layout/Content";
import SidebarSettings from "./layout/SidebarSettings";
import ContentSettings from "./layout/ContentSettings";

import Lists from "./task/Lists";
import SlideOverDetail from "./task/SlideOverDetail";

import Notifications from "./inbox/Notifications";

import Profile from "./settings/Profile";
import General from "./settings/General";
import Users from "./settings/Users";
import Attributes from "./settings/Attributes";

const RootContext = createContext({});

export const Global = {
  Badge,
  Button,
  Dropdown,
  Modal,
  Datepicker,
  ToastNotification,
  AlertConfirmation,
  ColorPicker,
  Popover,
  RootContext,
};

export const Layout = {
  Sidebar,
  Container,
  Content,
  SidebarSettings,
  ContentSettings,
};

export const Task = {
  Lists,
  SlideOverDetail,
};

export const Inbox = {
  Notifications,
};

export const Settings = {
  Profile,
  General,
  Users,
  Attributes,
};
