import classes from "@/styles/Disclaimer.module.css";

export default function Disclaimer() {
  return (
    <div className={classes.disclaimer}>
      <strong>InterplantaryFonts is still in development phase,</strong> things
      may break or not work properly.{" "}
      <strong>Please use a test wallet to connect (Mumbai network)</strong> and
      interact with the application. Let us know your feedback and suggestions
      in{" "}
      <a href="https://discord.gg/BbCXz8Dsfu" target="blank">
        Discord
      </a>
    </div>
  );
}
