import React from "react";
import "./ProfileCard.css";
import profileImg from "../../assets/images/Home/profile.jpg";

function ProfileCard() {
  return (
    <div className="profile-card">
      {/* Left Text */}
      <div className="profile-text">
        <h1 className="profile-title">
          Halo, Saya <span>Dary Dimas Wijaya</span>
        </h1>
        <p className="profile-desc">
          Seorang developer yang fokus pada AI Programmer dan suka eksplorasi
          teknologi modern. Saya suka membangun website dengan elemen visual
          neon RGB, animasi, dan efek cyberpunk. Selamat datang di Dimas Code!
        </p>
      </div>

      {/* Right: Image + Smoke + Particles */}
      <div className="profile-image-wrapper">
        <img src={profileImg} alt="Profile" className="profile-image" />

        {/* RGB Glowing Smoke */}
        <div className="rgb-smoke"></div>

        {/* Particles */}
        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
