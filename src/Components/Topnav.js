import React, {useState} from 'react';
import {Alert, Button, Nav, Navbar, Offcanvas, Row} from 'react-bootstrap';
import '../navbar.css';
import {signOut} from "firebase/auth";
import {auth} from '../Firebase'
import {useNavigate} from 'react-router-dom';
import ScreenShot from "./ScreenShot";


function OffCanvasExample({name, shown, showEdit, handleScreenShot, user, ...props}) {
    const history = useNavigate();

    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function share() {
        setShowAlert(true);
        await navigator.clipboard.writeText(document.location.href + "/#/public?user=" + user.displayName);
        await sleep(2000);
        setShowAlert(false);
    }

    const handleShowEdit = () => {
    showEdit();
    handleClose();
  }

    const handleSignOut = () => {
        handleClose();
        signOut(auth).then(() => {
            history('/LoginPage')
        }).catch((error) => {
            alert(error);
        });
    }



  return (
    <>
      <Row>
          {/* <Button variant="primary" onClick={handleShow} className="mx-auto mt-2" style={{width: '10%'}}>
            {name}
          </Button> */}
          <svg onClick={handleShow} className="mx-auto mt-2"
  width="44"
  height="44"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path className='arrow'
    d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z"
    fill="currentColor"
  />
  </svg>
      </Row>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Alert show={showAlert} key="primary" variant="primary">
          Share link copied to clipboard!
        </Alert>
        <Offcanvas.Header closeButton>
          <Button variant="outline-danger" onClick={handleSignOut}>Sign out</Button>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex justify-content-center'>
          <Navbar variant="light" style={{width: "100%"}}>
            <Navbar.Brand className='d-flex justify-content-center' onClick={handleSignOut}>
              <h2>Quotes</h2>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Nav className="me-auto">
              <Nav.Link onClick={handleShowEdit}><h4>Edit Quotes</h4></Nav.Link>
              <Nav.Link onClick={share}><h4>Share!</h4></Nav.Link>
              {/*<Nav.Link onClick={changeBarz}><h4>Barz</h4></Nav.Link>*/}
              <ScreenShot handleScreenShot={handleScreenShot}/>
            </Nav>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Topnav(props) {
  return (
    <>
      {['top'].map((placement, idx) => (
          <OffCanvasExample handleScreenShot={props.handleScreenShot} user={props.user} showEdit={props.showEdit}
                            key={idx}
                            placement={placement} name={placement}/>
      ))}
    </>
  );
}