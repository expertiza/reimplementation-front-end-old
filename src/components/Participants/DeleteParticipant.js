import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";

const DeleteParticipant = ({participantData, onClose}) => {
  const dispatch = useDispatch();
  const {
    data: deletedParticipant,
    error: participantError,
    sendRequest: deleteParticipant,
  } = useAPI();
  const [show, setShow] = useState(true);

  const deleteHandler = () =>
    deleteParticipant({url: `/participants/${participantData.id}`, method: "DELETE"});

  useEffect(() => {
    if (participantError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: participantError,
      }));
    }
  }, [participantError, dispatch]);

  useEffect(() => {
    if (deletedParticipant.length > 0) {
      setShow(false);
      onClose(deletedParticipant[0]);
    }
  }, [deletedParticipant, onClose]);

  const closeHandler = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Participant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete participant <b>{participantData.name}?</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeHandler}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteParticipant;
