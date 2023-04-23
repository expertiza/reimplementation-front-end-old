import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useAPI from "../../hooks/use-api";
import { alertActions } from "../../store/alert";

const DeleteRole = ({ roleData, onClose }) => {
  const [show, setShow] = useState(true);
  const deleteHandler = () => {
    console.log("Deleted");
  };
  // deleteInstitution({url: `/roles/${roleData.id}`, method: "DELETE"});

  const closeHandler = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete role <b>{roleData.name}?</b>
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

export default DeleteRole;
