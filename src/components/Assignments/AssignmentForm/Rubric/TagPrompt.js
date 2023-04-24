import React from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import FormInput from "../../../UI/Form/FormInput";
import FormSelect from "../../../UI/Form/FormSelect";

const TagPrompt = ({
  name_path,
  values,
  tag_prompts,
  question_types,
  remove,
}) => {
  return values.map((_, index) => (
    <Row key={index}>
      <FormSelect
        as={Col}
        controlId={`${name_path}.${index}.tagPrompt`}
        name={`${name_path}.${index}.tag_prompt`}
        options={tag_prompts}
        inputGroupPrepend={
          <InputGroup.Text id={`${name_path}.${index}.tagPrompt.prepend`}>
            Tag prompt
          </InputGroup.Text>
        }
      />

      <FormSelect
        as={Col}
        controlId={`${name_path}.${index}.questionType`}
        name={`${name_path}.${index}.question_type`}
        options={question_types}
        inputGroupPrepend={
          <InputGroup.Text id={`${name_path}.${index}.questionType.prepend`}>
            Question type
          </InputGroup.Text>
        }
      />
      <FormInput
        as={Col}
        controlId={`${name_path}.${index}.threshold`}
        name={`${name_path}.${index}.comment_length_threshold`}
        type="number"
        inputGroupPrepend={
          <InputGroup.Text id={`${name_path}.${index}.threshold.prepend`}>
            Comment length threshold
          </InputGroup.Text>
        }
      />
      <Col className="mt-md-4">
        <Button variant="outline-danger" onClick={() => remove(index)}>
          Remove Prompt
        </Button>
      </Col>
    </Row>
  ));
};

export default TagPrompt;
