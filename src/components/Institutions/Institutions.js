import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import {AddUserIcon} from "../UI/Icons";
import Table from "../UI/Table/Table";
import CreateInstitution from "./CreateInstitution";
import DeleteInstitution from "./DeleteInstitution";
import UpdateInstitution from "./UpdateInstitution";
import {INSTITUTIONS_COLUMNS} from "./institutionColumns";

const Institutions = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: institutionData,
    setData: setInstitutionData,
    sendRequest: fetchInstitutions,
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

  useEffect(() => fetchInstitutions({url: "/institutions", method: "get"}), [fetchInstitutions]);

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: error
      }));
    }
  }, [error, dispatch]);

  const onCreateInstitutionHandler = useCallback(
    (institution) => {
      if (institution && institution.name) {
        console.log(institution);
        setInstitutionData((prevData) => [...prevData, institution]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Institution ${institution.name} created successfully!`
        }));
      }
      setShowCreate(false);
    },
    [setInstitutionData, dispatch]
  );

  const onUpdateInstitutionHandler = useCallback(
    (updatedInstitution) => {
      if (updatedInstitution && updatedInstitution.name !== undefined) {
        setInstitutionData((prevData) => [
          ...prevData.filter((institution) => institution.id !== updatedInstitution.id),
          updatedInstitution,
        ]);
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Institution ${updatedInstitution.name} updated successfully!`
        }));
      }
      setShowUpdate({visible: false, data: {}});
    },
    [setInstitutionData, dispatch]
  );

  const onDeleteInstitutionHandler = useCallback(
    (id, name, status) => {
      if (status) {
        setInstitutionData((prevData) => {
          return prevData.filter((institution) => institution.id !== id);
        });
        dispatch(alertActions.showAlert({
          variant: "success",
          message: `Institution ${name} deleted successfully!`
        }));
      }
      setShowDeleteConfirmation({visible: false, data: {}});
    },
    [setInstitutionData, dispatch]
  );

  const onEditHandle = (row) =>
    setShowUpdate({visible: true, data: row.original});
  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({visible: true, data: row.original});

  const tableColumns = useMemo(
    () => INSTITUTIONS_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : institutionData),
    [institutionData, isLoading]
  );
  const initialState = {hiddenColumns: ["id", "institution"]};

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{span: 4, offset: 4}}>
          <h1>Manage Institutions</h1>
        </Col>
        <hr/>
      </Row>
      <Row>
        <Col md={{span: 1, offset: 11}}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCreate(true)}
          >
            <AddUserIcon width="24" height="24"/>
          </Button>
        </Col>
        {showCreate && <CreateInstitution onClose={onCreateInstitutionHandler}/>}
        {showUpdate.visible && (
          <UpdateInstitution
            institutionData={showUpdate.data}
            onClose={onUpdateInstitutionHandler}
          />
        )}
        {showDeleteConfirmation.visible && (
          <DeleteInstitution
            institutionData={showDeleteConfirmation.data}
            onClose={onDeleteInstitutionHandler.bind(
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

export default Institutions;
