import React, { Fragment } from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import FormCheckbox from "../../UI/Form/FormCheckbox";
import FormInput from "../../UI/Form/FormInput";
import FormSelect from "../../UI/Form/FormSelect";

export const reviewStrategyInitialValues = {
  rounds_of_reviews: 1,
  review_assignment_strategy: "Auto-Selected",
  review_topic_threshold: 0,
  max_reviews_per_submission: 0,
  has_max_review_limit: false,
  num_reviews_allowed: 0,
  num_reviews_required: 0,
  has_meta_review_limit: false,
  num_meta_reviews_allowed: 0,
  num_meta_reviews_required: 0,
  instructor_selected_review_strategy: "",
  num_reviews_per_student: 0,
  num_reviewers_per_submission: 0,
  num_calibrated_artifacts: 0,
  num_uncalibrated_artifacts: 0,
  is_anonymous: false,
  is_self_review_enabled: false,
  allow_selecting_additional_reviews_after_1st_round: false,
};

export const reviewStrategyValidationSchema = {
  rounds_of_reviews: Yup.number().min(1, "Must be greater than 0"),
  review_assignment_strategy: Yup.string().required("Required"),
  max_reviews_per_submission: Yup.number()
    .min(1, "Must be greater than 0")
    .max(20, "Must be less than 20"),
  num_reviews_allowed: Yup.number().when("has_max_review_limit", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Must be greater than 0")
        .max(9, "Must be less than 10"),
  }),
  num_reviews_required: Yup.number().when(
    ["has_max_review_limit", "num_reviews_allowed"],
    {
      is: (has_max_review_limit, num_reviews_allowed) =>
        has_max_review_limit && num_reviews_allowed > 1,
      then: (num_reviews_allowed) =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(
            +num_reviews_allowed,
            "Must be less than or equal to the number of reviews allowed"
          ),
    }
  ),
  num_meta_reviews_allowed: Yup.number().when("has_meta_review_limit", {
    is: true,
    then: () =>
      Yup.number()
        .min(1, "Must be greater than 0")
        .max(9, "Must be less than 10"),
  }),
  num_meta_reviews_required: Yup.number().when(
    ["has_meta_review_limit", "num_meta_reviews_allowed"],
    {
      is: (has_meta_review_limit, num_meta_reviews_allowed) =>
        has_meta_review_limit && +num_meta_reviews_allowed > 1,
      then: (num_meta_reviews_allowed) =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(
            +num_meta_reviews_allowed,
            "Must be less than or equal to the number of meta reviews allowed"
          ),
    }
  ),
  instructor_selected_review_strategy: Yup.string().required("Required"),
  num_reviews_per_student: Yup.number().when(
    "instructor_selected_review_strategy",
    {
      is: "num_reviews",
      then: () =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(9, "Must be less than 10"),
    }
  ),
  num_reviewers_per_submission: Yup.number().when(
    "instructor_selected_review_strategy",
    {
      is: "num_reviewers",
      then: () =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(9, "Must be less than 10"),
    }
  ),
  num_calibrated_artifacts: Yup.number().when(
    "instructor_selected_review_strategy",
    {
      is: "calibrated_and_uncalibrated",
      then: () =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(9, "Must be less than 10"),
    }
  ),
  num_uncalibrated_artifacts: Yup.number().when(
    "instructor_selected_review_strategy",
    {
      is: "calibrated_and_uncalibrated",
      then: () =>
        Yup.number()
          .min(1, "Must be greater than 0")
          .max(9, "Must be less than 10"),
    }
  ),
};

const reviewStrategyOptions = [
  { key: "Auto Selected", value: "Auto-Selected" },
  { key: "Instructor Selected", value: "Instructor-Selected" },
];

const instructorSelectedReviewOptions = [
  { key: "Select a review strategy", value: "" },
  {
    key: "Set number of calibrated artifacts",
    value: "calibrated_and_uncalibrated",
  },
  { key: "Set number of reviews done by each student", value: "num_reviews" },
  {
    key: "Set minimum number of reviews done for each submission",
    value: "num_reviewers",
  },
];

const renderReviewStrategyInput = (strategy) => {
  switch (strategy) {
    case "num_reviews":
      return (
        <FormInput
          controlId="num_reviews_per_student"
          type="number"
          name="num_reviews_per_student"
          label="Number of Reviews per Student"
        />
      );
    case "num_reviewers":
      return (
        <FormInput
          controlId="num_reviewers_per_submission"
          type="number"
          name="num_reviewers_per_submission"
          label="Number of Reviewers per Submission"
        />
      );
    case "calibrated_and_uncalibrated":
      return (
        <Row>
          <FormInput
            as={Col}
            md={6}
            controlId="num-calibrated-artifacts"
            type="number"
            name="num_calibrated_artifacts"
            label="Number of Calibrated Artifacts"
          />
          <FormInput
            as={Col}
            md={6}
            controlId="num-uncalibrated-artifacts"
            type="number"
            name="num_uncalibrated_artifacts"
            label="Number of Uncalibrated Artifacts"
          />
        </Row>
      );
    default:
      return <></>;
  }
};

