import classes from '../../styles/Notifications.module.css';

export default function Notification(props) {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <p>{props.message}</p>
    </div>
  );
}
