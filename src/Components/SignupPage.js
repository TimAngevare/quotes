import React, {useRef, useState} from "react";
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {auth, db} from '../Firebase'
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import logo from '../img/Quotes.png';
import {doc, getDoc, setDoc} from 'firebase/firestore';

export default function SignupPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const passwordConfirmationRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const username = usernameRef.current.value;
        const docRef = doc(db, "usernames", username);
        const docSnap = await getDoc(docRef);

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("Passwords do not match");
        } else if (username.includes(" ")) {
            return setError("Username cannot contain space");
        } else if (docSnap.exists()) {
            console.log(docSnap);
            return setError("Username is taken");
        }


        setError("");
        setLoading(true);
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(() => {
            // Signed in
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    updateProfile(auth.currentUser, {
                        displayName: username
                    }).then(async () => {
                        await setDoc(doc(db, "usernames", username), {
                            username: username
                        });
                        await auth.currentUser.getIdToken(true);
                        await auth.currentUser.reload();
                        history('/');
                    }).catch((error) => {
                        // An error occurred
                        return setError("error: " + error.code + " " + error.message);
                    });
                });
            // ...
        }).catch((error) => {
            setError("error: " + error.code + " " + error.message);
            console.log(error.code);
            console.log(error.message);
            // ..
        });
        setLoading(false);
    }
    return(
        <div>
            <Card>
                <Card.Body>
                    <div>
                        <img alt={"logo"} src={logo} style={{
                            width: "10%",
                            height: "auto",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            paddingBottom: 20
                        }}/>
                    </div>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={usernameRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-3">
                            <Form.Label>Password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmationRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 " type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/LoginPage">Log In</Link>
            </div>
        </div>
    );
}