const ReviewStrategy = (formik) => {
  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <FormInput
            controlId="rounds-of-reviews"
            type="number"
            name="rounds_of_reviews"
            label="Number of Review Rounds"
          />

          <FormSelect
            controlId="assignment-strategy"
            name="review_assignment_strategy"
            label="Review Strategy"
            value="Auto-Selected"
            options={reviewStrategyOptions}
            tooltip="Instructor-Selected: Instructor decides who reviews whose work. Auto-Selected: When a student is about to begin a review, Expertiza assigns that student a particular review"
          />

          {formik.values.review_assignment_strategy ===
            "Instructor-Selected" && (
            <>
              <FormSelect
                controlId="instructor_selected_review"
                name="instructor_selected_review_strategy"
                label="Instructor Selected Review Strategy"
                options={instructorSelectedReviewOptions}
              />
              {renderReviewStrategyInput(
                formik.values.instructor_selected_review_strategy
              )}
            </>
          )}

          <FormInput
            controlId="review-topic-threshold"
            type="number"
            name="review_topic_threshold"
            label="Review Topic Threshold(k)"
            tooltip="A topic is reviewable if the minimum number of reviews already done for the submissions on that topic is within k of the minimum number of reviews done on the least-reviewed submission on any topic"
          />

          <FormInput
            controlId="max-reviews-per-submission"
            type="number"
            name="max_reviews_per_submission"
            label="Maximum number of reviews per submission"
            tooltip="Select whether this submission needs to have a maximum review limit"
          />

          <FormCheckbox
            controlId="max-review-limit"
            name="has_max_review_limit"
            label="Has max review limit?"
            tooltip="You can select whether the particular submission needs to have maximum limit for review or not"
          />

          {formik.values.has_max_review_limit && (
            <FormInput
              controlId="num-reviews-allowed"
              type="number"
              name="num_reviews_allowed"
              inputGroupPrepend={
                <InputGroup.Text id="num-review-allowed-prepend">
                  Set allowed number of reviews per reviewer
                </InputGroup.Text>
              }
            />
          )}

          {formik.values.has_max_review_limit && (
            <FormInput
              controlId="num-reviews-required"
              type="number"
              name="num_reviews_required"
              inputGroupPrepend={
                <InputGroup.Text id="num-reviews-required-prepend">
                  Set required number of reviews per reviewer
                </InputGroup.Text>
              }
            />
          )}

          <FormCheckbox
            controlId="has_meta_review_limit"
            name="has_meta_review_limit"
            label="Has meta-review limit?"
            tooltip="Does this particular assignment have a meta-review limit for each review?"
          />

          {formik.values.has_meta_review_limit && (
            <FormInput
              controlId="num-reviews-allowed"
              type="number"
              name="num_meta_reviews_allowed"
              inputGroupPrepend={
                <InputGroup.Text id="num-review-allowed-prepend">
                  Set allowed number of meta-reviews per reviewer
                </InputGroup.Text>
              }
            />
          )}

          {formik.values.has_meta_review_limit && (
            <FormInput
              controlId="num-meta-reviews-required"
              type="number"
              name="num_meta_reviews_required"
              inputGroupPrepend={
                <InputGroup.Text id="num-meta-reviews-required-prepend">
                  Set required number of meta-reviews per reviewer
                </InputGroup.Text>
              }
            />
          )}

          <FormCheckbox
            controlId="is_anonymous"
            name="is_anonymous"
            label="Is Review Anonymous?"
            tooltip="You can select whether the reviewer’s name should be visible or not"
          />

          <FormCheckbox
            controlId="is_self_review_enabled"
            name="is_self_review_enabled"
            label="Allow Self Reviews?"
            tooltip="Check the box to allow authors to review their own submission"
          />

          {formik.values.rounds_of_reviews > 1 && (
            <FormCheckbox
              controlId="allow_selecting_additional_reviews_after_1st_round"
              name="allow_selecting_additional_reviews_after_1st_round"
              label="Allow reviews to be begun in later rounds"
              tooltip="Should a student who does not do a first-round review be allowed to review this work in subsequent rounds?"
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default ReviewStrategy;
