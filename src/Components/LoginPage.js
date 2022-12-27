import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { auth } from '../Firebase'
import {signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Signed in 
          window.localStorage.setItem('user', userCredential.user.email);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError("error: " + errorCode + " " + errorMessage);
          return null;
        });
        setLoading(false);
        history('/');
    }
    return(
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/SignupPage">Sign up!</Link>
            </div>
        </div>
    );
}