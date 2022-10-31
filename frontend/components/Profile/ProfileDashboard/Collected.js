import Link from 'next/link';
import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';

export default function Collected(props) {
  return (
    <div className={classes['profile-elements']}>
      {props.elements.map((el, i) => (
        <DashboardElement key={`collected-el-${i}`}>
          <p>{el.txt}</p>
          <Link href={el.url} passHref>
            <a>View NFT</a>
          </Link>
        </DashboardElement>
      ))}
    </div>
  );
}
