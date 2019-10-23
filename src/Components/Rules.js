import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

// This component contains the rules of the game which uses a button and a modal from react bootstrap
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Rules of the game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            - To start the game, click on one of the speed levels of your choice.<br/>
            - Use the directional arrows on your keyboard to move the snake up, down, left or right.<br/>
            - Moving past the border barriers will end the game.<br/>
            - Tapping the opposite directional key of the snakes direction will also end the game.<br/>
            - Try and eat as much mice as possible to score points.<br/>
            - Each consumed mouse adds 1 point to the snake's length.<br/>
            - Goodluck!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Rules() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <ButtonToolbar>
        <Button id="rulesbtn" variant="primary" onClick={() => setModalShow(true)}>
          Rules
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>
    );
  }
  
export default Rules;