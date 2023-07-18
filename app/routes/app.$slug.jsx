import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Global, Layout, Task } from "~/components";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Dialog } from "@headlessui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import * as Form from "@radix-ui/react-form";

export const meta = () => [{ title: "Somat App" }];

export const loader = async (data) => {
  return json(data);
};

export default function Index() {
  const data = useLoaderData();
  const { params } = data || {};
  const { slug } = params || {};

  const [openTaskDetail, setOpenTaskDetail] = useState(false);
  const [authComponent, setAuthComponent] = useState("auth");
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openAddListModal, setOpenAddListModal] = useState(false);
  const [openAddWorkspaceModal, setOpenAddWorkspaceModal] = useState(false);

  const components = {
    auth: <AuthComponent setComponent={setAuthComponent} />,
    login: <LoginComponent setComponent={setAuthComponent} />,
    signup: <SignupComponent setComponent={setAuthComponent} />,
  };

  let isAuthPage = slug && String(slug).includes("auth");

  useEffect(() => {
    window.addTaskModal = () => {
      setOpenAddTaskModal(true);
    };

    window.addListModal = () => {
      setOpenAddListModal(true);
    };

    window.addWorkspaceModal = () => {
      setOpenAddWorkspaceModal(true);
    };
  }, []);

  return (
    <>
      {isAuthPage ? (
        <Global.Modal
          open={true}
          setOpen={() => {}}
          className="top"
          positionClassName="inset-x-0 top-28"
          size="sm"
        >
          {components[authComponent]}
        </Global.Modal>
      ) : (
        <>
          <Global.Modal
            open={openAddTaskModal}
            setOpen={setOpenAddTaskModal}
            size="custom"
            positionClassName="inset-x-0 top-3"
            panelClassName="max-w-[800px]"
          >
            <div className="flex h-full flex-col gap-3 rounded-lg border border-[#323232] bg-[#121212] py-3 shadow-2xl">
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
                      autoComplete="name"
                      placeholder="Name..."
                      className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
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
                            items={[
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="To do"
                                    hexColor="#242424"
                                    borderColor="#3c3c3c"
                                    textColor="white"
                                    backgroundOpacity="1"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="Hold"
                                    hexColor="#ff2eb9"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="In Progress"
                                    hexColor="#f6b065"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="Internal Review"
                                    hexColor="#1f96ff"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="Client Review"
                                    hexColor="#725cff"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <Global.Badge
                                    text="Done"
                                    hexColor="#00b8a8"
                                  />
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: "Configure Statuses...",
                                isInnerHTML: true,
                                isBottomLink: true,
                              },
                            ]}
                            fullWidth={true}
                            forceOverlap={true}
                            className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                            menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                            menuButtonClassName="focus-visible:outline-none"
                          >
                            <Global.Badge
                              text="To do"
                              hexColor="#242424"
                              borderColor="#3c3c3c"
                              textColor="white"
                              backgroundOpacity="1"
                            />
                          </Global.Dropdown>
                        </td>
                        <td className="h-[31px] w-[120px] pl-2">Created At</td>
                        <td className="text-[#EAEAEA]">
                          <div className="min-h-[25px] w-full rounded-lg text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                            <div className="px-1">
                              <Global.Datepicker inputClassName="!px-3 !py-0.5" />
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
                        <td>
                          <div className="min-h-[25px] w-full px-3 py-0.5">
                            <span className="px-1">None</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="h-[31px] w-[120px]">Lists</td>
                        <td className="w-[203px]">
                          <Global.Dropdown
                            items={[
                              {
                                url: "#",
                                content: "ShopCommerce",
                              },
                            ]}
                            fullWidth={true}
                            forceOverlap={true}
                            className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                            menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                            menuButtonClassName="min-h-[25px]"
                          >
                            <span className="px-1">None</span>
                          </Global.Dropdown>
                        </td>
                        <td className="h-[31px] w-[120px] pl-2">Priority</td>
                        <td>
                          <Global.Dropdown
                            items={[
                              {
                                url: "#",
                                content: (
                                  <span className="text-[rgba(255,255,255,.9)]">
                                    None
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#fd6b5d" }}>High</span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#f2b054" }}>
                                    Medium
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#56c70f" }}>Low</span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: "Configure Priorities...",
                                isInnerHTML: true,
                                isBottomLink: true,
                              },
                            ]}
                            fullWidth={true}
                            forceOverlap={true}
                            className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                            menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                            menuButtonClassName="min-h-[25px]"
                          >
                            <span className="px-1" style={{ color: "#fd6b5d" }}>
                              High
                            </span>
                          </Global.Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td className="h-[31px] w-[120px]">Parent Task</td>
                        <td className="w-[203px]">
                          <div className="min-h-[25px] w-full px-3 py-0.5">
                            <span className="px-1">None</span>
                          </div>
                        </td>
                        <td className="h-[31px] w-[120px] pl-2">Project</td>
                        <td>
                          <Global.Dropdown
                            items={[
                              {
                                url: "#",
                                content: (
                                  <span className="text-[rgba(255,255,255,.9)]">
                                    None
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#08c408" }}>
                                    PHASE 1
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#725cff" }}>
                                    PHASE 2
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#1f96ff" }}>
                                    PHASE 3
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: (
                                  <span style={{ color: "#ff2eb9" }}>
                                    PHASE 4
                                  </span>
                                ),
                                isInnerHTML: false,
                              },
                              {
                                url: "#",
                                content: "Configure Projects...",
                                isInnerHTML: true,
                                isBottomLink: true,
                              },
                            ]}
                            fullWidth={true}
                            forceOverlap={true}
                            className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                            menuItemsClassName="left-0 max-h-[180px] overflow-y-auto"
                            menuButtonClassName="min-h-[25px]"
                          >
                            <span className="px-1" style={{ color: "#08c408" }}>
                              PHASE 1
                            </span>
                          </Global.Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td className="h-[31px] w-[120px]">Created By</td>
                        <td className="text-[#EAEAEA]">
                          <div className="min-h-[25px] w-full px-3 py-0.5">
                            <span className="px-1">Lusa Indah</span>
                          </div>
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
                      autoComplete="description"
                      placeholder="Description..."
                      className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                      rows="5"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                </CardDetailComponent>
              </div>
              <div className="relative flex justify-between px-4 sm:px-5">
                <Global.Button
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => setOpenAddTaskModal(false)}
                >
                  <RxCross2 /> Cancel
                </Global.Button>
                <div className="flex gap-2">
                  <Global.Button
                    type="button"
                    color="light"
                    size="sm"
                    onClick={() => setOpenAddTaskModal(false)}
                  >
                    <GoPencil /> Save to draft
                  </Global.Button>
                  <Global.Button
                    type="button"
                    color="success"
                    size="sm"
                    onClick={() => setOpenAddTaskModal(false)}
                  >
                    <AiOutlinePlus /> Create
                  </Global.Button>
                </div>
              </div>
            </div>
          </Global.Modal>
          <Global.Modal
            open={openAddListModal}
            setOpen={setOpenAddListModal}
            positionClassName="inset-x-0 top-3"
            size="sm"
          >
            <div className="px-5 py-3">
              <div className="mb-4 text-[rgba(255,255,255,.9)]">
                Create new list
              </div>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-normal leading-6"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-normal leading-6"
                >
                  Description
                </label>
                <div className="mt-1">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="description"
                    className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
              <div className="flex justify-between">
                <Global.Button
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => setOpenAddListModal(false)}
                >
                  <RxCross2 /> Cancel
                </Global.Button>
                <Global.Button
                  type="button"
                  color="success"
                  size="sm"
                  onClick={() => {
                    window.showToastNotification();
                  }}
                >
                  <AiOutlinePlus /> Create
                </Global.Button>
              </div>
            </div>
          </Global.Modal>
          <Global.Modal
            open={openAddWorkspaceModal}
            setOpen={setOpenAddWorkspaceModal}
            positionClassName="inset-x-0 top-3"
            size="sm"
          >
            <div className="px-5 py-3">
              <div className="mb-4 text-[rgba(255,255,255,.9)]">
                Create new workspace
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-normal leading-6"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
              <div className="flex justify-between">
                <Global.Button
                  type="button"
                  color="danger"
                  size="sm"
                  onClick={() => setOpenAddWorkspaceModal(false)}
                >
                  <RxCross2 /> Cancel
                </Global.Button>
                <Global.Button
                  type="button"
                  color="success"
                  size="sm"
                  onClick={() => {
                    window.showToastNotification();
                  }}
                >
                  <AiOutlinePlus /> Create
                </Global.Button>
              </div>
            </div>
          </Global.Modal>
          <Task.SlideOverDetail />
        </>
      )}
      <Global.ToastNotification />
      <Global.AlertConfirmation />
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
          openTaskDetail={openTaskDetail}
          setOpenTaskDetail={setOpenTaskDetail}
          openAddTaskModal={openAddTaskModal}
          setOpenAddTaskModal={setOpenAddTaskModal}
          openAddListModal={openAddListModal}
          setOpenAddListModal={setOpenAddListModal}
        />
        <Layout.Content
          data={data}
          openTaskDetail={openTaskDetail}
          setOpenTaskDetail={setOpenTaskDetail}
          openAddTaskModal={openAddTaskModal}
          setOpenAddTaskModal={setOpenAddTaskModal}
        />
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
  return (
    <div>
      <BackAuthComponent {...props} headerText="Log in page" />
      <div className="bg-[#242424] px-8 py-5">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-normal leading-6"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-normal leading-6"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <Link to="/app/shopcommerce">
          <Global.Button
            type="button"
            color="light"
            size="sm"
            className="w-full"
          >
            Log in
          </Global.Button>
        </Link>
      </div>
    </div>
  );
};

const SignupComponent = (props) => {
  return (
    <Form.Root>
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
                  autoComplete="firstname"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
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
                  autoComplete="lastname"
                  className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
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
                  autoComplete="email"
                  className="mb-1 block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  required
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
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter a confirm password
              </Form.Message>
            </div>
          </div>
        </Form.Field>
        <Link to="/app/auth">
          <Global.Button
            type="button"
            color="light"
            size="sm"
            className="w-full"
          >
            Sign up
          </Global.Button>
        </Link>
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
