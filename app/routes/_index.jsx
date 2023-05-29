import { useEffect } from "react";

export const meta = () => [{ title: "Somat App" }];

export default function Index() {
  useEffect(() => {
    window.location.href = "/app/test";
  }, []);
}
