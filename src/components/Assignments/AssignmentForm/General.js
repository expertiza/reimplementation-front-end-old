import { Field } from "formik";
import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import FormCheckbox from "../../UI/Form/FormCheckbox";
import FormCheckboxGroup from "../../UI/Form/FormCheckboxGroup";
import FormInput from "../../UI/Form/FormInput";
import FormRange from "../../UI/Form/FormRange";
import FormSelect from "../../UI/Form/FormSelect";

export const generalInitialValues = {
  name: "",
  directory_path: "",
  preferences: [],
  course: "",
  reputation_algorithm: "",
  require_quiz: false,
  hasTopics: false,
  has_teams: false,
  useSimicheck: false,
  num_quiz_questions: 0,
  max_team_size: 0,
  simicheck: 0,
  simicheck_threshold: 0,
};

export const generalValidationSchema = {
  name: Yup.string().required("Required"),
  course: Yup.string().required("Required"),
  directory_path: Yup.string().required("Required"),
  reputation_algorithm: Yup.string().required("Required"),
  num_quiz_questions: Yup.number().when("require_quiz", {
    is: true,
    then: () => Yup.number().min(1, "Must be greater than 0"),
  }),
  max_team_size: Yup.number().when("has_teams", {
    is: true,
    then: () => Yup.number().min(2, "Must be greater than 1"),
  }),
  simicheck_threshold: Yup.number().when("useSimicheck", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Must be greater than 0")
        .max(99, "Must be less than 100"),
  }),
  simicheck: Yup.number().when("useSimicheck", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Must be greater than 0")
        .max(99, "Must be less than 100"),
  }),
};

const availableCourses = [
  { key: "Select a course", value: "" },
  { key: "Course 1", value: 1 },
  { key: "Course 2", value: 2 },
  { key: "Course 3", value: 3 },
  { key: "Course 4", value: 4 },
  { key: "Course 5", value: 5 },
];

const formCheckboxGroupOptions1 = [
  { label: "Available to Students?", value: "availability_flag" },
  { label: "Private Assignment?", value: "private" },
  { label: "Has Badge?", value: "has_badge" },
  { label: "Micro-task assignment?", value: "has_description" },
  { label: "Calibration for training?", value: "is_calibrated" },
  {
    label: "Staggered deadline assignment?",
    value: "staggered_deadline",
  },
  {
    label: "Reviews visible to all other reviewers?",
    value: "reviews_visible_to_all",
  },
  {
    label: "Allow feedback comments to be tagged by the author?",
    value: "is_answer_tagging_allowed",
  },
];

const handleHasTeamsChange = (e, form) => {
  if (e.target.checked) {
    form.setFieldValue("has_teams", true);
    form.setFieldValue("max_team_size", 2);
  } else {
    form.setFieldValue("max_team_size", 0);
    form.setFieldValue("has_teams", false);
    form.setFieldValue("show_teammate_reviews", false);
  }
};

export const General = (props) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <FormInput
            controlId="assignment-name"
            label="Assignment Name"
            name="name"
          />

          <FormSelect
            controlId="course-name"
            name="course"
            options={availableCourses}
            inputGroupPrepend={
              <InputGroup.Text id="course-prepend">Course</InputGroup.Text>
            }
          />

          <FormInput
            controlId="submission-directory"
            label="Submission Directory"
            name="directory_path"
          />
        </Col>
      </Row>
      <Row className="my-md-4">
        <hr />
      </Row>
      <Row>
        <FormCheckboxGroup
          as={Col}
          md={"6"}
          label="Assignment Preferences"
          controlId="pref"
          name="preferences"
          options={formCheckboxGroupOptions1}
        />
        <FormCheckbox
          controlId="has-topics"
          name="hasTopics"
          label="Has Topics?"
        />
        <Field name="has_teams">
          {({ field, form }) => {
            return (
              <Form.Group controlId="has-teams">
                <InputGroup>
                  <Form.Check
                    {...field}
                    className="mx-md-2"
                    type="checkbox"
                    label="Has Teams?"
                    isInvalid={
                      form.touched[field.name] && form.errors[field.name]
                    }
                    feedback={form.errors[field.name]}
                    onChange={(e) => handleHasTeamsChange(e, form)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors[field.name]}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            );
          }}
        </Field>

        {props.values.has_teams && (
          <FormInput
            as={Col}
            md={"4"}
            controlId="team-size"
            type="number"
            name="max_team_size"
            inputGroupPrepend={
              <InputGroup.Text id="team-size-prepend">
                Maximum Team Size
              </InputGroup.Text>
            }
          />
        )}
        <FormCheckbox
          label="Has Quiz?"
          controlId="has-quiz"
          name="require_quiz"
        />
        {props.values.require_quiz && (
          <FormInput
            as={Col}
            md={"4"}
            controlId="quiz-questions"
            type="number"
            name="num_quiz_questions"
            inputGroupPrepend={
              <InputGroup.Text id="quiz-prepend">
                Number of Quiz Questions
              </InputGroup.Text>
            }
          />
        )}

        <Row>
          <FormCheckbox
            label="Use Simicheck?"
            controlId="use-simicheck"
            name="useSimicheck"
          />

          {props.values.useSimicheck && (
            <FormRange
              as={Col}
              md={"3"}
              controlId="simicheck"
              name="simicheck"
              label="SimiCheck Delay (Hours)"
            />
          )}

          {props.values.useSimicheck && (
            <FormRange
              as={Col}
              md={"3"}
              controlId="simicheck-threshold"
              name="simicheck_threshold"
              label="SimiCheck Similarity Threshold (%)"
            />
          )}
        </Row>
        <FormSelect
          as={Col}
          md={"6"}
          controlId="algorithm"
          name="reputation_algorithm"
          options={[
            { key: "Select an algorithm", value: "" },
            { key: "Algorithm 1", value: 1 },
            { key: "Algorithm 2", value: 2 },
            { key: "Algorithm 3", value: 3 },
            { key: "Algorithm 4", value: 4 },
            { key: "Algorithm 5", value: 5 },
          ]}
          inputGroupPrepend={
            <InputGroup.Text id="algo-prepend">
              Reputation Algorithm
            </InputGroup.Text>
          }
        />
      </Row>
    </>
  );
};
