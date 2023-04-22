import {Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {Button, Col, InputGroup, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import FormCheckboxGroup from "../UI/Form/FormCheckboxGroup";
import FormInput from "../UI/Form/FormInput";
import FormSelect from "../UI/Form/FormSelect";
import {emailOptions, transformInstitutionsResponse, transformRolesResponse, transformParticipantRequest,} from "./util";

// Get the logged-in participant from the session
const loggedInParticipant = null;
const initialValues = (participant) => {
  const [lastName, firstName] = participant.fullname.split(",");
  const emailPreferences = [
    "email_on_review",
    "email_on_review_of_review",
    "email_on_submission",
  ].filter((pref) => participant[pref]);

  return {
    name: participant.name,
    email: participant.email,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailPreferences: emailPreferences,
    institution: participant.institution.id ? participant.institution.id : "",
    role: participant.role.id,
  };
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .lowercase("Participantname must be lowercase")
    .min(3, "Participantname must be at least 3 characters")
    .max(20, "Participantname must be at most 20 characters"),
  email: Yup.string().required("Required").email("Invalid email format"),
  firstName: Yup.string().required("Required").nonNullable(),
  lastName: Yup.string().required("Required").nonNullable(),
  role: Yup.string().required("Required").nonNullable(),
  institution: Yup.string().required("Required").nonNullable(),
});

const UpdateParticipant = ({participantData, onClose}) => {
  const [show, setShow] = useState(true);
  const {data: roles, sendRequest: fetchRoles} = useAPI();
  const {data: institutions, sendRequest: fetchInstitutions} = useAPI();
  const {
    data: updatedParticipant,
    error: participantError,
    sendRequest: updateParticipant,
  } = useAPI();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRoles({url: "/roles", transformResponse: transformRolesResponse});
    fetchInstitutions({
      url: "/institutions",
      transformResponse: transformInstitutionsResponse,
    });
  }, [fetchRoles, fetchInstitutions]);

  // Close the modal if the participant is updated successfully and pass the updated participant to the parent component
  useEffect(() => {
    if (updatedParticipant.length > 0) {
      console.log("participant updated");
      onClose(updatedParticipant[0]);
      setShow(false);
    }
  }, [participantError, updatedParticipant, onClose]);

  useEffect(() => {
    if (participantError) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: participantError,
      }));
    }
  }, [participantError, dispatch]);

  const onSubmit = (values, submitProps) => {
    const participantId = participantData.id;
    updateParticipant({
      url: `/participants/${participantId}`,
      method: "patch",
      data: {...values, parent: loggedInParticipant},
      transformRequest: transformParticipantRequest,
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
        <Modal.Title>Update Participant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {participantError && <p className="text-danger">{participantError}</p>}
        <Formik
          initialValues={initialValues(participantData)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form>
                <FormSelect
                  controlId="participant-role"
                  name="role"
                  options={roles}
                  inputGroupPrepend={
                    <InputGroup.Text id="role-prepend">Role</InputGroup.Text>
                  }
                />
                <FormInput
                  controlId="participant-name"
                  label="Participantname"
                  name="name"
                  disabled={true}
                  inputGroupPrepend={
                    <InputGroup.Text id="participant-name-prep">@</InputGroup.Text>
                  }
                />
                <Row>
                  <FormInput
                    as={Col}
                    controlId="participant-first-name"
                    label="First name"
                    name="firstName"
                  />
                  <FormInput
                    as={Col}
                    controlId="participant-last-name"
                    label="Last name"
                    name="lastName"
                  />
                </Row>
                <FormInput controlId="participant-email" label="Email" name="email"/>
                <FormCheckboxGroup
                  controlId="email-pref"
                  label="Email Preferences"
                  name="emailPreferences"
                  options={emailOptions}
                />
                <FormSelect
                  controlId="participant-institution"
                  name="institution"
                  disabled={participantData.institution.id}
                  options={institutions}
                  inputGroupPrepend={
                    <InputGroup.Text id="participant-inst-prep">
                      Institution
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
                    Update Participant
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

export default UpdateParticipant;
