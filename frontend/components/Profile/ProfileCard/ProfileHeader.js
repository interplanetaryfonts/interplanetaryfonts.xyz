import { useState } from "react";
import classes from "../../../styles/ProfileHeader.module.css";
// Components
import CardHeader from "../../UI/CardHeader";
import CardHeaderButton from "../../UI/CardHeaderButton";

export default function ProfileHeader(props) {
  // State
  const [cardColor] = useState({
    normal: "darkblue",
    hover: "red",
    active: "yellow",
  });
  const [btns, setBtns] = useState([
    { nme: "Creator", active: true, path: "/profile/creator" }, // Add username
    { nme: "Collector", active: false, path: "/profile/collector" }, // Add username
  ]);
  // Event handlers
  const handleActiveButtons = (pressed) => {
    setBtns((prevBtns) =>
      prevBtns.map((btn) => {
        btn.active = btn.nme === pressed;
        return btn;
      })
    );
  };
  // Component
  return (
    <CardHeader title="User" color={cardColor}>
      <div className={classes.buttons}>
        {props.connected ? (
          btns.map((btn, i) => {
            return (
              <CardHeaderButton
                key={`btn-${i}`}
                active={btn.active}
                color={cardColor}
                handleSubprofile={props.handleSubprofile}
                handleActiveButtons={handleActiveButtons}
              >
                {btn.nme}
              </CardHeaderButton>
            );
          })
        ) : (
          <a
            style={{ width: "100%", display: "flex" }}
            href="https://lenster.xyz/"
            target="blank"
          >
            <CardHeaderButton
              className={classes.onecol}
              active={false}
              color={cardColor}
              handleSubprofile={() => console.log("subprofile")}
              handleActiveButtons={() => console.log("follow")}
            >
              Follow
            </CardHeaderButton>
          </a>
        )}
      </div>
    </CardHeader>
  );
}
