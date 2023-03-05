import DashboardContent from "@/components/app/UI/DashboardContent";
import UserButtons from "./UserButtons";

export default function ProfileDashboard(props) {
  return (
    <DashboardContent>
      <UserButtons
        buttons={props.buttons}
        handleActiveDashboard={props.handleActiveDashboard}
      />
      {props.children}
    </DashboardContent>
  );
}
