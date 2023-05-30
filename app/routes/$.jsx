import { Link } from "@remix-run/react";
import { Global } from "~/components";

export const meta = () => [
  {
    title: "Oops!",
  },
];

export default function Index() {
  return (
    <main className="grid min-h-full place-items-center bg-[#242424] px-6 py-24 text-[#ACACAC] sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[rgba(255,255,255,.9)]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[rgba(255,255,255,.9)] sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-[rgba(255,255,255,.4)]">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-5 flex items-center justify-center gap-x-6">
          <Link to="/app/test">
            <Global.Button type="button" color="outlined-secondary" size="sm">
              Go back home
            </Global.Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
