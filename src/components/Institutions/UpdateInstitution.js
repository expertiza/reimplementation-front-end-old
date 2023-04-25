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
import { transformInstitutionsRequest } from "./util";

// Get the logged-in user from the session
const loggedInUser = null;
const initialValues = (institution) => {
  const [name] = institution.name;
  return {
    name: institution.name,
  };
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Institution Name must be at least 3 characters")
    .max(20, "Institution Name must be at most 20 characters"),
});

const UpdateInstitution = ({ institutionData, onClose }) => {
  const [show, setShow] = useState(true);
  const {
    data: updatedInstitution,
    error: institutionError,
    sendRequest: updateInstitution,
  } = useAPI();
  const dispatch = useDispatch();

  // Close the modal if the institution is updated successfully and pass the updated institution to the parent component
  useEffect(() => {
    if (updatedInstitution.length > 0) {
      console.log("Institution updated");
      onClose(updatedInstitution[0]);
      setShow(false);
    }
  }, [institutionError, updatedInstitution, onClose]);

  useEffect(() => {
    if (institutionError) {
      dispatch(
        alertActions.showAlert({
          variant: "danger",
          message: institutionError,
        })
      );
    }
  }, [institutionError, dispatch]);

  const onSubmit = (values, submitProps) => {
    const institutionId = institutionData.id;
    updateInstitution({
      url: `/institutions/${institutionId}`,
      method: "patch",
      data: { ...values, parent: loggedInUser },
      transformRequest: transformInstitutionsRequest,
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
        <Modal.Title>Update institution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {institutionError && <p className="text-danger">{institutionError}</p>}
        <Formik
          initialValues={initialValues(institutionData)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form>
                <FormInput
                  controlId="institution-name"
                  label="Institution Name"
                  name="name"
                  inputGroupPrepend={
                    <InputGroup.Text id="user-name-prep">
                      Institution name
                    </InputGroup.Text>
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
                    Update Institution
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

export default UpdateInstitution;
