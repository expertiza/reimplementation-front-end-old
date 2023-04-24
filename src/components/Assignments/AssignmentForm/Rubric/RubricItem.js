import { Field, FieldArray } from "formik";
import React from "react";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";
import FormInput from "../../../UI/Form/FormInput";
import FormSelect from "../../../UI/Form/FormSelect";
import InfoToolTip from "../../../UI/InfoToolTip";
import TagPrompt from "./TagPrompt";

const RubricItem = (props) => {
  const {
    name,
    values,
    rubricName,
    displayStyles,
    questionTypes,
    promptOptions,
    questionnaireOptions,
  } = props;
  return (
    <Card bg="smoke" border="dark" className="mb-md-2">
      <Card.Body>
        <Row>
          <Col xs="2" className="d-flex align-items-center">
            <strong>{rubricName}</strong>
          </Col>
          <Col xs="10">
            <Row>
              <Col xs="auto">
                <FormSelect
                  controlId={`rubrics.${name}.questionnaire`}
                  name={`rubrics.${name}.questionnaire_id`}
                  options={questionnaireOptions}
                  inputGroupPrepend={
                    <InputGroup.Text
                      id={`rubrics.${name}.questionnaire-prepend`}
                    >
                      Questionnaire
                    </InputGroup.Text>
                  }
                />
              </Col>
              <Col xs="auto" className="mt-md-4">
                <Field name={`rubrics.${name}.dropdown`}>
                  {({ field, form }) => (
                    <InputGroup>
                      <InputGroup.Checkbox
                        {...field}
                        isInvalid={
                          form.touched[field.name] && form.errors[field.name]
                        }
                        feedback={form.errors[field.name]}
                      />
                      <InputGroup.Text>
                        Use dropdown instead{" "}
                        <InfoToolTip
                          id={`rubrics.${name}.dropdown-tooltip`}
                          placement="top"
                          info="If instructor chooses 'Use dropdown instead', a simple dropdown will be used by students to do their reviews using a simple dropdown instead of a full rubric"
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  )}
                </Field>
              </Col>
              <Col xs="auto">
                <FormSelect
                  controlId={`rubrics.${name}.display_type`}
                  name={`rubrics.${name}.display_type`}
                  options={displayStyles}
                  inputGroupPrepend={
                    <InputGroup.Text
                      id={`rubrics.${name}.display_type-prepend`}
                    >
                      Scored question display type
                      <InfoToolTip
                        id={`rubrics.${name}.display_type-tooltip`}
                        placement="top"
                        info="Should questions be displayed as scaled (radio buttons) or criterion (dropdown)?"
                      />
                    </InputGroup.Text>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col sm="auto">
                <FormInput
                  controlId={`rubrics.${name}.weight`}
                  name={`rubrics.${name}.questionnaire_weight`}
                  type="number"
                  inputGroupPrepend={
                    <InputGroup.Text id={`rubrics.${name}.weight-prepend`}>
                      Weight
                    </InputGroup.Text>
                  }
                  inputGroupPostpend={
                    <InputGroup.Text id={`rubrics.${name}.weight-postpend`}>
                      %
                    </InputGroup.Text>
                  }
                />
              </Col>
              <Col sm="auto">
                <FormInput
                  controlId={`rubrics.${name}.notification_limit`}
                  name={`rubrics.${name}.notification_limit`}
                  type="number"
                  inputGroupPrepend={
                    <InputGroup.Text id={`rubrics.${name}.notification-prep`}>
                      {"Notification Limit "}
                      <InfoToolTip
                        id={`rubrics.${name}.notification-tooltip`}
                        placement="bottom"
                        info="The instructor will receive an email if a new review differs by more than the indicated percentage from existing reviews on this assignment."
                      />
                    </InputGroup.Text>
                  }
                  inputGroupPostpend={
                    <InputGroup.Text id={`rubrics.${name}.notification-post`}>
                      %
                    </InputGroup.Text>
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <FieldArray name={`rubrics.${name}.tagPrompts`}>
              {(arrayHelpers) => (
                <>
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      arrayHelpers.push({
                        tag_prompt: "",
                        question_type: "",
                        comment_length_threshold: "",
                      })
                    }
                  >
                    Add Tag Prompt
                  </Button>

                  <TagPrompt
                    name_path={`rubrics.${name}.tagPrompts`}
                    values={values["rubrics"][name].tagPrompts}
                    tag_prompts={promptOptions}
                    question_types={questionTypes}
                    remove={arrayHelpers.remove}
                  />
                </>
              )}
            </FieldArray>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RubricItem;
