import { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { Modal, Button, Row, Col, Form, CloseButton, Alert } from "react-bootstrap";

export default function EditQuotes(props) {
    const [barz, setBarz] = useState(props.database);
    const [prevbarz, setPrevBarz] = useState(props.database);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const styles = {text : {fontFamily: "'Brush Script MT', cursive",
    color: "rgb(97,127,177)",
    fontSize: 25, textAlign : "center"}, spacing : {margin: "10px 0"}}

    useEffect(() => {
        setBarz(props.database);
    },[props.database]);

    async function handleSave(e) {
        setError("");
        setLoading(true);
        for (let i = 0; i < barz.length; i++) {
            const bar = barz[i];
            if (bar.data['quote'].length == 0 || bar.data['author'].length == 0) {
                setError("Cannot have an empty quote");
                setLoading(false);
                return null;
            } else if (bar.data['quote'] != prevbarz[i].data['quote'] || bar.data['author'] != prevbarz[i].data['author']) {
                await setDoc(doc(db, window.localStorage.getItem('user'), bar.id), {
                    quote: bar.data['quote'],
                    author: bar.data['author']
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError("error: " + errorCode + " " + errorMessage);
                    return null;
                }); 
            }
        }
        setLoading(false);
        props.showEdit();
    }

    const handleClose = (e) => {
        props.showEdit();
    }

    const handleClick = () => {
        props.showAdd()
    }

    const handleChange = (e, index, type) => {
        setError("");
        setPrevBarz([barz]);
        const newBarz = [...barz];
        newBarz[index].data[type] = e.target.value;
        setBarz(newBarz);
        
    }

    async function deleteQuote (id) {
        setError("");
        setLoading(true);
        await deleteDoc(doc(db, window.localStorage.getItem('user'), id))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError("error: " + errorCode + " " + errorMessage);
            return null;
        });
        const newBarz = barz.filter(bar => bar.id !== id);
        setBarz(newBarz);
        setLoading(false);
    }

    return (
        <div className="modal show" style={{ display: 'inline', position: 'initial', maxHeight: "100px",
        overflowY: "auto"}}>
            <Modal.Dialog keyboard style={{ display: 'inline', position: 'initial', maxHeight: "100px",
        overflowY: "auto"}}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header>
                    <Col xs={9}>
                        <Modal.Title>Edit quotes</Modal.Title>
                    </Col>
                    <Col xs={3}>
                        <Button variant="success" onClick={handleClick}>New</Button>
                    </Col>
                </Modal.Header>

                <Modal.Body>
                    <Row my={2}>
                        <Col xs={5}>
                            <p style={styles.text}>Quotes</p>
                        </Col>
                        <Col xs={5}>
                            <p style={styles.text}>Author</p>
                        </Col>
                    </Row>
                    {barz.map(bar => (
                        <div>
                            <h2></h2>
                            { bar.id != undefined &&
                            <Row key={bar.id} my={3}>
                                <Col xs={5}>
                                    <Form.Control
                                        as="textarea"
                                        style={styles.spacing} 
                                        rows={3}
                                        key={String(bar.id) + ":quote"}
                                        value={bar.data["quote"]}
                                        onChange={(e) => handleChange(e, barz.indexOf(bar), "quote")}
                                    />
                                </Col>
                                <Col xs={5}>
                                    <Form.Control
                                        style={styles.spacing} 
                                        key={String(bar.id) + ":author"}
                                        value={bar.data["author"]}
                                        onChange={(e) => handleChange(e, barz.indexOf(bar), "author")}
                                    />
                                </Col>
                                <Col xs={2} style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                                    <CloseButton onClick={() => deleteQuote(bar.id)}/>
                                </Col>
                            </Row>}
                        </div>
                    ))}
                </Modal.Body>

                <Modal.Footer>
                    <Button disabled={loading} type="submit" onClick={handleSave}>Save</Button>
                    <Button disabled={loading} variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}