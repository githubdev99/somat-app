/* eslint-disable react-hooks/exhaustive-deps */
import * as Form from "@radix-ui/react-form";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";
import { updateProfile, updateProfileImage } from "~/lib/api";

export default function Profile() {
  const { dataProfile, handleDataProfile } = useContext(Global.RootContext);

  const { email } = dataProfile || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState({});

  const inputFileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateProfile(
      {
        ...{
          first_name: firstName,
          last_name: lastName,
        },
        ...(!profileImage && {
          profile_image: null,
        }),
      },
      localStorage.getItem("token")
    );

    const { code, message } = response?.status || {};

    if ("name" in profileImageFile)
      await updateProfileImage(profileImageFile, localStorage.getItem("token"));

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    await handleDataProfile();
  };

  const handleChangeProfileImage = (e) => {
    if (e?.target?.files?.length) {
      const file = e.target.files[0];

      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleResetProfileImage = () => {
    setProfileImage("");
    setProfileImageFile({});

    inputFileRef.current.value = null;
  };

  useEffect(() => {
    handleDataProfile();
  }, []);

  useEffect(() => {
    const { first_name, last_name, profile_image } = dataProfile || {};

    setFirstName(first_name);
    setLastName(last_name);
    setProfileImage(profile_image);
  }, [dataProfile]);

  return (
    <Form.Root className="max-w-[580px] text-[#ACACAC]" onSubmit={handleSubmit}>
      <div className="text-[rgba(255,255,255,.9)]">Profile settings</div>
      <div className="py-5">
        <Form.Field className="sm:col-span-4" name="firstname">
          <label
            htmlFor="firstname"
            className="block text-sm font-normal leading-6"
          >
            First name
          </label>
          <div className="mt-2">
            <Form.Control asChild>
              <input
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="firstname"
                defaultValue={firstName}
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-red-400">
              Please enter a first name
            </Form.Message>
          </div>
        </Form.Field>
      </div>
      <div className="pb-5">
        <Form.Field className="sm:col-span-4" name="email">
          <label
            htmlFor="lastname"
            className="block text-sm font-normal leading-6"
          >
            Last name
          </label>
          <div className="mt-2">
            <Form.Control asChild>
              <input
                id="lastname"
                name="lastname"
                type="text"
                autoComplete="lastname"
                defaultValue={lastName}
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Control>
          </div>
        </Form.Field>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-normal leading-6"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              defaultValue={email}
              className="block w-full max-w-[400px] cursor-not-allowed rounded-md border-0 bg-[#414141] px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label className="block text-sm font-normal leading-6">
            Profile picture
          </label>
          <div className="col-span-full mt-2">
            <div className="mt-2 flex items-start gap-x-3">
              <div className="h-[120px] w-[120px] flex-shrink-0">
                {profileImage ? (
                  <img
                    className="h-[120px] w-[120px] rounded-full"
                    src={profileImage}
                    alt=""
                  />
                ) : (
                  <FaUserCircle className="h-[120px] w-[120px] rounded-full" />
                )}
              </div>
              <label htmlFor="file-upload">
                <span className="flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-normal text-[rgba(255,255,255,.64)] shadow-sm ring-1 ring-inset ring-[#414141] transition  duration-200 ease-in hover:bg-[#414141] focus:outline-none active:bg-slate-500 active:opacity-80 active:ring-slate-500">
                  Upload
                </span>
                <input
                  ref={inputFileRef}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleChangeProfileImage}
                  accept="image/*"
                />
              </label>
              {profileImage && (
                <Global.Button
                  type="button"
                  color="outlined-secondary"
                  size="sm"
                  onClick={handleResetProfileImage}
                >
                  Remove
                </Global.Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Form.Submit asChild>
          <Global.Button type="submit" color="outlined-secondary" size="sm">
            Save
          </Global.Button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}
