'use client';

import WelcomePage from "./welcome";
import Sidebar from "components/sidebar";

export default function Home() {
  const disableSideBarInPages = ['/welcome'];
  return (
    <>
      <WelcomePage />
      {disableSideBarInPages.includes(`/welcome`) ? '' : <Sidebar />}
    </>

  );
}
