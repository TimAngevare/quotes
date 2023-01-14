import React, { useState } from 'react';
import { Button, Alert, ButtonGroup, Row } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../navbar.css';
import {signOut } from "firebase/auth";
import { auth } from '../Firebase'
import {useNavigate} from 'react-router-dom';


function OffCanvasExample({ name, shown, showEdit, ...props }) {
  const history = useNavigate();

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async function share(){
    setShowAlert(true);
    navigator.clipboard.writeText(document.location.href + "public?user=" + window.localStorage.getItem("user"));
    await sleep(2000);
    setShowAlert(false);
  };

  const handleShowEdit = () => {
    showEdit();
    handleClose();
  }

  const handleSignOut = (e) => {
    handleClose();
    signOut(auth).then(() => {
      history('/LoginPage')
    }).catch((error) => {
      alert(error);
    });
  }
  
  const changeBarz = (e) => {
    handleClose();
    history('/public?user=barz');
    window.location.reload();
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
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex justify-content-center'>
          <Row>
            <ButtonGroup style={{width : "100%", height : "60%"}}>
              <Button onClick={handleSignOut}>Sign Out</Button>
              <Button onClick={handleShowEdit}>Edit Quotes</Button>
              <Button onClick={share}>Share!</Button>
              <Button onClick={changeBarz}>Barz</Button>
            </ButtonGroup>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Topnav(props) {
  return (
    <>
      {['top'].map((placement, idx) => (
        <OffCanvasExample showEdit={props.showEdit} key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}