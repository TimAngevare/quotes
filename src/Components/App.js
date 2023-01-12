import { redirect, useSearchParams } from "react-router-dom";
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
import { Link, useNavigate } from 'react-router-dom';

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
  const history = useNavigate();

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

  const redirectAccount = () => {
    history('/');
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
      {searchParams.get("user") != null &&
        <svg onClick={redirectAccount} width="60px" height="60px" style={{ position: "fixed", right : "48%", padding : "10px"}} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003">

          <g id="SVGRepo_bgCarrier" stroke-width="0"/>

          <g id="SVGRepo_iconCarrier"> <g id="style=doutone"> <g id="add-box"> <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M1.25 8C1.25 4.27208 4.27208 1.25 8 1.25H16C19.7279 1.25 22.75 4.27208 22.75 8V16C22.75 19.7279 19.7279 22.75 16 22.75H8C4.27208 22.75 1.25 19.7279 1.25 16V8ZM8 2.75C5.10051 2.75 2.75 5.10051 2.75 8V16C2.75 18.8995 5.10051 21.25 8 21.25H16C18.8995 21.25 21.25 18.8995 21.25 16V8C21.25 5.10051 18.8995 2.75 16 2.75H8Z" fill="#000000"/> <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M12 7.00744C12.4142 7.00744 12.75 7.34323 12.75 7.75744L12.75 16.2427C12.75 16.6569 12.4142 16.9927 12 16.9927C11.5857 16.9927 11.25 16.6569 11.25 16.2427L11.25 7.75743C11.25 7.34322 11.5858 7.00744 12 7.00744Z" fill="#BFBFBF"/> <path id="vector (Stroke)_3" fill-rule="evenodd" clip-rule="evenodd" d="M17 12C17 12.4142 16.6642 12.75 16.25 12.75L7.76476 12.75C7.35055 12.75 7.01476 12.4142 7.01476 12C7.01477 11.5857 7.35055 11.25 7.76477 11.25L16.25 11.25C16.6642 11.25 17 11.5858 17 12Z" fill="#BFBFBF"/> </g> </g> </g>

        </svg>
      }
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
