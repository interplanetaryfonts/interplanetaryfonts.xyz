import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logoHeader.svg";
import classes from "@/styles/NavBar.module.css";
import getAppURL from "@/utils/getAppURL";

export default function NavBar() {
  const appURL = getAppURL(process.env.NEXT_PUBLIC_URL);

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
      <a
        href={appURL}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Launch (Test)App{" "}
      </a>
    </nav>
  );
}
