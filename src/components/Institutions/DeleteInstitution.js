import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";

const DeleteInstitution = ({institutionData, onClose}) => {
  const dispatch = useDispatch();
  const {
    data: deletedInstitution,
    error: institutionError,
    sendRequest: deleteInstitution,
  } = useAPI();
  const [show, setShow] = useState(true);

  const deleteHandler = () =>
    deleteInstitution({url: `/institutions/${institutionData.id}`, method: "DELETE"});

  useEffect(() => {
    if (institutionError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: institutionError,
      }));
    }
  }, [institutionError, dispatch]);

  useEffect(() => {
    if (deletedInstitution.length > 0) {
      setShow(false);
      onClose(deletedInstitution[0]);
    }
  }, [deletedInstitution, onClose]);

  const closeHandler = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Institution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete Institution <b>{institutionData.name}?</b>
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

export default DeleteInstitution;
