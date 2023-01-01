import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { db } from '../Firebase';
import { collection, addDoc } from "firebase/firestore"; 

export default function NewQuote (props) {
    const styles = {
        paddingTop : 10,
        paddingBottom : 10
    }
    const textRef = useRef();
    const authorRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleClose = (e) => {
        props.shown();
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        const user = window.localStorage.getItem('user');
        setLoading(true);
        const docRef = await addDoc(collection(db, user), {
            quote: textRef.current.value,
            author: authorRef.current.value
          });
        setLoading(false);
        console.log("Document written with ID: ", docRef);
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header>Add quote</Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={ handleSubmit} >
                        <Form.Group id="text">
                            <Form.Label>Quote</Form.Label>
                            <Form.Control type="text" ref={textRef} required/>
                        </Form.Group>
                        <Form.Group id="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" ref={authorRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Button style={styles} disabled={loading} className="w-100" type="submit">Save</Button>
                            <Button style={styles} disabled={loading} className="w-100" variant="secondary" onClick={handleClose}>Close</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}