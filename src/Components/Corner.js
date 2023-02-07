import {ReactComponent as CornerImg} from '../img/corner.svg';


export default function Corner(props) {

  const style = {
      width: "95%",
      height: "auto",
      fillColor: "#000"
  };

  return (
      <div style={{transform: "rotate(" + props.rotation + "deg)"}}>
          <CornerImg style={style}/>
      </div>
  );

}