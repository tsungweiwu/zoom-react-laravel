import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button, Modal } from "react-bootstrap";

function getDate(start_time) {
    let date = new Date(start_time);
    let str = date.toDateString() + " | " + date.toLocaleTimeString();
    return str;
}

class PastMeetings extends Component {
    constructor() {
        super();
        this.state = {
            showDelete: false,
            id: ""
        };
    }
    render() {
        const handleOpen = id => {
            this.setState({
                id: id,
                showDelete: true
            });
        };

        const handleClose = () => {
            this.setState({
                id: "",
                showDelete: false
            });
        };

        const handleDelete = () => {
            fetch("/api/delete", {
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify(this.state),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(function(response) {
                    response.json().then(function(resp) {
                        console.log(resp);
                        window.location.reload(false);
                    });
                })
                .catch();
        };

        const meetings =
            this.props && this.props.meetings.length > 0 ? (
                this.props.meetings.map(
                    meeting =>
                        meeting.start_time && (
                            <div className="meeting-card">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {meeting.topic}
                                            {this.props.role == "admin" ? (
                                                <Button
                                                    onClick={() =>
                                                        handleOpen(meeting.id)
                                                    }
                                                    className="buttonDelete"
                                                    variant="danger"
                                                >
                                                    X
                                                </Button>
                                            ) : (
                                                ""
                                            )}
                                            <Modal
                                                show={this.state.showDelete}
                                                onHide={handleClose}
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>
                                                        Confirm Delete
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    You're about delete a Zoom
                                                    meeting. Are you sure?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={handleClose}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Card.Title>

                                        <Card.Subtitle className="mb-2 text-muted">
                                            {getDate(meeting.start_time)}
                                        </Card.Subtitle>

                                        <Card.Text>
                                            Duration: {meeting.duration / 60}{" "}
                                            Hours
                                        </Card.Text>
                                        <Card.Text>
                                            Description:{" "}
                                            <p>{meeting.requester}</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                )
            ) : (
                <div></div>
            );

        return <div>{meetings}</div>;
    }
}

export default PastMeetings;
