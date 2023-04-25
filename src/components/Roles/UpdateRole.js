import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, InputGroup, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useAPI from "../../hooks/use-api";
import { alertActions } from "../../store/alert";
import FormCheckboxGroup from "../UI/Form/FormCheckboxGroup";
import FormInput from "../UI/Form/FormInput";
import FormSelect from "../UI/Form/FormSelect";
import { transformRolesRequest } from "./util";

// Get the logged-in user from the session
const loggedInUser = null;
const initialValues = (role) => {
  const [name] = role.name;
  return {
    name: role.name,
  };
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Role Name must be at least 3 characters")
    .max(20, "Role Name must be at most 20 characters"),
});

const UpdateRole = ({ roleData, onClose }) => {
  const [show, setShow] = useState(true);
  const {
    data: updatedRole,
    error: roleError,
    sendRequest: updateRole,
  } = useAPI();
  const dispatch = useDispatch();

  // Close the modal if the institution is updated successfully and pass the updated institution to the parent component
  useEffect(() => {
    if (updatedRole.length > 0) {
      console.log("Role updated");
      onClose(updatedRole[0]);
      setShow(false);
    }
  }, [roleError, updatedRole, onClose]);

  useEffect(() => {
    if (roleError) {
      dispatch(
        alertActions.showAlert({
          variant: "danger",
          message: roleError,
        })
      );
    }
  }, [roleError, dispatch]);

  const onSubmit = (values, submitProps) => {
    const roleId = roleData.id;
    updateRole({
      url: `/roles/${roleId}`,
      method: "patch",
      data: { ...values, parent: loggedInUser },
      transformRequest: transformRolesRequest,
    });
    submitProps.resetForm();
    submitProps.setSubmitting(false);
  };

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {roleError && <p className="text-danger">{roleError}</p>}
        <Formik
          enableReinitialize={true}
          initialValues={initialValues(roleData)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
        >
          {(formik) => {
            return (
              <Form>
                <FormInput
                  controlId="role-name"
                  label="Role Name"
                  name="name"
                  //   disabled={true}
                  inputGroupPrepend={
                    <InputGroup.Text id="role-prepend">Role</InputGroup.Text>
                  }
                />

                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="outline-success"
                    type="submit"
                    disabled={
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                    }
                  >
                    Update Role
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateRole;
