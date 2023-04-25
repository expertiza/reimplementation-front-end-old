import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useAPI from "../../hooks/use-api";
import { alertActions } from "../../store/alert";
import { AddUserIcon } from "../UI/Icons";
import Table from "../UI/Table/Table";
import { INSTRUCTORS_COLUMNS } from "./instructorColumns";

const Instructors = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: instructorData,
    setData: setInstructorData,
    sendRequest: fetchInstructors,
  } = useAPI();

  useEffect(
    () => fetchInstructors({ url: "/roles/instructor/users", method: "get" }),
    [fetchInstructors]
  );

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(
        alertActions.showAlert({
          variant: "danger",
          message: error,
        })
      );
    }
  }, [error, dispatch]);

  const tableColumns = useMemo(() => INSTRUCTORS_COLUMNS(), []);
  const tableData = useMemo(
    () => (isLoading ? [] : instructorData),
    [instructorData, isLoading]
  );
  const initialState = { hiddenColumns: ["id"] };

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{ span: 4, offset: 4 }}>
          <h1> Instructors</h1>
        </Col>
        <hr />
      </Row>
      <Row>
        <Col md={{ span: 1, offset: 11 }}></Col>
      </Row>
      <Row>
        {}
        <Table
          data={tableData}
          columns={tableColumns}
          initialState={initialState}
        />
      </Row>
    </Container>
  );
};

export default Instructors;
