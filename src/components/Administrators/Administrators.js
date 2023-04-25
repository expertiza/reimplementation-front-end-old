import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
// import {AddUserIcon} from "../UI/Icons";
import Table from "../UI/Table/Table";
// import CreateUser from "./CreateUser";
// import DeleteUser from "./DeleteUser";
// import UpdateUser from "./UpdateUser";
import {USER_ROLE_COLUMNS} from "./userRoleColumns";

const Users = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: userData,
    sendRequest: fetchUsers,
  } = useAPI();

  useEffect(() => fetchUsers({url: "/users", method: "get"}), [fetchUsers]);

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: error
      }));
    }
  }, [error, dispatch]);

  const tableColumns = useMemo(
    () => USER_ROLE_COLUMNS(),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : userData),
    [userData, isLoading]
  );
  
const initialState = {hiddenColumns: ["id", "institution"]};

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{span: 4, offset: 4}}>
          <h1>Administrators</h1>
        </Col>
        <hr/>
      </Row>
      <Row>
        <Table
          data={tableData}
          columns={tableColumns}
          initialState={initialState}
        />
      </Row>
    </Container>
  );
};

export default Users;
