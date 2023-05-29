import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";

export default function Profile(props) {
  return (
    <div className="max-w-[580px] text-[#ACACAC]">
      <div className="text-[rgba(255,255,255,.9)]">Profile settings</div>
      <div className="py-5">
        <div className="sm:col-span-4">
          <label
            htmlFor="firstname"
            className="block text-sm font-normal leading-6"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="firstname"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label
            htmlFor="lastname"
            className="block text-sm font-normal leading-6"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="lastname"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-normal leading-6"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
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
                <img
                  className="h-[120px] w-[120px] rounded-full"
                  src="https://imageproxy.height.app/240/https%3A%2F%2Ffiles.height.app%2Fe248e474-5297-48fc-b7f8-d28971bbf489.jpg"
                  alt=""
                />
              </div>
              <Global.Button type="button" color="outlined-secondary" size="sm">
                Upload
              </Global.Button>
              <Global.Button type="button" color="outlined-secondary" size="sm">
                Remove
              </Global.Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Global.Button type="button" color="outlined-secondary" size="sm">
          Save
        </Global.Button>
      </div>
    </div>
  );
}
