import React, {useRef, useState} from "react";
import {Alert, Button, Card, Form, Modal} from 'react-bootstrap';
import {auth} from '../Firebase'
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import Wave from "./Wave";
import logo from '../img/Quotes.png';


export default function LoginPage() {
    const styles = {}
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const [showForgot, setShowForgot] = useState(false);
    const [alertType, setAlertType] = useState("danger");

    const handleClose = () => {
        setShowForgot(false);
    }

    const handleOpen = () => {
        setShowForgot(true);
    }

    function handleForgotSubmit(e) {
        e.preventDefault();
        const auth = getAuth();
        handleClose();
        sendPasswordResetEmail(auth, emailRef.current.value)
            .then(() => {
                setAlertType("success");
                // Password reset email sent!
                // ..
                setError("Email sent!")
            })
            .catch((error) => {
                setAlertType("danger");
                const errorCode = error.code;
                const errorMessage = error.message;
                setError("error: " + errorCode + " " + errorMessage);
                // ..
            });

    }

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // Signed in
                window.localStorage.setItem('user', userCredential.user.email.split("@")[0]);
                // ...
        })
        .then(() => {
            setLoading(false);
            history('/');
        })
        .catch((error) => {
            setAlertType("danger");
          const errorCode = error.code;
          const errorMessage = error.message;
            setError("error: " + errorCode + " " + errorMessage);
            setLoading(false);
          return null;
        });
    }
    return(
        <div>
            <Modal show={showForgot} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleForgotSubmit}>
                    <Modal.Body>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Card>
                <Card.Body>
                    <div>
                        <img src={logo} style={{
                            width: "10%",
                            height: "auto",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            paddingBottom: 20
                        }}/>
                    </div>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant={alertType}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signupPage">Sign up!</Link>
            </div>
            <div className="w-100 text-center mt-2">
                <Button onClick={handleOpen}>Forgot password?</Button>
            </div>
            <Wave/>
        </div>
    );
}