import classes from "@/styles/Footer.module.css";
import dc from "@/public/Icons/social/discord.svg";
import gh from "@/public/Icons/social/github.svg";
import ig from "@/public/Icons/social/instagram.svg";
import ls from "@/public/Icons/social/lens.svg";
import tw from "@/public/Icons/social/twitter.svg";

const socials = [
  {
    name: "twitter",
    icon: tw.src,
    url: "https://twitter.com/IPFonts",
  },
  {
    name: "lens",
    icon: ls.src,
    url: "https://lenster.xyz/u/interplanetaryfonts.lens",
  },
  {
    name: "instagram",
    icon: ig.src,
    url: "https://instagram.com/interplanetaryfonts",
  },
  {
    name: "discord",
    icon: dc.src,
    url: "https://discord.gg/BbCXz8Dsfu",
  },
  {
    name: "github",
    icon: gh.src,
    url: "https://github.com/interplanetaryfonts",
  },
];

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer-content"]}>
        <p style={{ color: "var(--light)" }}>
          Made with ♥︎ by the <strong>InterplanetaryFonts team.</strong>
        </p>
        <ul className={classes.socials}>
          {socials.map((social, i) => {
            return (
              <a key={`${social.name}-${i}`} href={social.url} target="blank">
                <li
                  className={classes.icon}
                  style={{
                    maskImage: `url('${social.icon}')`,
                    WebkitMaskImage: `url('${social.icon}')`,
                  }}
                ></li>
              </a>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
