import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Meetings from "./Meetings";
import NewMeeting from "./NewMeeting";
import Form from 'react-bootstrap/Form'
import {Alert, Button, Col, Image, Row} from "react-bootstrap";
import logo from '../../../public/images/BTR-11.png';
import PastMeeting from "./PastMeeting";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: {},
            pastMeetings: {},
            passcode: "",
            requester: "",
            login: false,
            userInput: '',
            errorName: false,
            errorPass: false,
            role: '',
            success: null
        }
    }

    // fetch api
    componentDidMount() {
        let data = sessionStorage.getItem('userData');
        data = JSON.parse(data);
        if (!(data == null)) {
            this.setState({
                login: data.login,
                requester: data.requester,
                role: data.role
            })
        }

        fetch('/api/meeting')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    meetings: response
                })
            })
            .catch(function (err) {
                return err;
            })

        fetch('/api/pastMeeting')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pastMeetings: response
                })
            })
            .catch(function (err) {
                return err;
            })
    }




    render() {
        const handleChangeName = e => {
            this.setState({
                requester: e.target.value,
                errorName: (e.target.value == "")
            })
        }

        const handleChangePass = e => {
            this.setState({
                passcode: e.target.value,
                errorPass: (e.target.value == "")
            })
        }

        const handleSubmit = e => {
            e.preventDefault();
            fetch('/api/login', {
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
                        sessionStorage.setItem('userData', JSON.stringify(resp));
                        if (!resp.success) {
                            localStorage.setItem('success', 'false');
                        } else {
                            localStorage.clear();
                        }
                        window.location.reload(false);
                    })
                })
                .catch()
        }

        const handleLogOut = () => {
            sessionStorage.clear();
            window.location.reload();
        }


        return (
            <Container className="App mt-5">
                {!this.state.login ? (
                    <div>
                        <div className="d-flex flex-row" style={{paddingBottom: '3%'}}>
                            <Image className="logo p-2" src={logo} rounded></Image>
                            <h1 className="align-self-center p-2">Zoom Meeting Dashboard</h1>
                        </div>
                        <Form style={{paddingBottom: '4%'}}>
                            <Form.Group as={Form.Row} controlId="validationCustom03">
                                <Form.Label column sm={1}>Name</Form.Label>
                                <Col sm={5}>
                                <Form.Control
                                    required
                                    type="text"
                                    className="mx-sm-3"
                                    onChange={handleChangeName}
                                    isInvalid={this.state.errorName}
                                    placeholder="Enter your full name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your first and last name
                                </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Form.Row}>
                                <Form.Label column sm={1}>Password</Form.Label>
                                <Col sm={5}>
                                <Form.Control
                                    required
                                    type="password"
                                    className="mx-sm-3"
                                    onChange={handleChangePass}
                                    isInvalid={this.state.errorPass}
                                    placeholder="********"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your password
                                </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Button variant="outline-primary" style={{width: '50%', marginTop: '5%'}}
                                    onClick={((this.state.requester == "") || (this.state.passcode == "")) ? null : handleSubmit} type="submit">Login</Button>

                        </Form>

                        {localStorage.getItem('success') == 'false' ? (
                            <Alert variant="danger" onClose={() => {
                                this.setState({showError: false})
                                localStorage.setItem('success', 'true')
                            }} dismissible>
                                Wrong Password! Try again.
                            </Alert>
                        ) : ''}
                    </div>
                ) : (
                    <>
                        <Button variant="outline-primary" style={{float:'right'}} onClick={handleLogOut}>Log Out</Button>
                        <Tabs defaultActiveKey="meetings">
                            <Tab eventKey="meetings" title="Upcoming Meetings">
                                <Meetings meetings={this.state.meetings} role={this.state.role}/>
                            </Tab>
                            <Tab eventKey="new_meeting" title="New Meeting">
                                <NewMeeting/>
                            </Tab>
                            <Tab eventKey="past_meetings" title="Past Meetings">
                                <PastMeeting meetings={this.state.pastMeetings} role={this.state.role}/>
                            </Tab>
                        </Tabs>
                    </>
                )}
            </Container>
        );
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
