import {Button, Form, Modal} from "react-bootstrap";
import {useRef, useState} from "react";
import Papa from 'papaparse';
import {addDoc, collection} from "firebase/firestore";
import {db} from "../Firebase";

export default function CsvReadWrite(props) {

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const delimiterRef = useRef();
    const rowRef = useRef();

    const writeDataToDatabase = async (start, quoteIndex, authorIndex, data) => {
        for (let i = start; i++; i < data.length) {
            const docRef = await addDoc(collection(db, user), {
                quote: data[i][quoteIndex],
                author: data[i][authorIndex]
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError("error: " + errorCode + " " + errorMessage);
                setLoading(false)
                return null;
            });
        }
    }
    const readCsv = () => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const csvData = reader.result;
            Papa.parse(csvData, {
                complete: (results) => {
                    console.log(results.data);
                    writeDataToDatabase(results.data);
                }
            });
        };
        reader.onerror = (error) => {
            setError(error.toString());
            setLoading(false);
        };
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        readCsv(e);
        setLoading(false)
        props.handleImportCSV();
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.handleImportCSV();
    }

    return (
        <div className="modal show">
            <Modal show={props.showImportCSV} onHide={props.handleImportCSV}>
                <Modal.Header closeButton>
                    <Modal.Title>Import data from CSV</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CSV file</Form.Label>
                            <Form.Control onChange={handleFileChange} type="file" accept=".csv"
                                          placeholder="Upload a .csv file"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Delimiter</Form.Label>
                            <Form.Control maxLength={1} pattern={"[!@#$%^&*(),.?\":{}|<>]"} type="text" size={"sm"}
                                          ref={delimiterRef}
                                          placeholder="Enter special characters"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Contains headers" ref={rowRef}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}