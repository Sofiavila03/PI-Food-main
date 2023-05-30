import React from "react";
import styles from "./About.module.css";
import { NavLink } from "react-router-dom";
import aboutImage from "../../img/foto perfil sofi.jpg";

export default function HomePage(props) {
  return (
    <div>
      <NavLink to="/home">
        <button className={styles.boton}>⬅</button>
      </NavLink>
      <div className={styles.parrafo}>
        <div className={styles.imageContainer}>
          <img src={aboutImage} alt="About Me" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h2>About me</h2>
          <p>
            Hello! I'm Sofia, a professional with a passion for data and programming. After studying
            accounting, I delved into the fascinating world of data science and discovered a deep
            interest in programming. This led me to enroll in a full-stack developer bootcamp, where I
            have found immense joy and fulfillment in learning to create robust and dynamic
            applications from scratch. While my background in accounting provided a strong
            foundation, my transition to data science and full-stack development has ignited a renewed
            enthusiasm and sense of purpose. I'm excited about the endless possibilities this field has to
            offer and look forward to making a meaningful impact through my work in technology.
          </p>
        </div>
      </div>
    </div>
  );
}
