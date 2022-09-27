import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';



export default function UseScreenOrientation () {
  let portrait = window.matchMedia("(orientation: portrait)");
  const [orientation, setOrientation] =
    useState()

  const updateOrientation = event => {
    if (!event.matches){
      setOrientation();
    } else {
      setOrientation("portrait")
    }
  }

  useEffect(() => {
    if (portrait.matches){
      setOrientation("portrait")
    }
    portrait.addEventListener("change", updateOrientation);
    
    return () => {
      portrait.removeEventListener(
        'change',
        updateOrientation
      );
    }
  }, [])

  return(
    <Modal show={orientation == "portrait"}>
      <Modal.Header>
        <Modal.Title>Tilt your phone</Modal.Title>
      </Modal.Header>
      <Modal.Body>This site is made to be viewed in landscape</Modal.Body>
    </Modal>
  );
}