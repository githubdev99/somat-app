import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { workspaceInviteAccept } from "~/lib/api";
import { useLoaderData } from "@remix-run/react";

export const meta = () => [{ title: "Somat App - Accept Invitation" }];

export const loader = async (data) => {
  return json(data);
};

export default function Index() {
  const data = useLoaderData();
  const { params } = data || {};
  const { slug } = params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [statusInvitation, setStatusInvitation] = useState(false);

  const handleWorkspaceInviteAccept = async (id) => {
    setIsLoading(true);

    const response = await workspaceInviteAccept(
      id,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) {
      setIsLoading(false);
    } else {
      setStatusInvitation(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleWorkspaceInviteAccept(slug);
  }, [slug]);

  return isLoading ? null : (
    <main className="grid min-h-full place-items-center bg-[#242424] px-6 py-24 text-[#ACACAC] sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[rgba(255,255,255,.9)] sm:text-5xl">
          Accept Invitation
        </h1>
        <p className="mt-4 text-base leading-7 text-[rgba(255,255,255,.4)]">
          {statusInvitation
            ? `Success accept invitation, the workspace automatically show in your
          account`
            : `Failed to accept invitation, please try again later`}
        </p>
      </div>
    </main>
  );
}
