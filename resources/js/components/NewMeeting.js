import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Moment from 'moment';
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import DropdownList from 'react-widgets/lib/DropdownList'
import {Button, Col, Modal, Alert} from "react-bootstrap";
// Add the css styles...
import "react-widgets/dist/css/react-widgets.css";

Moment.locale("en");
momentLocalizer();

class NewMeeting extends Component {
    constructor() {
        super();
        this.state = {
            topic: '',
            dateTime: new Date().toISOString(),
            duration: 0,
            requester: '',
            showSubmit: false,
            showWarning: false,
            errorTopic: false,
        }
    }

    render() {
        const handleClose = () => {
            this.setState({
                showSubmit: false,
                requester: ''
            })
        }

        const handleOpen = () => {
            let data = sessionStorage.getItem('userData');
            let parseData = JSON.parse(data);
            this.setState({
                showSubmit: true,
                requester: ('Meeting created by ' + parseData.requester)
            })
        }

        const handleWarning = () => {
            this.setState({
                showWarning: true
            })
        }

        const handleChangeTopic = e => {
            this.setState({
                topic: e.target.value,
                errorTopic: (e.target.value == "")
            })
        }

        const handleSubmit = e => {
            e.preventDefault();
            fetch('/api/create', {
                method: 'POST',
                credentials: 'same-origin',
                body:JSON.stringify(
                    this.state
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(function(response) {
                response.json().then(function(resp){
                    console.log(resp)
                    window.location.reload(false)
                })
            })
                .catch()
        }

        return(
            <Form className="initial-content">
                {this.state.showWarning ? (
                    <Alert variant="danger" onClose={() => {this.setState({showWarning: false})}} dismissible>
                        You need to fill the empty fields in order to continue submission.
                    </Alert>
                ) : ''}

                {/*Meeting Name*/}
                <Form.Group as={Form.Row} controlId="formTopic">
                    <Form.Label column sm={2}>Topic</Form.Label>
                    <Col sm={10}>
                        <Form.Control required onChange={handleChangeTopic} placeholder="Ex. Boston Meeting" isInvalid={this.state.errorTopic}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter the topic
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/*Date and Time*/}
                <Form.Group as={Form.Row} controlId="formDateandTime">
                    <Form.Label column sm={2}>Date/Time</Form.Label>
                    <Col sm={10}>
                        <DateTimePicker defaultValue={new Date()} onChange={(date) => {
                            this.setState({
                                dateTime: date.toISOString()
                            })
                        }} min={new Date()}/>
                    </Col>
                </Form.Group>

                {/*Duration*/}
                <Form.Group as={Form.Row} controlId="formDuration">
                    <Form.Label column sm={2}>Duration (Hrs)</Form.Label>
                    <Col sm={2}>
                        <DropdownList data={[1,2,3,4,5]} onChange={(number) => {
                            this.setState({
                                duration: number,
                            })
                        }}/>
                    </Col>
                </Form.Group>

                <Button variant="outline-primary" onClick={(
                    (this.state.topic.trim() == "") || (this.state.duration <= 0)) ? handleWarning : handleOpen}
                        style={{width: '25%', marginTop: '5%'}} type="button">Schedule</Button>
                <Modal show={this.state.showSubmit} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You're about create a Zoom meeting. Are you sure?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit} type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}

export default NewMeeting;
