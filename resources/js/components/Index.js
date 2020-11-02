import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Meetings from "./Meetings";
import NewMeeting from "./NewMeeting";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        console.log(this.state)
        return (
            <Container className="App mt-5">
                <Tabs defaultActiveKey="meetings">
                    <Tab eventKey="meetings" title="Meetings">
                        <Meetings/>
                    </Tab>
                    <Tab eventKey="new_meeting" title="New Meeting">
                        <NewMeeting/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
