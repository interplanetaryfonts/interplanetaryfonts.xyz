import { useState } from "react";
// Components
import ProfileCard from "@/components/app/Profile/ProfileCard/ProfileCard";
import DashboardContainer from "@/components/app/UI/DashboardContainer";
import ProfileDashboard from "@/components/app/Profile/ProfileDashboard/ProfileDashboard";
import Created from "@/components/app/Profile/ProfileDashboard/Created";
import Collabs from "@/components/app/Profile/ProfileDashboard/Collabs";
import Treasury from "@/components/app/Profile/ProfileDashboard/Treasury";
import Collected from "@/components/app/Profile/ProfileDashboard/Collected";
import Funded from "@/components/app/Profile/ProfileDashboard/Funded";

export default function Profile(props) {
  // Util
  const profileButtons = {
    creator: {
      created: { txt: "Created", active: true },
      collabs: { txt: "Collabs", active: false },
      treasury: { txt: "Treasury", active: false },
    },
    collector: {
      collected: { txt: "Collected", active: true },
      funded: { txt: "Funded", active: false },
    },
  };
  const getActiveButton = (btns) =>
    Object.values(btns)
      .filter((button) => button.active)[0]
      .txt.toLowerCase();
  const getCurrentDashboard = (cb, sp) => {
    return cb === "created" && sp === "creator" ? (
      <Created elements={props.user.created} />
    ) : cb === "collabs" && sp === "creator" ? (
      <Collabs elements={props.user.collabs} />
    ) : cb === "treasury" && sp === "creator" ? (
      <Treasury elements={props.user.treasury} />
    ) : cb === "collected" && sp === "collector" ? (
      <Collected elements={props.user.collected} />
    ) : cb === "funded" && sp === "collector" ? (
      <Funded elements={props.user.funded} />
    ) : (
      ""
    );
  };
  // State
  const [subprofile, setSubprofile] = useState("creator");
  const [buttons] = useState({ ...profileButtons });
  const [activeButtons, setActiveButtons] = useState(buttons[subprofile]);
  const [currentButton, setCurrentButton] = useState("created");
  const [activeDashboard, setActiveDashboard] = useState(
    getCurrentDashboard(currentButton, subprofile)
  );
  // Event Handlers
  const handleSubprofile = (sp) => {
    const splower = sp.toLowerCase();
    const tempActive = buttons[splower];
    const tempActiveButton = getActiveButton(tempActive);
    setSubprofile(splower);
    setActiveButtons(tempActive);
    setCurrentButton(tempActiveButton);
    setActiveDashboard(getCurrentDashboard(tempActiveButton, splower));
  };
  const handleActiveDashboard = (e) => {
    setActiveButtons((prevButtons) => {
      const temp = Object.fromEntries(
        Object.entries(prevButtons).map((entry) => {
          if (entry[1].txt === e.target.textContent) {
            entry[1].active = true;
          } else {
            entry[1].active = false;
          }
          return entry;
        })
      );
      setCurrentButton(getActiveButton(temp));
      setActiveDashboard(
        getCurrentDashboard(getActiveButton(temp), subprofile)
      );
      return temp;
    });
  };

  return (
    <DashboardContainer>
      <ProfileCard
        user={props.user}
        subprofile={subprofile}
        connected={props.connected}
        handleSubprofile={handleSubprofile}
      />
      {props.connected ? (
        <ProfileDashboard
          buttons={activeButtons}
          handleActiveDashboard={handleActiveDashboard}
        >
          {activeDashboard}
        </ProfileDashboard>
      ) : (
        ""
      )}
    </DashboardContainer>
  );
}
