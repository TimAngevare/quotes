import {useEffect, useState} from "react";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from '../Firebase';
import {Alert, Button, CloseButton, Col, Form, Modal, Row} from "react-bootstrap";

export default function EditQuotes(props) {
    const [barz, setBarz] = useState(props.database);
    const prevbarz = [...props.database];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const styles = {
        text: {
            fontFamily: "'Brush Script MT', cursive",
            color: "rgb(97,127,177)",
            fontSize: 25, textAlign: "center"
        }, spacing: {margin: "10px 0"}
    }

    useEffect(() => {
        setBarz(JSON.parse(JSON.stringify(props.database)));
    }, [props.database]);

    async function handleSave(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        for (let i = 0; i < barz.length; i++) {
            const bar = barz[i];
            if (bar.data['quote'].length === 0 || bar.data['author'].length === 0) {
                setError("Cannot have an empty quote");
                setLoading(false);
                return null;
            } else if (bar.data['quote'] !== prevbarz[i].data['quote'] || bar.data['author'] !== prevbarz[i].data['author']) {
                console.log("working");
                await setDoc(doc(db, props.user.displayName, bar.id), {
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
        props.handleShowEdit();
    }

    const handleClose = () => {
        props.handleShowEdit();
    }

    const handleClick = () => {
        props.showAdd();
        props.handleShowEdit();
    }

    const handleCSVClick = () => {
        props.handleImportCSV();
        props.handleShowEdit();
    }

    const handleChange = (e, index, type) => {
        setError("");
        // setPrevBarz([barz]);
        const newBarz = [...barz];
        newBarz[index].data[type] = e.target.value;
        setBarz(newBarz);

    }

    async function deleteQuote (id) {
        setError("");
        setLoading(true);
        await deleteDoc(doc(db, props.user.displayName, id))
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
        // <div className="modal show" style={{ display: 'inline', position: 'initial', maxHeight: "100px",
        // overflowY: "auto"}}>
            <Modal size="lg" show={props.showEdit} onHide={props.handleShowEdit} keyboard>
                {error && <Alert variant="danger">{error}</Alert>}
                <Modal.Header>
                    <Col xs={6} sm={7} lg={9}>
                        <Modal.Title>Edit quotes</Modal.Title>
                    </Col>
                    <Col xs={4} sm={3} lg={2}>
                        <Button variant="success" responsive="sm" onClick={handleCSVClick}>Import CSV</Button>
                    </Col>
                    <Col>
                        <Button variant="success" responsive="sm" onClick={handleClick}>New</Button>
                    </Col>
                </Modal.Header>

                <Modal.Body>
                    <Row my={2}>
                        <Col xs={6}>
                            <p style={styles.text}>Quotes</p>
                        </Col>
                        <Col xs={4}>
                            <p style={styles.text}>Author</p>
                        </Col>
                    </Row>
                    {barz.map(bar => (
                        <div key={bar.id}>
                            <h2></h2>
                            {bar.id !== undefined &&
                                <Row key={bar.id} my={3}>
                                    <Col xs={6}>
                                        <Form.Control
                                            as="textarea"
                                            style={styles.spacing}
                                            rows={3}
                                            key={String(bar.id) + ":quote"}
                                            value={bar.data["quote"]}
                                            onChange={(e) => handleChange(e, barz.indexOf(bar), "quote")}
                                        />
                                </Col>
                                <Col xs={4}>
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
            </Modal>
        // </div>
    );
}