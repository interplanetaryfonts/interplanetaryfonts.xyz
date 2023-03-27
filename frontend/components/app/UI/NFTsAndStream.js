import Link from "next/link";
import classes from "@/styles/NFTsAndStream.module.css";

export default function NFTsAndStream(props) {
  return (
    <div className={`${classes.container} ${props.classes}`}>
      <p className={classes.header}>
        <strong className={classes["header-name"]}>{props.nme}</strong>
        {props?.date ?? <span>{props.date}</span>}
      </p>
      <div className={classes.element}>
        <strong>Parent Project</strong>{" "}
        <Link href={props.parentp.url} passHref>
          <a>{props.parentp.nme}</a>
        </Link>
      </div>
      {props.children}
    </div>
  );
}
