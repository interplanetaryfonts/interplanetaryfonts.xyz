import { useState } from "react";
import Link from "next/link";
import classes from "../../../styles/UserDashboard.module.css";
// Components
import DashboardElement from "../../UI/DashboardElement";
import Button from "../../UI/Button";
import CreateProject from "../../Overlay/CreateProject";

export default function Created(props) {
  const [mounted, setMounted] = useState(false);
  const handleMount = (bool) => {
    setMounted(bool);
  };

  return (
    <>
      <div className={classes["profile-elements"]}>
        {props.elements.map((el, i) => (
          <DashboardElement key={`created-el-${i}`}>
            <p>{el.txt}</p>
            <Link href={el.url} passHref>
              <a>View Project</a>
            </Link>
          </DashboardElement>
        ))}
        <Button onClick={() => handleMount(true)}>Create New Project</Button>
      </div>
      <CreateProject handleMount={handleMount} mounted={mounted} />
    </>
  );
}
