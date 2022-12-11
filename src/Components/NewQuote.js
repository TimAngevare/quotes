import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NewQuote () {
    
    async function handleSubmit(e){
        console.log('hi');
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header closeButton>Add quote</Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="text">
                            <Form.Label>Quote</Form.Label>
                            <Form.Control type="text" ref={textRef} required/>
                        </Form.Group>
                        <Form.Group id="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" ref={authorRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}