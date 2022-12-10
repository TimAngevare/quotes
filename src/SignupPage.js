import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { auth } from './Firebase'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value){
            return setError("Passwords do not match")
        }

        
        setError("");
        setLoading(true);
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
                // ...
            }).catch((error) => {
                setError("error: " + error.code + " " + error.message);
                console.log(error.code);
                console.log(error.message);
                    // ..
                });
        setLoading(false);
        history.push('/');
    }
    return(
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Signup here</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmationRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/LoginPage">Log In</Link>
            </div>
        </div>
    );
}