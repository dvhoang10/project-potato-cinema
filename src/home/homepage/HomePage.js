import React, { useEffect } from "react";
import { POTATO } from "utils/config";

export default function HomePage() {
  useEffect(() => {
    document.title = `${POTATO}`;
  }, []);
  return <div>Homepage</div>;
}
