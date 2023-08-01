/* eslint-disable react-hooks/exhaustive-deps */
import * as Form from "@radix-ui/react-form";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { Global, Layout, Task } from "~/components";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Dialog } from "@headlessui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { IoTrashBin } from "react-icons/io5";
import { register, login, addWorkspace } from "~/lib/api";
import { convertDate } from "~/lib/utils";
import { addList, deleteList, getAllAttribute, updateList } from "../lib/api";

export const meta = () => [{ title: "Somat App" }];

export const loader = async (data) => {
  return json(data);
};

export default function Index() {
  const data = useLoaderData();
  const { params } = data || {};
  const { slug } = params || {};

  const [authComponent, setAuthComponent] = useState("auth");
  const [dataTaskStatus, setDataTaskStatus] = useState([]);
  const [dataTaskPriority, setDataTaskPriority] = useState([]);
  const [dataTaskProject, setDataTaskProject] = useState([]);

  const handleDataTaskStatus = async () => {
    const response = await getAllAttribute(
      "status",
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskStatus(response?.data);
  };

  const handleDataTaskPriority = async () => {
    const response = await getAllAttribute(
      "priority",
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskPriority(response?.data);
  };

  const handleDataTaskProject = async () => {
    const response = await getAllAttribute(
      "project",
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDataTaskProject(response?.data);
  };

  useEffect(() => {
    if (!(slug && String(slug).includes("auth"))) {
      handleDataTaskStatus();
      handleDataTaskPriority();
      handleDataTaskProject();
    }
  }, [slug]);

  const components = {
    auth: <AuthComponent setComponent={setAuthComponent} />,
    login: <LoginComponent setComponent={setAuthComponent} />,
    signup: <SignupComponent setComponent={setAuthComponent} />,
  };

  let isAuthPage = slug && String(slug).includes("auth");

  return (
    <>
      {isAuthPage ? (
        <Global.Modal
          open={true}
          setOpen={() => {}}
          className="top"
          positionClassName="inset-x-0 top-24"
          size="sm"
        >
          {components[authComponent]}
        </Global.Modal>
      ) : (
        <>
          <ModalAddTask
            dataTaskStatus={dataTaskStatus}
            dataTaskPriority={dataTaskPriority}
            dataTaskProject={dataTaskProject}
          />
          <ModalAddList />
          <ModalAddWorkspace />
          <Task.SlideOverDetail />
        </>
      )}
      <Layout.Container>
        <Layout.Sidebar
          data={data}
          {...(slug &&
            !String(slug).includes("auth") && {
              lists: [
                {
                  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z"/></svg>`,
                  hexColor: "#EBB537",
                  url: "/app/shopcommerce",
                  name: "ShopCommerce",
                },
              ],
            })}
        />
        <Layout.Content data={data} />
      </Layout.Container>
    </>
  );
}

const AuthComponent = ({ setComponent }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-1 bg-[#242424] px-4 py-8">
        <img
          src="/images/somat-app-logo.png"
          className="h-auto max-w-[60px]"
          alt="somat-app-logo"
        />
        <div className="text-2xl text-[rgba(255,255,255,0.9)]">
          Welcome to Somat
        </div>
        <div>Solution for Managing Task</div>
      </div>
      <div className="bg-[rgba(255,255,255,.14)] px-10 py-8">
        <Global.Button
          type="button"
          color="dark"
          size="sm"
          className="mb-3 w-full"
          onClick={() => setComponent("login")}
        >
          Log in here
        </Global.Button>
        <Global.Button
          type="button"
          color="dark"
          size="sm"
          className="w-full"
          onClick={() => setComponent("signup")}
        >
          Sign up here
        </Global.Button>
      </div>
    </div>
  );
};

const BackAuthComponent = ({ setComponent, headerText }) => {
  return (
    <div className="flex items-center gap-2 bg-[rgba(255,255,255,.14)] px-3 py-2">
      <div
        className="inline-block cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[rgba(54,54,54,1)] hover:text-[rgba(255,255,255,.9)] active:opacity-80"
        onClick={() => setComponent("auth")}
      >
        <HiOutlineArrowLeft size={18} />
      </div>
      <div>{headerText}</div>
    </div>
  );
};

const LoginComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(Global.RootContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({
      email,
      password,
    });

    const { code, message } = response?.status || {};

    setToken(response?.data || "");

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <BackAuthComponent {...props} headerText="Log in page" />
      <div className="bg-[#242424] px-8 py-5">
        <Form.Field className="mb-2" name="email">
          <label
            htmlFor="email"
            className="block text-sm font-normal leading-6"
          >
            Email
          </label>
          <div className="mt-1">
            <Form.Control asChild>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-red-400">
              Please enter an email
            </Form.Message>
            <Form.Message match="typeMismatch" className="text-red-400">
              Please provide a valid email
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field className="mb-4" name="password">
          <label
            htmlFor="password"
            className="block text-sm font-normal leading-6"
          >
            Password
          </label>
          <div className="mt-1">
            <Form.Control asChild>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-red-400">
              Please enter a password
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <Global.Button
            type="submit"
            color="light"
            size="sm"
            className="w-full"
          >
            Log in
          </Global.Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
};

const SignupComponent = (props) => {
  const { setComponent } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    const response = await register({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });

    const { code, message } = response?.status || {};

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    if (code === 200) setComponent("login");
  };

  return (
    <Form.Root
      onSubmit={(e) => {
        e.preventDefault();

        window.showAlertConfirmation({
          title: "Are you sure to register your account?",
          message: "Please recheck your data before registering",
          onSubmit: handleSubmit,
        });
      }}
    >
      <BackAuthComponent {...props} headerText="Sign up page" />
      <div className="bg-[#242424] px-8 py-5">
        <Form.Field name="firstname">
          <div className="mb-2">
            <label
              htmlFor="firstname"
              className="block text-sm font-normal leading-6"
            >
              Firstname
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="firstname"
                  type="text"
                  autoComplete="off"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter a firstname
              </Form.Message>
            </div>
          </div>
        </Form.Field>
        <Form.Field name="lastname">
          <div className="mb-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-normal leading-6"
            >
              Lastname
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="lastname"
                  type="text"
                  autoComplete="off"
                  className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Control>
            </div>
          </div>
        </Form.Field>
        <Form.Field name="email">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-normal leading-6"
            >
              Email
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="email"
                  type="email"
                  autoComplete="off"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter an email
              </Form.Message>
              <Form.Message match="typeMismatch" className="text-red-400">
                Please provide a valid email
              </Form.Message>
            </div>
          </div>
        </Form.Field>
        <Form.Field name="password">
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-normal leading-6"
            >
              Password
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="password"
                  type="password"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter a password
              </Form.Message>
            </div>
          </div>
        </Form.Field>
        <Form.Field name="confirm_password">
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-normal leading-6"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="confirm_password"
                  type="password"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter a confirm password
              </Form.Message>
              <Form.Message
                match={(value) => value !== password}
                className="text-red-400"
              >
                Password not matches
              </Form.Message>
            </div>
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <Global.Button
            type="submit"
            color="light"
            size="sm"
            className="w-full"
          >
            Sign up
          </Global.Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
};

const CardDetailComponent = ({ children, className = "" }) => {
  return (
    <div className={`rounded-[10px] bg-[#242424] py-2 ${className}`}>
      {children}
    </div>
  );
};

const ModalAddWorkspace = () => {
  const { handleDataWorkspace } = useContext(Global.RootContext);

  const [openAddModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addWorkspace(
      {
        name,
      },
      localStorage.getItem("token")
    );

    const { code, message } = response?.status || {};

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    if (code === 200) setOpenModal(false);
    await handleDataWorkspace();
  };

  useEffect(() => {
    window.addWorkspaceModal = () => {
      setOpenModal(true);
    };
  }, []);

  return (
    <Global.Modal
      open={openAddModal}
      setOpen={setOpenModal}
      positionClassName="inset-x-0 top-3"
      size="sm"
    >
      <Form.Root onSubmit={handleSubmit}>
        <div className="px-5 py-3">
          <div className="mb-4 text-[rgba(255,255,255,.9)]">
            Create new workspace
          </div>
          <Form.Field name="name">
            <label
              htmlFor="name"
              className="block text-sm font-normal leading-6"
            >
              Name
            </label>
            <div className="mt-1">
              <Form.Control asChild>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter a workspace name
              </Form.Message>
            </div>
          </Form.Field>
        </div>
        <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
          <div className="flex justify-between">
            <Global.Button
              type="button"
              color="secondary"
              size="sm"
              onClick={() => setOpenModal(false)}
            >
              <RxCross2 /> Cancel
            </Global.Button>
            <Form.Submit asChild>
              <Global.Button type="submit" color="success" size="sm">
                <AiOutlinePlus /> Create
              </Global.Button>
            </Form.Submit>
          </div>
        </div>
      </Form.Root>
    </Global.Modal>
  );
};

const ModalAddList = () => {
  const { handleDataList } = useContext(Global.RootContext);

  const defaultHexColor = "#B0B0B0";

  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [hexColor, setHexColor] = useState(defaultHexColor);
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = isUpdate
      ? await updateList(
          {
            name,
            hex_color: hexColor,
          },
          id,
          localStorage.getItem("token")
        )
      : await addList(
          {
            name,
            hex_color: hexColor,
            workspace_id: localStorage.getItem("selectedWorkspaceId"),
          },
          localStorage.getItem("token")
        );

    const { code, message } = response?.status || {};

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    if (code === 200) {
      setOpenModal(false);
      setId("");
      setName("");
      setHexColor(defaultHexColor);
      setIsUpdate(false);
    }

    await handleDataList(localStorage.getItem("selectedWorkspaceId"));
  };

  const handleDeleteList = (id, name) => {
    const fetchDeleteList = async () => {
      const response = await deleteList(id, localStorage.getItem("token"));

      const { code, message } = response?.status || {};

      window.showToastNotification({
        type: code === 200 ? "success" : "failed",
        title: code === 200 ? "Success!" : "Failed!",
        message: message,
      });

      if (code === 200) {
        setOpenModal(false);
        setId("");
        setName("");
        setHexColor(defaultHexColor);
        setIsUpdate(false);
      }

      navigate("/app/assigned");

      await handleDataList(localStorage.getItem("selectedWorkspaceId"));
    };

    window.showAlertConfirmation({
      title: `Confirm delete list`,
      message: `Are you sure to delete list ${name} ?`,
      onSubmit: fetchDeleteList,
      color: "danger",
    });
  };

  useEffect(() => {
    window.addListModal = (props) => {
      const {
        isUpdate = false,
        id = "",
        name = "",
        hexColor = defaultHexColor,
      } = props || {};

      setOpenModal(true);

      setIsUpdate(isUpdate);
      setId(id);
      setName(name);
      setHexColor(hexColor);
    };
  }, []);

  return (
    <Global.Modal
      open={openModal}
      setOpen={setOpenModal}
      positionClassName="inset-x-0 top-3"
      size="md"
    >
      <Form.Root onSubmit={handleSubmit}>
        <div className="px-5 py-3">
          <div className="mb-4 text-[rgba(255,255,255,.9)]">
            {isUpdate ? "Edit" : "Create new"} list
          </div>
          <Form.Field className="mb-2" name="name">
            <label
              htmlFor="name"
              className="block text-sm font-normal leading-6"
            >
              Name
            </label>
            <div className="mt-1 flex gap-2">
              <div className="flex-grow">
                <Form.Control asChild>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    defaultValue={name}
                    className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                    required
                    style={{ color: hexColor }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="text-red-400">
                  Please enter a list name
                </Form.Message>
              </div>
              <div className="inline-block">
                <Global.Popover
                  trigger={
                    <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                      <div
                        className="rounded-full p-2"
                        style={{ backgroundColor: hexColor }}
                      ></div>
                    </div>
                  }
                  positionPanelClassName="right-0 mt-3 translate-x-0 transform"
                >
                  <Global.ColorPicker
                    color={hexColor}
                    onChange={({ hex }) => setHexColor(hex)}
                  />
                </Global.Popover>
              </div>
            </div>
          </Form.Field>
        </div>
        <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
          <div className="flex justify-between">
            <Global.Button
              type="button"
              color="secondary"
              size="sm"
              onClick={() => setOpenModal(false)}
            >
              <RxCross2 /> Cancel
            </Global.Button>
            <div className="flex gap-2">
              {isUpdate && (
                <Global.Button
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => handleDeleteList(id, name)}
                >
                  <IoTrashBin /> Remove
                </Global.Button>
              )}
              <Form.Submit asChild>
                <Global.Button type="submit" color="success" size="sm">
                  <AiOutlinePlus /> {isUpdate ? "Update" : "Create"}
                </Global.Button>
              </Form.Submit>
            </div>
          </div>
        </div>
      </Form.Root>
    </Global.Modal>
  );
};

const ModalAddTask = (props) => {
  const { dataTaskStatus, dataTaskPriority, dataTaskProject } = props;

  const { dataProfile, dataList } = useContext(Global.RootContext);

  const [openModal, setOpenModal] = useState(false);
  const [taskStatusDropdown, setTaskStatusDropdown] = useState([]);
  const [taskPriorityDropdown, setTaskPriorityDropdown] = useState([]);
  const [taskProjectDropdown, setTaskProjectDropdown] = useState([]);
  const [listDropdown, setListDropdown] = useState([]);

  // Payload States
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [listSelected, setListSelected] = useState({});
  const [taskStatusSelected, setTaskStatusSelected] = useState({});
  const [taskPrioritySelected, setTaskPrioritySelected] = useState({});
  const [taskProjectSelected, setTaskProjectSelected] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("name", name);
    console.log("description", description);
    console.log("dueDate", dueDate);
    console.log("listSelected", listSelected);
    console.log("taskStatusSelected", taskStatusSelected);
    console.log("taskPrioritySelected", taskPrioritySelected);
    console.log("taskProjectSelected", taskProjectSelected);
  };

  useEffect(() => {
    window.addTaskModal = () => {
      if (!dataList?.length) {
        window.showToastNotification({
          type: "failed",
          title: "Info!",
          message: "You need to add a list before adding new task",
        });
        window.addListModal();
        return;
      }

      setOpenModal(true);
      setTaskStatusDropdown([
        ...dataTaskStatus?.map((taskStatus, index) => {
          const { name, hex_color } = taskStatus;

          if (!index) setTaskStatusSelected(taskStatus);

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
      setTaskPriorityDropdown([
        ...[
          {
            isDisabledLink: true,
            onClick: () => setTaskPrioritySelected({}),
            content: <span className="text-[rgba(255,255,255,.9)]">None</span>,
            isInnerHTML: false,
          },
        ],
        ...dataTaskPriority?.map((taskPriority) => {
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
      setTaskProjectDropdown([
        ...[
          {
            isDisabledLink: true,
            onClick: () => setTaskProjectSelected({}),
            content: <span className="text-[rgba(255,255,255,.9)]">None</span>,
            isInnerHTML: false,
          },
        ],
        ...dataTaskProject?.map((taskProject) => {
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
      setListDropdown(
        dataList?.map((list, index) => {
          const { name, hex_color } = list;

          if (!index) setListSelected(list);

          return {
            isDisabledLink: true,
            onClick: () => setListSelected(list),
            content: <span style={{ color: hex_color }}>{name}</span>,
            isInnerHTML: false,
          };
        })
      );
    };
  }, [dataList]);

  return (
    <Global.Modal
      open={openModal}
      setOpen={setOpenModal}
      size="custom"
      positionClassName="inset-x-0 top-3"
      panelClassName="max-w-[800px]"
    >
      <Form.Root
        className="flex h-full flex-col gap-3 rounded-lg border border-[#323232] bg-[#121212] py-3 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="px-4 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Dialog.Title className="leading-6">New Task</Dialog.Title>
          </div>
        </div>
        <div className="relative px-4 sm:px-5">
          <CardDetailComponent>
            <div className="px-3">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Name..."
                className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </CardDetailComponent>
        </div>
        <div className="relative px-4 sm:px-5">
          <CardDetailComponent>
            <div className="px-5">
              <table border={0} className="w-full align-middle">
                <tr>
                  <td className="h-[31px] w-[120px]">Status</td>
                  <td className="w-[203px]">
                    <Global.Dropdown
                      items={taskStatusDropdown}
                      fullWidth={true}
                      forceOverlap={true}
                      className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                      menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                      menuButtonClassName="focus-visible:outline-none"
                    >
                      {Object.keys(taskStatusSelected).length ? (
                        <Global.Badge
                          text={taskStatusSelected.name}
                          hexColor={taskStatusSelected.hex_color}
                        />
                      ) : null}
                    </Global.Dropdown>
                  </td>
                  <td className="h-[31px] w-[120px] pl-2">Created At</td>
                  <td className="text-[#EAEAEA]">
                    <div
                      className="relative mx-1 block w-full rounded-lg px-3 py-0.5 text-left transition duration-100 ease-in"
                      data-headlessui-state
                    >
                      <div className="h-full min-h-[25px] w-full text-left">
                        {convertDate(new Date())}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="h-[31px] w-[120px]">Assignees</td>
                  <td className="w-[203px]">
                    <Global.Dropdown
                      items={[
                        {
                          url: "#",
                          content: (
                            <div className="flex items-center">
                              <div className="h-[22px] w-[22px] flex-shrink-0">
                                <img
                                  className="h-[22px] w-[22px] rounded-full"
                                  src="/images/user-img-sample.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="ml-2">Devan</div>
                            </div>
                          ),
                          isInnerHTML: false,
                        },
                        {
                          url: "#",
                          content: (
                            <div className="flex items-center">
                              <div className="h-[22px] w-[22px] flex-shrink-0">
                                <img
                                  className="h-[22px] w-[22px] rounded-full"
                                  src="/images/user-img-sample.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="ml-2">Rizky</div>
                            </div>
                          ),
                          isInnerHTML: false,
                        },
                      ]}
                      fullWidth={true}
                      forceOverlap={true}
                      className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                      menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                      menuButtonClassName="min-h-[25px]"
                    >
                      <span className="px-1">Assign...</span>
                    </Global.Dropdown>
                  </td>
                  <td className="h-[31px] w-[120px] pl-2">Due Date</td>
                  <td className="text-[#EAEAEA]">
                    <div className="min-h-[25px] w-full rounded-lg text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                      <div className="px-1">
                        <Global.Datepicker inputClassName="!px-3 !py-0.5" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="h-[31px] w-[120px]">Lists</td>
                  <td className="w-[203px]">
                    <Global.Dropdown
                      items={listDropdown}
                      fullWidth={true}
                      forceOverlap={true}
                      className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                      menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                      menuButtonClassName="min-h-[25px]"
                    >
                      {Object.keys(listSelected).length ? (
                        <span
                          className="px-1"
                          style={{ color: listSelected.hex_color }}
                        >
                          {listSelected.name}
                        </span>
                      ) : null}
                    </Global.Dropdown>
                  </td>
                  <td className="h-[31px] w-[120px] pl-2">Priority</td>
                  <td>
                    <Global.Dropdown
                      items={taskPriorityDropdown}
                      fullWidth={true}
                      forceOverlap={true}
                      className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                      menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                      menuButtonClassName="min-h-[25px]"
                    >
                      {Object.keys(taskPrioritySelected).length ? (
                        <span
                          className="px-1"
                          style={{ color: taskPrioritySelected.hex_color }}
                        >
                          {taskPrioritySelected.name}
                        </span>
                      ) : (
                        <span className="px-1 text-[rgba(255,255,255,.9)]">
                          None
                        </span>
                      )}
                    </Global.Dropdown>
                  </td>
                </tr>
                <tr>
                  <td className="h-[31px] w-[120px]">Created By</td>
                  <td className="text-[#EAEAEA]">
                    <div className="min-h-[25px] w-full px-3 py-0.5">
                      <span className="px-1">
                        {dataProfile?.first_name} {dataProfile?.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="h-[31px] w-[120px] pl-2">Project</td>
                  <td>
                    <Global.Dropdown
                      items={taskProjectDropdown}
                      fullWidth={true}
                      forceOverlap={true}
                      className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                      menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                      menuButtonClassName="min-h-[25px]"
                    >
                      {Object.keys(taskProjectSelected).length ? (
                        <span
                          className="px-1"
                          style={{ color: taskProjectSelected.hex_color }}
                        >
                          {taskProjectSelected.name}
                        </span>
                      ) : (
                        <span className="px-1 text-[rgba(255,255,255,.9)]">
                          None
                        </span>
                      )}
                    </Global.Dropdown>
                  </td>
                </tr>
              </table>
            </div>
          </CardDetailComponent>
        </div>
        <div className="relative px-4 sm:px-5">
          <CardDetailComponent>
            <div className="px-3">
              <textarea
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                placeholder="Description..."
                className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                rows="8"
                style={{ resize: "none" }}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </CardDetailComponent>
        </div>
        <div className="relative flex justify-between px-4 sm:px-5">
          <Global.Button
            type="button"
            color="secondary"
            size="sm"
            onClick={() => setOpenModal(false)}
          >
            <RxCross2 /> Cancel
          </Global.Button>
          <div className="flex gap-2">
            <Global.Button
              type="button"
              color="light"
              size="sm"
              onClick={() => setOpenModal(false)}
            >
              <GoPencil /> Save to draft
            </Global.Button>
            <Form.Submit asChild>
              <Global.Button type="submit" color="success" size="sm">
                <AiOutlinePlus /> Create
              </Global.Button>
            </Form.Submit>
          </div>
        </div>
      </Form.Root>
    </Global.Modal>
  );
};