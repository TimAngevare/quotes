import React, { useRef, useState } from "react";
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import { db } from '../Firebase';
import { collection, addDoc } from "firebase/firestore";

export default function NewQuote(props) {
    const styles = {
        padding: '10px',
        marginBottom: '10px'
    }

    const textRef = useRef();
    const authorRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleClose = (e) => {
        props.shown();
    }

    async function handleSubmit(e) {
        setError("");
        e.preventDefault();
        const user = window.localStorage.getItem('user');
        setLoading(true);
        const docRef = await addDoc(collection(db, user), {
            quote: textRef.current.value,
            author: authorRef.current.value
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("error: " + errorCode + " " + errorMessage);
            return null;
        });
        setLoading(false);
        handleClose();
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header>
                    <Modal.Title>Add quote</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit} >

                    <Modal.Body>
                        <Form.Group id="text">
                            <Form.Label>Quote</Form.Label>
                            <Form.Control type="text" ref={textRef} required />
                        </Form.Group>
                        <Form.Group id="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" ref={authorRef} required />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button style={styles} disabled={loading} type="submit">Save</Button>
                        <Button style={styles} disabled={loading} variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Dialog>
        </div>
    )
}