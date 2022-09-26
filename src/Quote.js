export default function Quote ( props ) {
    const styles = { "barStyle" : {
        fontFamily: "'Brush Script MT', cursive",
        color: "rgb(97,127,177)",
        fontSize: 45
    },
    "song" : {
        fontFamily: "'Brush Script MT', cursive",
        color: "rgb(97,127,177)",
        fontSize: 25
    },
    "artist" : {
        fontFamily: "'Brush Script MT', cursive",
        color: "rgb(97,127,177)",
        fontSize: 35,
        fontWeight: '900'
    }};
  
    return (
        <div>
            <h1 style={styles.barStyle}>{props.quote[props.dataBase[2]]}</h1>
            <h3 style={styles.song}>- <em style={styles.artist}>{props.quote[props.dataBase[1]]}</em>{props.dataBase.length > 3 && <em>: {props.quote[props.dataBase[3]]}</em>}</h3>
        </div>
    );
  }