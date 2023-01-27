import {Button, Form, Modal} from "react-bootstrap";
import {useRef} from "react";

export default function CsvReadWrite(props) {
    const fs = require("fs");
    const {parse} = require("csv-parse");
    const fileRef = useRef();
    const delimiterRef = useRef();
    const rowRef = useRef();

    const readCsv = () => {
        fs.createReadStream("./migration_data.csv")
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row) {
                console.log(row);
            }).on("end", function () {
            console.log("finished");
        })
            .on("error", function (error) {
                console.log(error.message);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        readCsv();
    }

    return (
        <div className="modal show"
             style={{display: 'block', position: 'initial'}}
        >
            <Modal>
                <Modal.Header closeButton>
                    <Modal.Title>Import data from CSV</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>File</Form.Label>
                            <Form.Control ref={fileRef} type="file"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Delimiter</Form.Label>
                            <Form.Control as="text" ref={delimiterRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Contains headers" ref={rowRef}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}