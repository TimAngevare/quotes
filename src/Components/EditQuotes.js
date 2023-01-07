import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function EditQuotes(props) {
    const [barz, setBarz] = useState(props.database);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);

    async function handleSave(e) {
        setLoading(true);
        for (let i = 0; i < barz.length; i++) {
            const bar = barz[i];
            await setDoc(doc(db, window.localStorage.getItem('user'), bar.id), {
                quote: bar.data['quote'],
                author: bar.data['author']
            });
        }
        setLoading(false);
    }

    const handleClose = (e) => {
        props.showEdit();
    }

    const handleChange = (e, index, type) => {
        const newBarz = [...barz];
        newBarz[index].data[type] = e.target.value;
        setBarz(newBarz);
    }

    return (
        <div className="modal show" style={{ display: 'inline', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Edit quotes</Modal.Title>
                    {/* <Button onClick={}>Add Quote</Button> */}
                </Modal.Header>

                <Modal.Body>
                    <Row my={2}>
                        <Col xs={6}>
                            Quotes
                        </Col>
                        <Col xs={6}>
                            Author
                        </Col>
                    </Row>
                    {barz.map(bar => (
                        <Row key={barz.indexOf(bar)} my={2}>
                            <Col xs={6}>
                                <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    key={String(barz.indexOf(bar)) + ":quote"}
                                    value={bar.data["quote"]}
                                    onChange={(e) => handleChange(e, barz.indexOf(bar), "quote")}
                                />
                            </Col>
                            <Col xs={6}>
                                <Form.Control
                                    key={String(barz.indexOf(bar)) + ":author"}
                                    value={bar.data["author"]}
                                    onChange={(e) => handleChange(e, barz.indexOf(bar), "author")}
                                />
                            </Col>
                        </Row>
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