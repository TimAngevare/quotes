import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';

const getOrientation = () =>
  window.screen.orientation.type

export default function UseScreenOrientation () {
  const [orientation, setOrientation] =
    useState(getOrientation())

  const updateOrientation = event => {
    setOrientation(getOrientation())
  }

  useEffect(() => {
    console.log("im being run!")
    window.addEventListener(
      'orientationchange',
      updateOrientation
    )
    return () => {
      window.removeEventListener(
        'orientationchange',
        updateOrientation
      )
    }
  }, [])

  return(
    <Modal show={orientation == "portrait-secondary" || orientation == "portrait-primary"}>
      <Modal.Header>
        <Modal.Title>Tilt your phone</Modal.Title>
      </Modal.Header>
      <Modal.Body>This site is made to be viewed in landscape</Modal.Body>
    </Modal>
  );
}