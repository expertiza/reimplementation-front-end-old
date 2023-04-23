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

const initialValues = {
  name: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Institution Name must be at least 3 characters")
    .max(20, "Institution Name must be at most 20 characters"),
});

const CreateRole = ({ onClose }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const {
    data: createdInstitution,
    error: institutionError,
    sendRequest: createInstitution,
  } = useAPI();

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

  useEffect(() => {
    if (createdInstitution.length > 0) {
      setShow(false);
      onClose(createdInstitution[0]);
    }
  }, [institutionError, createdInstitution, onClose]);

  const onSubmit = (values, submitProps) => {
    // createInstitution({
    //   url: "/institutions",
    //   method: "post",
    //   data: { ...values, parent: loggedInUser },
    //   transformRequest: transformInstitutionsRequest,
    // });
    console.log("VALUES", values);
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
        <Modal.Title>Create Institution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
        >
          {(formik) => {
            return (
              <Form>
                <Row>
                  <FormInput
                    as={Col}
                    controlId="institution-name"
                    label="Institution Name"
                    name="name"
                  />
                </Row>
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
                    Create Institution
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

export default CreateRole;
