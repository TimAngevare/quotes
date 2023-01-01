import { useSearchParams } from "react-router-dom";
import QuoteContainer from './QuoteContainer';
import Corner from './Corner';
import Topnav from './Topnav';
import { Col, Container, Row, Button } from 'react-bootstrap';
import UseScreenOrientation from './UseScreenOrientation';
import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import NewQuote from './NewQuote';

const styles ={ cardStyle : {
  position: "absolute",
  top: "20%",
  right: "30%",
  width: "40%"
}};

const dataChoice = {
  barz : ["barz", "song", "bar", "artist"],
  user : [window.localStorage.getItem('user'), "author", "quote"],
  getUser : [null, "author", "quote"]
};


const App = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [shown, setShown] = useState(false);
  const [barz, setbarz] = useState([{"quote" : "You have not added any quotes yet.", "author" : "Tim"}]);
  const [ranInt, setRanInt] = useState(0);

  const [dataBase, setDataBase] = useState(() => {
    if (searchParams.get("user") != null && searchParams.get("user") != "barz") {
      return dataChoice.getUser[0] = searchParams.get("user");
    } else if (searchParams.get("user") != null) {
      return dataChoice.barz;
    } else {
      return dataChoice.user;
    }
  });

  const handleDataBase = e => setDataBase(dataChoice[e.target.value]);

  const handleShown = (e) => {
    setShown(!shown);
  }

  const genRanInt = (length) => {
    if (typeof length === 'object') {
        length = barz.length;
        console.log(length);
    }
    const newInt = Math.floor(Math.random() * length);
    setRanInt(newInt);
  };

  useEffect(() => {
    onSnapshot(collection(db, dataBase[0]), (snapshot) =>  {
      const res = snapshot.docs.map((doc) => doc.data());
      if (res != undefined && res.length != 0) {
        genRanInt(res.length);
        setbarz(res);
      }
    });    
  },[dataBase]);

  return (
    <div>
      <div style={styles.cardStyle} id='wrapper'>
        { shown && <NewQuote shown={handleShown}/>}
      </div>
      <Container fluid>
        <UseScreenOrientation/>
        <Row>
          <Col xs={2} lg={3} style={{padding : 0}}>
            <Corner rotation="0" />
          </Col>
          <Col>
            {searchParams.get("user") === null &&
              <Topnav setDataBase={handleDataBase} shown={handleShown}/>
            }
          </Col>
          <Col xs={2} lg={3} style={{padding : 0}}>
            <Corner rotation="90" className="pull-right"/>
          </Col>
        </Row>

        <Row className=''>
          <QuoteContainer dataBase={dataBase} quote={(() => {
            if (barz.length > 1) {
              return(barz[ranInt]);
            } else {
              return(barz[0]);
            }
          })} />
          <QuoteContainer dataBase={dataBase} quote={barz[ranInt]} />
        </Row>

        <Row>
          <Col xs={2} lg={3} style={{padding : 0}} className="fixed-bottom">
            <Corner rotation="270"/>
          </Col>
          <Col className='text-center'>
            <Button onClick={genRanInt}>Refresh</Button>
          </Col>
          <Col xs={2} lg={3} style={{padding : 0, right: 0, position: "fixed", bottom : 0}} className="">
            <Corner rotation="180"/>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
