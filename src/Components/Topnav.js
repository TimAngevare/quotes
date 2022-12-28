import React, { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import '../navbar.css';
import {signOut } from "firebase/auth";
import { auth } from '../Firebase'
import {useNavigate } from 'react-router-dom';


function OffCanvasExample({ name, shown, ...props }) {
  const history = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = (e) => {
    handleClose();
    signOut(auth).then(() => {
      history('/LoginPage')
    }).catch((error) => {
      alert(error);
    });
  }
  const handleClick = (e) => {
    handleClose();
    props.function(e);
  };

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
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex justify-content-center'>
          <Row>
            <ButtonGroup style={{width : "100%"}}>
              <Button onClick={handleSignOut}>Sign Out</Button>
              <Button onClick={shown}>Add Quote</Button>
              {/* <Button size="lg" variant="dark" value="barz" onClick={handleClick}>Hip Hop</Button>
              <Button size="lg" type="button" value="klem" onClick={handleClick} variant="dark">K1em</Button>
              <Button size="lg" type="button" value="sp" onClick={handleClick} variant="dark">SP</Button> */}
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
        <OffCanvasExample shown={props.shown} key={idx} placement={placement} name={placement} function={props.setDataBase} />
      ))}
    </>
  );
}