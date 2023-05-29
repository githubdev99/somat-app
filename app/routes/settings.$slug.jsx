import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Layout } from "~/components";

export const meta = () => [{ title: "Somat App - Profile Settings" }];

export const loader = async (data) => {
  return json(data);
};

export default function Settings() {
  const data = useLoaderData();

  return (
    <>
      <Layout.Container>
        <Layout.SidebarSettings data={data} />
        <Layout.ContentSettings data={data} />
      </Layout.Container>
    </>
  );
}
