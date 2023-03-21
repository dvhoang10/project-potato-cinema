import React, { useEffect } from "react";
import { POTATO } from "utils/config";
import HomeBanner from "./HomeBanner";

export default function HomePage() {
  useEffect(() => {
    document.title = `${POTATO}`;
  }, []);
  return (
    <>
      <HomeBanner></HomeBanner>
    </>
  );
}
