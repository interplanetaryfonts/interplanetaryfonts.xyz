import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logoHeader.svg";
import classes from "@/styles/NavBar.module.css";

export default function NavBar() {
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
    </nav>
  );
}
