/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";

import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import customStylesheetUrl from "~/styles/custom.css";
import { Global } from "~/components";
import {
  getAllList,
  getAllWorkspace,
  getOneList,
  getOneWorkspace,
  getProfile,
} from "./lib/api";

export const links = () => [
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  { rel: "stylesheet", href: customStylesheetUrl },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }) => {
  return json({
    ENV: {
      API_URL: process.env.API_URL,
    },
  });
};

export default function App() {
  const data = useLoaderData();

  const [token, setToken] = useState(null);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);
  const [dataWorkspace, setDataWorkspace] = useState(null);
  const [dataWorkspaceSelected, setDataWorkspaceSelected] = useState(null);
  const [dataList, setDataList] = useState(null);
  const [dataListSelected, setDataListSelected] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleToken = () => {
    if (!token) return;

    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("selectedWorkspaceId");
    navigate("/app/auth");
  };

  const handleDataProfile = async () => {
    const response = await getProfile(localStorage.getItem("token"));

    if (response?.status?.code !== 200) return;

    if (!localStorage.getItem("token")) {
      handleLogout();
      return;
    }

    setDataProfile(response?.data);
  };

  const handleDataWorkspace = async () => {
    const response = await getAllWorkspace(localStorage.getItem("token"));

    if (response?.status?.code !== 200) return;

    if (
      response?.data?.length &&
      !localStorage.getItem("selectedWorkspaceId")
    ) {
      setSelectedWorkspaceId(response?.data[0].id);
      localStorage.setItem("selectedWorkspaceId", response?.data[0].id);
    }
    setDataWorkspace(response?.data);
  };

  const handleSelectedWorkspace = async (workspaceId) => {
    const response = await getOneWorkspace(
      workspaceId,
      localStorage.getItem("token")
    );

    if (!response?.data) return;

    localStorage.setItem("selectedWorkspaceId", workspaceId);
    setDataWorkspaceSelected(response?.data);
  };

  const handleDataList = async (workspaceId) => {
    const response = await getAllList(
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataList(response?.data);
  };

  const handleSelectedList = async (id) => {
    const response = await getOneList(id, localStorage.getItem("token"));

    if (response?.status?.code !== 200) return;

    setDataListSelected(response?.data);
  };

  useEffect(() => {
    handleToken();

    if (!localStorage.getItem("token")) {
      navigate("/app/auth");
      return;
    } else {
      if (location.pathname === "/app/auth") navigate(`/app/assigned`);
    }

    handleDataProfile();
    handleDataWorkspace();
    handleDataList(localStorage.getItem("selectedWorkspaceId"));
    handleSelectedWorkspace(localStorage.getItem("selectedWorkspaceId"));
  }, [token]);

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("selectedWorkspaceId")
    )
      return;

    const selectedId = selectedWorkspaceId
      ? selectedWorkspaceId
      : localStorage.getItem("selectedWorkspaceId");

    handleDataList(selectedId);
    handleSelectedWorkspace(selectedId);
  }, [selectedWorkspaceId]);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Global.RootContext.Provider
          value={{
            token,
            selectedWorkspaceId,
            dataProfile,
            dataWorkspace,
            dataWorkspaceSelected,
            dataList,
            dataListSelected,
            setToken,
            setSelectedWorkspaceId,
            handleDataProfile,
            handleDataWorkspace,
            handleLogout,
            handleSelectedWorkspace,
            handleDataList,
            handleSelectedList,
          }}
        >
          <Global.ToastNotification />
          <Global.AlertConfirmation />
          <Outlet />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Global.RootContext.Provider>
      </body>
    </html>
  );
}
