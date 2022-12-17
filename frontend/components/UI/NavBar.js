import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/logoHeader.svg";
import classes from "../../styles/NavBar.module.css";
import ConnectButton from "../UI/ConnectButton";

export default function NavBar(props) {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleHamburgerMenu = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className={classes.nav}>
      <div className={classes["nav-logo"]}>
        <Link href="/">
          <a>
            <Image
              src={logo}
              alt="InterplanetaryFonts"
              width={78.91}
              height={100}
              className={classes.logo}
            />
          </a>
        </Link>
        <h5>InterplanetaryFonts</h5>
      </div>
      <button
        className={`${classes["hamburger-button"]}`}
        type="button"
        onClick={handleHamburgerMenu}
      >
        <div className={classes["hamburger-line"]}></div>
        <div className={classes["hamburger-line"]}></div>
        <div className={classes["hamburger-line"]}></div>
      </button>
      <div
        className={`${classes["nav-menu"]} ${
          !navbarOpen && classes["nav-menu-closed"]
        }`}
      >
        <div className="flex flex-wrap items-center">
          <Link href="/universe" passHref legacyBehavior>
            <a
              className={`${classes["nav-link"]} ${
                router.pathname === "/universe"
                  ? classes["nav-link-active"]
                  : ""
              }`}
            >
              FontsUniverse
            </a>
          </Link>
        </div>
        <ConnectButton
          handleLensLogout={props.handleLensLogout}
          isLoggedInWithLens={props.token}
          onLensLogin={props.handleLensLogin}
        />
        <button className={classes.cancel} onClick={handleHamburgerMenu}>
          Cancel
        </button>
      </div>
    </nav>
  );
}
