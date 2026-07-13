import React from "react";
import Banner from "./Banner.jsx";
import Showcase from "./Showcase.jsx";
import AboutHome from "./AboutHome.jsx";
import Services from "./Services.jsx";
import WorkProcess from "./WorkProcess.jsx";
import Commitments from "./Commitments.jsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showcase />
      <AboutHome />
      <Services />
      <WorkProcess />
      <Commitments />
    </div>
  );
}
