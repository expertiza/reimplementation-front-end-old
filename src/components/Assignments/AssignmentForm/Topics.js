import React from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import FormCheckbox from "../../UI/Form/FormCheckbox";
import InfoToolTip from "../../UI/InfoToolTip";

export const topicInitialValues = {
  use_bookmark: false,
  is_intelligent: false,
  allow_suggestions: false,
  can_review_same_topic: false,
  can_choose_topic_to_review: false,
  topics: [],
};

export const topicValidationSchema = {
  use_bookmark: Yup.boolean(),
  is_intelligent: Yup.boolean(),
  allow_suggestions: Yup.boolean(),
  can_review_same_topic: Yup.boolean(),
  can_choose_topic_to_review: Yup.boolean(),
};

export const Topics = (formik) => {
  return (
    <>
      <Row>
        <Col md={6}>
          <h2>{`Topics for ${formik.values.name} Assignment`}</h2>
        </Col>
      </Row>
      <Row className="mt-md-2">
        <FormCheckbox
          as={Col}
          md={6}
          controlId="is-intelligent"
          name="is_intelligent"
          label="Enable bidding for topics?"
          tooltip="If enabled, students will be able to bid for topics. The topic with the highest bid will be assigned to the student. If disabled, topics will be assigned to students in the order they are listed"
        />
        <FormCheckbox
          as={Col}
          md={6}
          controlId="allow-suggestions"
          name="allow_suggestions"
          label="Allow topic suggestions from students?"
        />
        <FormCheckbox
          as={Col}
          md={6}
          controlId="use-bookmark"
          name="use_bookmark"
          label="Allow participants to create bookmarks?"
        />
        <FormCheckbox
          as={Col}
          md={6}
          controlId="choose-topic-to-review"
          name="can_choose_topic_to_review"
          label="Allow reviewer to choose which topic to review?"
        />
        <FormCheckbox
          as={Col}
          md={6}
          controlId="can-review-same-topic"
          name="can_review_same_topic"
          label={
            <>
              Enable authors to review others working on same topic?
              <InfoToolTip
                id="can-review-same-topic"
                info="If checked, it is possible that the authors review another artifact on the same topic"
              />
            </>
          }
        />
      </Row>
      <Row className="my-md-4">
        <hr />
      </Row>
      <Row></Row>
    </>
  );
};
