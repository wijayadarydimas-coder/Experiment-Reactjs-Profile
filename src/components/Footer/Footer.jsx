import React from "react";
import "./Footer.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <p>© 2025 Dary Dimas Wijaya</p>

      <div className="footer-links">
        <a
          href="https://www.instagram.com/dariyydw_"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>

        <a href="mailto:wijayadarydimas@gmail.com">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
