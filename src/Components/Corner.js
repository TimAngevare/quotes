import {ReactComponent as CornerImg} from '../img/corner.svg';


export default function Corner(props) {

  const style = {
    // transform: "rotate(" + props.rotation + "deg)",
    width: "100%",
    height: "auto",
  };

  return (
      <div style={{transform: "rotate(" + props.rotation + "deg)"}}>
          <CornerImg style={style}/>
      </div>
  );

}