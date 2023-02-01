import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useRef, useState} from "react";
import Papa from 'papaparse';
import {addDoc, collection} from "firebase/firestore";
import {db} from "../Firebase";

export default function CsvReadWrite(props) {

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [columnNum, setColumnNum] = useState(0);

    const delimiterRef = useRef();
    const rowRef = useRef();

    const writeDataToDatabase = async (start, quoteIndex, authorIndex, data) => {
        for (let i = start; i < data.length; i++) {
            await addDoc(collection(db, props.user.displayName), {
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
                complete: async (results) => {
                    const start = (rowRef) ? 1 : 0;
                    const quoteColumn = columnNum - 1;
                    const authorColumn = (columnNum - 1 === 0) ? 1 : 0;
                    await writeDataToDatabase(start, quoteColumn, authorColumn, results.data);
                    console.log("done");
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

    const handleColumnChange = (e) => {
        setColumnNum(e.target.value);
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        readCsv(e);
        setLoading(false)
        props.handleImportCSV();
    }


    return (
        <div className="modal show">
            <Modal show={props.showImportCSV} onHide={props.handleImportCSV}>
                {error &&
                    <Alert variant={"danger"}>{error}</Alert>
                }
                <Modal.Header closeButton>
                    <Modal.Title>Import data from CSV</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>CSV file</Form.Label>
                            <Form.Control onChange={handleFileChange} type="file" accept=".csv"
                                          placeholder="Upload a .csv file"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Delimiter</Form.Label>
                            <Form.Control maxLength={1} pattern={"[!@#$%^&*(),.?\":{}|<>]"} type="text" size={"sm"}
                                          ref={delimiterRef}
                                          placeholder="Enter special characters"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Column number author field</Form.Label>
                            <Form.Select onChange={handleColumnChange} aria-label="Column number quote field">
                                <option>Select value here</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label> </Form.Label>
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