import classes from "@/styles/Card.module.css";
// Components
import ProfileHeader from "./ProfileHeader";
import ProfileData from "./ProfileData";

export default function ProfileCard(props) {
  return (
    <div
      className={`${classes.container} ${!props.connected && classes.centered}`}
    >
      <ProfileHeader
        connected={props.connected}
        handleSubprofile={props.handleSubprofile}
      />
      <ProfileData user={props.user} connected={props.connected} />
    </div>
  );
}
