import { ReactComponent as CornerImg } from '../img/corner.svg';


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