import styles from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <h1>COOK IT YOURSELF</h1>
        <NavLink to="/home">
          <button>Join Now</button>
        </NavLink>
      </div>
    </div>
  );
}
