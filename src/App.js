import QuoteContainer from './QuoteContainer';
import { useState } from 'react';
import Corner from './Corner';
import Topnav from './Topnav';

function App() {
  let dataChoice = {
    barz : ["barz", "song", "bar", "artist"],
    klem : ["klem", "naam", "quote"],
    sp : ["sp", "naam", "quote"]
  };

  const [dataBase, setDataBase] = useState(dataChoice.barz);

  const quoteStyle = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)"
  };

  const handleDataBase = (e) => {
    setDataBase(dataChoice[e.target.value]);

  };

  return (
    <div>
      <Topnav setDataBase={handleDataBase}/>
      
      <div style={{position : "fixed", left : 0, top: 0}}>
        <Corner rotation="0"/>
      </div>

      <div style={{position : "fixed", right : "0%", top: 0}}>
        <Corner rotation="90"/>
      </div>
      
      <div style={quoteStyle}>
        <QuoteContainer dataBase={dataBase}/>
      </div>
      
      <div style={{position : "fixed", left : 0, bottom: 0}}>
        <Corner rotation="270" />
      </div>

      <div style={{position : "fixed", right : 10, bottom: 0}}>
        <Corner rotation="180" />
      </div>
    </div>
  );
}

export default App;
