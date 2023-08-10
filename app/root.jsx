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
  getAllAttribute,
  getAllList,
  getAllTask,
  getAllTaskHistory,
  getAllUsersWorkspace,
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

export const loader = async ({ params }) => {
  return json({
    ENV: {
      API_URL: process.env.API_URL,
    },
    params,
  });
};

export default function App() {
  const data = useLoaderData();
  const { params } = data || {};
  const { slug } = params || {};

  const [token, setToken] = useState(null);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);
  const [dataWorkspace, setDataWorkspace] = useState(null);
  const [dataWorkspaceSelected, setDataWorkspaceSelected] = useState(null);
  const [dataList, setDataList] = useState(null);
  const [dataListSelected, setDataListSelected] = useState(false);
  const [dataAssignees, setDataAssignees] = useState([]);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [clickedNavId, setClickedNavId] = useState(slug || "");
  const [dataTaskStatus, setDataTaskStatus] = useState([]);
  const [dataTaskPriority, setDataTaskPriority] = useState([]);
  const [dataTaskProject, setDataTaskProject] = useState([]);
  const [taskStatusDropdown, setTaskStatusDropdown] = useState([]);
  const [taskPriorityDropdown, setTaskPriorityDropdown] = useState([]);
  const [taskProjectDropdown, setTaskProjectDropdown] = useState([]);
  const [taskStatusSelected, setTaskStatusSelected] = useState({});
  const [taskPrioritySelected, setTaskPrioritySelected] = useState({});
  const [taskProjectSelected, setTaskProjectSelected] = useState({});

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

  const handleDataAssignees = async (workspaceId) => {
    const response = await getAllUsersWorkspace(
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataAssignees(response?.data);
  };

  const handleDataActivity = async (workspaceId) => {
    const response = await getAllTaskHistory(
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataActivity(response?.data);
  };

  const handleDataTask = async (query) => {
    const response = await getAllTask(query, localStorage.getItem("token"));

    if (response?.status?.code !== 200) return;

    setDataTask(response?.data);

    await handleDataActivity(query.workspace_id);
  };

  const handleRefreshDataTask = async (workspaceId) => {
    const isDefaultPage =
      clickedNavId &&
      ["inbox", "draft", "assigned", "created", "trash"].includes(clickedNavId);

    await handleDataTask({
      workspace_id: workspaceId,
      ...(clickedNavId === "draft" && {
        is_draft: 1,
      }),
      ...(clickedNavId === "assigned" && {
        is_assigned: 1,
      }),
      ...(clickedNavId === "created" && {
        is_created: 1,
      }),
      ...(clickedNavId === "trash" && {
        is_trash: 1,
      }),
      ...(!isDefaultPage && dataListSelected?.id
        ? {
            list_id: dataListSelected.id,
          }
        : {}),
    });
  };

  const handleDataTaskStatus = async (workspaceId) => {
    const response = await getAllAttribute(
      "status",
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskStatus(response?.data);
    setTaskStatusDropdown([
      ...response?.data?.map((taskStatus) => {
        const { name, hex_color, states } = taskStatus;

        if (states === "NOT_STARTED") setTaskStatusSelected(taskStatus);

        return {
          isDisabledLink: true,
          onClick: () => setTaskStatusSelected(taskStatus),
          content: <Global.Badge text={name} hexColor={hex_color} />,
          isInnerHTML: false,
        };
      }),
      ...[
        {
          url: "/settings/attributes?tab=status",
          content: "Configure Statuses...",
          isInnerHTML: true,
          isBottomLink: true,
        },
      ],
    ]);
    if (response?.length && !Object.keys(taskStatusSelected).length)
      setTaskStatusSelected(response[0]);
  };

  const handleDataTaskPriority = async (workspaceId) => {
    const response = await getAllAttribute(
      "priority",
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskPriority(response?.data);
    setTaskPriorityDropdown([
      ...[
        {
          isDisabledLink: true,
          onClick: () => setTaskPrioritySelected({}),
          content: <span className="text-[rgba(255,255,255,.9)]">None</span>,
          isInnerHTML: false,
        },
      ],
      ...response?.data?.map((taskPriority) => {
        const { name, hex_color } = taskPriority;

        return {
          isDisabledLink: true,
          onClick: () => setTaskPrioritySelected(taskPriority),
          content: <span style={{ color: hex_color }}>{name}</span>,
          isInnerHTML: false,
        };
      }),
      ...[
        {
          url: "/settings/attributes?tab=priority",
          content: "Configure Priorities...",
          isInnerHTML: true,
          isBottomLink: true,
        },
      ],
    ]);
  };

  const handleDataTaskProject = async (workspaceId) => {
    const response = await getAllAttribute(
      "project",
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskProject(response?.data);
    setTaskProjectDropdown([
      ...[
        {
          isDisabledLink: true,
          onClick: () => setTaskProjectSelected({}),
          content: <span className="text-[rgba(255,255,255,.9)]">None</span>,
          isInnerHTML: false,
        },
      ],
      ...response?.data?.map((taskProject) => {
        const { name, hex_color } = taskProject;

        return {
          isDisabledLink: true,
          onClick: () => setTaskProjectSelected(taskProject),
          content: <span style={{ color: hex_color }}>{name}</span>,
          isInnerHTML: false,
        };
      }),
      ...[
        {
          url: "/settings/attributes?tab=project",
          content: "Configure Projects...",
          isInnerHTML: true,
          isBottomLink: true,
        },
      ],
    ]);
  };

  useEffect(() => {
    handleToken();

    if (!localStorage.getItem("token")) {
      navigate("/app/auth");
      return;
    } else {
      if (location.pathname === "/app/auth") {
        navigate("/app/assigned");
        setClickedNavId("assigned");
      }
    }

    handleDataProfile();
    handleDataWorkspace();
    handleDataList(localStorage.getItem("selectedWorkspaceId"));
    handleSelectedWorkspace(localStorage.getItem("selectedWorkspaceId"));
    handleDataAssignees(localStorage.getItem("selectedWorkspaceId"));
    handleDataTaskStatus(localStorage.getItem("selectedWorkspaceId"));
    handleDataTaskPriority(localStorage.getItem("selectedWorkspaceId"));
    handleDataTaskProject(localStorage.getItem("selectedWorkspaceId"));
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
    handleDataAssignees(selectedId);
    handleDataTaskStatus(selectedId);
    handleDataTaskPriority(selectedId);
    handleDataTaskProject(selectedId);
  }, [selectedWorkspaceId]);

  useEffect(() => {
    setClickedNavId(slug);
  }, [slug]);

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("selectedWorkspaceId")
    )
      return;

    const selectedId = selectedWorkspaceId
      ? selectedWorkspaceId
      : localStorage.getItem("selectedWorkspaceId");

    const isDefaultPage =
      clickedNavId &&
      ["inbox", "draft", "assigned", "created", "trash"].includes(clickedNavId);

    handleDataTask({
      workspace_id: selectedId,
      ...(clickedNavId === "draft" && {
        is_draft: 1,
      }),
      ...(clickedNavId === "assigned" && {
        is_assigned: 1,
      }),
      ...(clickedNavId === "created" && {
        is_created: 1,
      }),
      ...(clickedNavId === "trash" && {
        is_trash: 1,
      }),
      ...(!isDefaultPage && dataListSelected?.id
        ? {
            list_id: dataListSelected.id,
          }
        : {}),
    });
  }, [clickedNavId, selectedWorkspaceId, dataListSelected]);

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
            dataAssignees,
            dataTaskStatus,
            dataTaskPriority,
            dataTaskProject,
            dataTask,
            dataActivity,
            clickedNavId,
            taskStatusDropdown,
            taskPriorityDropdown,
            taskProjectDropdown,
            taskStatusSelected,
            taskPrioritySelected,
            taskProjectSelected,
            setToken,
            setSelectedWorkspaceId,
            handleDataProfile,
            handleDataWorkspace,
            handleLogout,
            handleSelectedWorkspace,
            handleDataList,
            handleSelectedList,
            handleDataTaskStatus,
            handleDataTaskPriority,
            handleDataTaskProject,
            handleDataTask,
            handleRefreshDataTask,
            setClickedNavId,
            setTaskProjectSelected,
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
