// Components
import Button from './Button';

export default function ConnectButton(props) {
  return (
    <Button className='w-64' onClick={props.onClick}>
      {props.buttonText}
    </Button>
  );
}
