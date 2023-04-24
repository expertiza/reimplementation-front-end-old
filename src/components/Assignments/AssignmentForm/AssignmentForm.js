import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import * as Yup from "yup";
import Badges from "./Badges";
import Calibration from "./Calibration";
import DueDate from "./DueDate";
import {
  General,
  generalInitialValues,
  generalValidationSchema,
} from "./General";
import Miscellaneous from "./Miscellaneous";
import ReviewStrategy, {
  reviewStrategyInitialValues,
  reviewStrategyValidationSchema,
} from "./ReviewStrategy";
import Rubrics, { rubricInitialValues } from "./Rubrics";
import { topicInitialValues, Topics, topicValidationSchema } from "./Topics";

const initialValues = {
  ...generalInitialValues,
  ...topicInitialValues,
  ...reviewStrategyInitialValues,
  ...rubricInitialValues,
};

const validationSchema = Yup.object().shape({
  ...generalValidationSchema,
  ...topicValidationSchema,
  ...reviewStrategyValidationSchema,
});

const onSubmit = (values, submitProps) => {
  console.log("Form data", values);
  console.log("Submit props", submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const AssignmentForm = () => {
  const [key, setKey] = useState("general");

  return (
    <Container fluid className="px-md-4">
      <Row className="my-md-2">
        <Col md={{ span: 4, offset: 4 }}>
          <h2>Create New Assignment</h2>
        </Col>
      </Row>
      <Row>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {(formik) => {
            console.log("Formik props", formik.values);
            return (
              <Form>
                <Tabs
                  fill
                  id="controlled-tab"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="general" title="General">
                    <General values={formik.values} />
                  </Tab>
                  {formik.values.hasTopics && (
                    <Tab eventKey="topics" title="Topics">
                      <Topics values={formik.values} />
                    </Tab>
                  )}
                  <Tab eventKey="reviewStrategy" title="Review Strategy">
                    <ReviewStrategy values={formik.values} />
                  </Tab>
                  <Tab eventKey="rubrics" title="Rubrics">
                    <Rubrics values={formik.values} />
                  </Tab>

                  <Tab eventKey="dueDate" title="Due Date">
                    <DueDate />
                  </Tab>
                  <Tab eventKey="calibration" title="Calibration">
                    <Calibration />
                  </Tab>
                  <Tab eventKey="badges" title="Badges">
                    <Badges />
                  </Tab>
                  <Tab eventKey="misc" title="Misc">
                    <Miscellaneous />
                  </Tab>
                </Tabs>
                <Row>
                  <Col md={{ offset: 8 }}>
                    <Button
                      variant="success"
                      type="submit"
                      disabled={
                        !(formik.isValid && formik.dirty) || formik.isSubmitting
                      }
                    >
                      Create
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Row>
    </Container>
  );
};

export default AssignmentForm;
