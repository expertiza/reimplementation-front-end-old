import { FieldArray, useFormikContext } from "formik";
import React, { useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import FormCheckbox from "../../UI/Form/FormCheckbox";
import RubricItem from "./Rubric/RubricItem";

const REVIEW = "review";
const META_REVIEW = "meta_review";
const TEAMMATE_REVIEW = "teammate_review";
const AUTHOR_FEEDBACK = "author_feedback";
const BOOKMARK_RATING = "bookmark_rating";

const rubricItemInitialValues = {
  questionnaire_id: "",
  display_type: "Dropdown",
  questionnaire_weight: "",
  notification_limit: "",
  dropdown: false,
  tagPrompts: [],
};

export const rubricInitialValues = {
  review_rubric_varies_by_round: false,
  show_teammate_reviews: false,
  rubrics: {
    review_1: rubricItemInitialValues,
    author_feedback: rubricItemInitialValues,
  },
};

const reviewQuestionnaireOptions = [
  { key: "questionnaire_1", value: "Questionnaire 1" },
  { key: "questionnaire_2", value: "Questionnaire 2" },
  { key: "questionnaire_3", value: "Questionnaire 3" },
];

const questionTypes = [
  { key: "text", value: "Text" },
  { key: "textarea", value: "Text Area" },
  { key: "checkbox", value: "Checkbox" },
  { key: "radio", value: "Radio" },
];

const tagPromptsOptions = [
  { key: "tag_prompt_1", value: "Tag Prompt 1" },
  { key: "tag_prompt_2", value: "Tag Prompt 2" },
  { key: "tag_prompt_3", value: "Tag Prompt 3" },
];

const displayStyles = [
  { key: "Dropdown", value: "Dropdown" },
  { key: "Scale", value: "Scale" },
];

const rubricItemValidationSchema = {
  questionnaire_id: Yup.string().required("Required"),
  display_type: Yup.string().required("Required"),
  questionnaire_weight: Yup.number().required("Required").min(0).max(100),
  notification_limit: Yup.number().required("Required").min(0).max(100),
  tagPrompts: Yup.array()
    .of(
      Yup.object().shape({
        tag_prompt: Yup.string().required("Tag prompt is required"),
        question_type: Yup.string().required("Question type is required"),
        comment_length_threshold: Yup.number()
          .min(1, "Threshold must be at least 1")
          .notRequired(),
      })
    )
    .notRequired(),
};

const renderQuestionnaires = (
  name,
  values,
  rubricName,
  questionnaireOptions
) => {
  return (
    <RubricItem
      key={name}
      name={name}
      values={values}
      rubricName={rubricName}
      displayStyles={displayStyles}
      questionTypes={questionTypes}
      promptOptions={tagPromptsOptions}
      questionnaireOptions={questionnaireOptions}
    />
  );
};

const Rubrics = ({ values }) => {
  const { setFieldValue } = useFormikContext();

  const initializeRubricValues = useCallback(
    (names, action = "add") => {
      let newRubrics = { ...values.rubrics };
      let shouldUpdate = false;

      if (action === "remove") {
        names.forEach((name) => {
          if (newRubrics.hasOwnProperty(name)) {
            delete newRubrics[name];
            shouldUpdate = true;
          }
        });
      } else {
        names.forEach((name) => {
          if (!values.rubrics[name]) {
            newRubrics[name] = rubricItemInitialValues;
            shouldUpdate = true;
          }
        });
      }
      shouldUpdate && setFieldValue("rubrics", newRubrics);
    },
    [values.rubrics, setFieldValue]
  );

  useEffect(() => {
    const rubricNames = [];
    for (let i = 2; i <= +values.rounds_of_reviews; i++)
      rubricNames.push(`${REVIEW}_${i}`);

    if (values.review_rubric_varies_by_round) {
      initializeRubricValues(rubricNames);
    } else {
      initializeRubricValues(rubricNames, "remove");
    }
  }, [values.review_rubric_varies_by_round, values.rounds_of_reviews]);

  useEffect(() => {
    values.has_meta_review_limit && initializeRubricValues([META_REVIEW]);
    !values.has_meta_review_limit &&
      initializeRubricValues([META_REVIEW], "remove");
  }, [values.has_meta_review_limit]);

  useEffect(() => {
    values.show_teammate_reviews && initializeRubricValues([TEAMMATE_REVIEW]);
    !values.show_teammate_reviews &&
      initializeRubricValues([TEAMMATE_REVIEW], "remove");
  }, [values.show_teammate_reviews]);

  useEffect(() => {
    values.use_bookmark && initializeRubricValues([BOOKMARK_RATING]);
    !values.use_bookmark && initializeRubricValues([BOOKMARK_RATING], "remove");
  }, [values.use_bookmark]);

  return (
    <>
      <Row>
        <Col md={6}>
          <h2>Rubrics</h2>
        </Col>
      </Row>
      <Row className="mt-md-2">
        <FormCheckbox
          as={Col}
          md={6}
          controlId="rubric-varies-by-round"
          name="review_rubric_varies_by_round"
          label="Review rubric varies by round?"
        />
        {values.has_teams && (
          <FormCheckbox
            as={Col}
            md={6}
            controlId="show-teammate-reviews"
            name="show_teammate_reviews"
            label="Show teammate reviews?"
          />
        )}
      </Row>
      <Row className="my-md-4">
        <hr />
      </Row>
      <Row>
        <FieldArray name="rubrics">
          {(arrayHelper) => {
            console.log("Array Helper", arrayHelper);
            return (
              <>
                {renderQuestionnaires(
                  "review_1",
                  values,
                  "Review Round 1",
                  reviewQuestionnaireOptions
                )}
                {values.review_rubric_varies_by_round &&
                  values.rubrics[`${REVIEW}_2`] &&
                  Array.from(Array(+values.rounds_of_reviews - 1).keys()).map(
                    (_, i) =>
                      renderQuestionnaires(
                        `${REVIEW}_${i + 2}`,
                        values,
                        `Review Round ${i + 2}`,
                        reviewQuestionnaireOptions
                      )
                  )}

                {values.rubrics[META_REVIEW] &&
                  renderQuestionnaires(
                    META_REVIEW,
                    values,
                    "Meta Review",
                    reviewQuestionnaireOptions
                  )}

                {renderQuestionnaires(
                  AUTHOR_FEEDBACK,
                  values,
                  "Author Feedback",
                  reviewQuestionnaireOptions
                )}

                {values.rubrics[BOOKMARK_RATING] &&
                  renderQuestionnaires(
                    BOOKMARK_RATING,
                    values,
                    "Bookmark Rating",
                    reviewQuestionnaireOptions
                  )}

                {values.rubrics[TEAMMATE_REVIEW] &&
                  renderQuestionnaires(
                    TEAMMATE_REVIEW,
                    values,
                    "Teammate Review",
                    reviewQuestionnaireOptions
                  )}
              </>
            );
          }}
        </FieldArray>
      </Row>
    </>
  );
};

export default Rubrics;
