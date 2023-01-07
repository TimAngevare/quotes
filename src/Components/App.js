import { useSearchParams } from "react-router-dom";
import QuoteContainer from './QuoteContainer';
import Corner from './Corner';
import Topnav from './Topnav';
import { Col, Container, Row, Button, Alert } from 'react-bootstrap';
import UseScreenOrientation from './UseScreenOrientation';
import { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import NewQuote from './NewQuote';
import EditQuotes from "./EditQuotes";

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
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [barz, setBarz] = useState([{id : undefined, data : {"quote" : "You have not added any quotes yet.", "author" : "Tim"}}]);
  const [ranInt, setRanInt] = useState(0);
  const [error, setError] = useState("");

  const [dataBase, setDataBase] = useState(() => {
    if (searchParams.get("user") != null && searchParams.get("user") != "barz") {
      dataChoice.getUser[0] = searchParams.get("user");
      return dataChoice.getUser;
    } else if (searchParams.get("user") != null) {
      return dataChoice.barz;
    } else {
      return dataChoice.user;
    }
  });

  const handleDataBase = e => setDataBase(dataChoice[e.target.value]);

  const handleShowEdit = (e) => {
    setShowEdit(!showEdit);
  }

  const handleShowAdd = (e) => {
    setShowAdd(!showAdd);
  }

  const genRanInt = (length) => {
    if (typeof length === 'object') {
        length = barz.length;
    }
    const newInt = Math.floor(Math.random() * length);
    setRanInt(newInt);
  };

  useEffect(() => {
    setError("");
    onSnapshot(collection(db, dataBase[0]), (snapshot) =>  {
      const res = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      if (res != undefined && res.length != 0) {
        genRanInt(res.length);
        setBarz(res);
      } else if (res.length == 0) {
        setBarz([{id : undefined, data : {"quote" : "You have not added any quotes yet.", "author" : "Tim"}}])
      }
        // } else {
      //   setError("database not found");
      // }
    });    
  },[dataBase]);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div style={styles.cardStyle} id='wrapper'>
        { showEdit && <EditQuotes database={barz} showEdit={handleShowEdit} showAdd={handleShowAdd}/>}
      </div>
      <div style={styles.cardStyle} id='wrapper'>
        { showAdd && <NewQuote shown={handleShowAdd}/>}
      </div>
      <Container fluid>
        <UseScreenOrientation/>
        <Row>
          <Col xs={2} lg={3} style={{padding : 0}}>
            <Corner rotation="0" />
          </Col>
          <Col>
            {searchParams.get("user") === null &&
              <Topnav setDataBase={handleDataBase} showEdit={handleShowEdit}/>
            }
          </Col>
          <Col xs={2} lg={3} style={{padding : 0}}>
            <Corner rotation="90" className="pull-right"/>
          </Col>
        </Row>

        <Row className=''>
          <QuoteContainer dataBase={dataBase} quote={barz[ranInt].data} />
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
