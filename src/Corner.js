import { ReactComponent as CornerImg } from './img/corner.svg';
import Col from 'react-bootstrap/Col';


export default function Corner(props) {

  const style = {
    transform: "rotate(" + props.rotation + "deg)",
    width: "90%",
    height: "auto",
  };

  return (
    <CornerImg style={style} />
  );

}