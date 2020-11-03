import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Meetings from "./Meetings";
import NewMeeting from "./NewMeeting";
import Form from 'react-bootstrap/Form'
import {Alert, Button} from "react-bootstrap";
import Image from 'react-bootstrap/Image'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: {},
            passcode: "",
            login: false,
            userInput: '',
            showWarning: false,
            role: ''
        }
    }

    // fetch api
    componentDidMount() {
        fetch('/api/user')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    meetings: response
                })
            })
            .catch(function (err) {
                return err;
            })
    }




    render() {
        const handleSubmit = () => {
            console.log(this.state.userInput)
            if (this.state.userInput == "") {
                this.setState({
                    showWarning: true,
                    showError: false
                })
            }
            else if (this.state.userInput == "7818632617") {
                this.setState({
                    login: true,
                    role: 'user'
                })
            }
            else if (this.state.userInput == "steve1201") {
                this.setState({
                    login: true,
                    role: 'admin'
                })
            }
            else {
                this.setState({
                    showError: true,
                    showWarning: false
                })
            }
        }

        return (
            <Container className="App mt-5">
                {!this.state.login ? (
                    <div>
                        <h1 style={{paddingBottom: '4%'}}>Zoom Meeting Dashboard</h1>
                        {this.state.showWarning ? (
                            <Alert variant="warning" onClose={() => {this.setState({showWarning: false})}} dismissible>
                                You need to fill the empty fields in order to continue submission.
                            </Alert>
                        ) : ''}

                        {this.state.showError ? (
                            <Alert variant="danger" onClose={() => {this.setState({showError: false})}} dismissible>
                                Wrong Password! Try again.
                            </Alert>
                        ) : ''}
                        <Form inline style={{justifyContent: 'center', alignItems: 'center', display:'flex'}}>
                            <Form.Group >
                                <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    className="mx-sm-3"
                                    onChange={(input) => {
                                        this.setState({
                                            userInput: input.target.value
                                        })
                                    }}
                                />
                                <Button variant="outline-primary" style={{width: '75%', marginTop: '12%'}} onClick={handleSubmit}>Login</Button>

                            </Form.Group>

                        </Form>
                    </div>
                ) : (
                    <Tabs defaultActiveKey="meetings">
                        <Tab eventKey="meetings" title="Meetings">
                            <Meetings meetings={this.state.meetings} role={this.state.role}/>
                        </Tab>
                        <Tab eventKey="new_meeting" title="New Meeting">
                            <NewMeeting/>
                        </Tab>
                    </Tabs>
                )}
            </Container>
        );
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
