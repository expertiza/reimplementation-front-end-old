import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useAPI from "../../hooks/use-api";
import { alertActions } from "../../store/alert";
import { AddUserIcon } from "../UI/Icons";
import Table from "../UI/Table/Table";
import { ROLES_COLUMNS } from "./roleColumns";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";
import DeleteRole from "./DeleteRole";
import { clearConfigCache } from "prettier";

const Roles = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: rolesData,
    setData: setRolesData,
    sendRequest: fetchRoles,
  } = useAPI();

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState({
    visible: false,
    data: {},
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState({
    visible: false,
    data: {},
  });

  useEffect(() => fetchRoles({ url: "/roles", method: "get" }), [fetchRoles]);
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

  //Create Role Handler
  const onCreateRoleHandler = useCallback(
    (institution) => {
      if (institution && institution.name) {
        console.log(institution);
        setRolesData((prevData) => [...prevData, institution]);
        dispatch(
          alertActions.showAlert({
            variant: "success",
            message: `Institution ${institution.name} created successfully!`,
          })
        );
      }
      setShowCreate(false);
    },
    [setRolesData, dispatch]
  );

  const onUpdateRoleHandler = useCallback(
    (updatedRole) => {
      if (updatedRole && updatedRole.name !== undefined) {
        setRolesData((prevData) => [
          ...prevData.filter((role) => role.id !== updatedRole.id),
          updatedRole,
        ]);
        dispatch(
          alertActions.showAlert({
            variant: "success",
            message: `Institution ${updatedRole.name} updated successfully!`,
          })
        );
      }
      setShowUpdate({ visible: false, data: {} });
    },
    [setRolesData, dispatch]
  );

  const onDeleteRoleHandler = useCallback(
    (id, name, status) => {
      if (status) {
        setRolesData((prevData) => {
          return prevData.filter((role) => role.id !== id);
        });
        dispatch(
          alertActions.showAlert({
            variant: "success",
            message: `Role ${name} deleted successfully!`,
          })
        );
      }
      setShowDeleteConfirmation({ visible: false, data: {} });
    },
    [setRolesData, dispatch]
  );

  const onEditHandle = (row) => {
    setShowUpdate({ visible: true, data: row.original });
  };

  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({ visible: true, data: row.original });

  const tableColumns = useMemo(
    () => ROLES_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );

  const tableData = useMemo(
    () => (isLoading ? [] : rolesData),
    [rolesData, isLoading]
  );
  const initialState = { hiddenColumns: ["id"] };

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{ span: 4, offset: 4 }}>
          <h1>Manage Roles</h1>
        </Col>
        <hr />
      </Row>
      <Row>
        <Col md={{ span: 1, offset: 11 }}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
          >
            <AddUserIcon width="24" height="24" />
          </Button>
        </Col>
        {showCreate && <CreateRole onClose={onCreateRoleHandler} />}
        {showUpdate.visible && (
          <UpdateRole
            roleData={showUpdate.data}
            onClose={onUpdateRoleHandler}
          />
        )}
        {showDeleteConfirmation.visible && (
          <DeleteRole
            roleData={showDeleteConfirmation.data}
            onClose={onDeleteRoleHandler.bind(
              null,
              showDeleteConfirmation.data.id,
              showDeleteConfirmation.data.name
            )}
          />
        )}
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

export default Roles;