import classes from '../../../styles/FontDashboard.module.css';
// Components
import Letter from './Letter';

export default function Charset(props) {
  return (
    <div className={classes['charset-grid']}>
      {Object.values(props.chars).map((letter, i) => (
        <Letter
          key={`char-${i}`}
          cssname={props.cssname}
          weight={props.weight}
          handlePrice={props.handlePrice}
          checkedClass={letter.clss}
          handleLetterClick={props.handleLetterClick}
          i={i}
        >
          {letter.char}
        </Letter>
      ))}
    </div>
  );
}
