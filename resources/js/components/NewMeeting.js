import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import {Button, Col} from "react-bootstrap";

class NewMeeting extends Component {
    render() {
        return(
            <Form className="initial-content">
                {/*Meeting Name*/}
                <Form.Group as={Form.Row} controlId="formTopic">
                    <Form.Label column sm={2}>Topic</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="string"></Form.Control>
                    </Col>
                </Form.Group>

                {/*Date and Time*/}
                <Form.Group as={Form.Row} controlId="formDateandTime">
                    <Form.Label column sm={2}>Date/Time</Form.Label>
                </Form.Group>

                {/*Duration*/}
                <Form.Group as={Form.Row} controlId="formDuration">
                    <Form.Label column sm={2}>Duration</Form.Label>
                    <Col sm={2}>
                        <Form.Control as="select">
                            <option>1 Hour</option>
                            <option>2 Hours</option>
                            <option>3 Hours</option>
                            <option>4 Hours</option>
                            <option>5 Hours</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Button variant="outline-primary" style={{width: '20%', marginTop: '5%'}}>Schedule</Button>
            </Form>
        );
    }
}

export default NewMeeting;
