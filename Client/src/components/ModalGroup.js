import {
    Button,
    Modal,
    ButtonToolbar,
    Col,
    Container,
    Row
} from "react-bootstrap";
import React from "react";
import ModalGroupform from './ModalGroupform'
export default class ModalGroup extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Affect student to this Group
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Student to Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalGroupform></ModalGroupform>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Affect
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

