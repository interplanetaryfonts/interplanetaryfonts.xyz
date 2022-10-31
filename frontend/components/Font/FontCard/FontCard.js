import classes from '../../../styles/Card.module.css';
// Components
import FontHeader from './FontHeader';
import FontData from './FontData';

export default function FontCard(props) {
  return (
    <div className={classes.container}>
      <FontHeader />
      <FontData font={props.font} />
    </div>
  );
}
