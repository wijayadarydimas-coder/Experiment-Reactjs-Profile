import React from "react";
import "./Home.css";
import Greeting from "../Home/Greeting";
import ProfileCard from "./ProfileCard";

function Home() {
  return (
    <>
      <section className="home">
        <div className="home-container">
          <Greeting />
        </div>
        <div className="home-container">
          <ProfileCard />
        </div>
      </section>
    </>
  );
}

export default Home;
