import React, {useRef, useState} from "react";
import {Alert, Button, Form, Modal} from 'react-bootstrap'
import {db} from '../Firebase';
import {addDoc, collection} from "firebase/firestore";

export default function NewQuote(props) {
    const styles = {
        padding: '10px',
        marginBottom: '10px'
    }

    const textRef = useRef();
    const authorRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleClose = () => {
        props.handleShown();
        props.handleShowEdit();
    }

    async function handleSubmit(e) {
        setError("");
        e.preventDefault();
        setLoading(true);
        await addDoc(collection(db, props.user.displayName), {
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
            <Modal size="lg" show={props.shown} onHide={props.handleShown} keyboard>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header closeButton>
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
            </Modal>
    )
}