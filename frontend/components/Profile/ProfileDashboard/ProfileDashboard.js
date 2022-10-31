import DashboardContent from '../../UI/DashboardContent';
import UserButtons from './UserButtons';

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
