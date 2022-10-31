import classes from '../../styles/DashboardContent.module.css';

export default function DashboardContent(props) {
  return (
    <div className={`${classes.container} ${props.className}`}>
      {props.children}
    </div>
  );
}
