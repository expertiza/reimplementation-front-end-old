import {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import useAPI from "../../hooks/use-api";
import {alertActions} from "../../store/alert";
import {AddUserIcon} from "../UI/Icons";
import Table from "../UI/Table/Table";
// import CreateParticipant from "./CreateParticipant";
// import DeleteParticipant from "./DeleteParticipant";
// import UpdateParticipant from "./UpdateParticipant";
import {PARTICIPANT_COLUMNS} from "./participantColumns";

const Participants = () => {
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    data: participantData,
    setData: setParticipantData,
    sendRequest: fetchParticipants,
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

  useEffect(() => fetchParticipants({url: "/participants", method: "get"}), [fetchParticipants]);

  // Error alert
  useEffect(() => {
    if (error) {
      dispatch(alertActions.showAlert({
        variant: "danger",
        message: error
      }));
    }
  }, [error, dispatch]);

  // const onCreateParticipantHandler = useCallback(
  //   (participant) => {
  //     console.log(participant)
  //     if (participant && participant.name) {
  //       console.log(participant);
  //       setParticipantData((prevData) => [...prevData, participant]);
  //       dispatch(alertActions.showAlert({
  //         variant: "success",
  //         message: `Participant ${participant.name} created successfully!`
  //       }));
  //     }
  //     setShowCreate(false);
  //   },
  //   [setParticipantData, dispatch]
  // );

  // const onUpdateParticipantHandler = useCallback(
  //   (updatedParticipant) => {
  //     if (updatedParticipant && updatedParticipant.name !== undefined) {
  //       setParticipantData((prevData) => [
  //         ...prevData.filter((participant) => participant.id !== updatedParticipant.id),
  //         updatedParticipant,
  //       ]);
  //       dispatch(alertActions.showAlert({
  //         variant: "success",
  //         message: `Participant ${updatedParticipant.name} updated successfully!`
  //       }));
  //     }
  //     setShowUpdate({visible: false, data: {}});
  //   },
  //   [setParticipantData, dispatch]
  // );

  // const onDeleteParticipantHandler = useCallback(
  //   (id, name, status) => {
  //     if (status) {
  //       setParticipantData((prevData) => {
  //         return prevData.filter((participant) => participant.id !== id);
  //       });
  //       dispatch(alertActions.showAlert({
  //         variant: "success",
  //         message: `Participant ${name} deleted successfully!`
  //       }));
  //     }
  //     setShowDeleteConfirmation({visible: false, data: {}});
  //   },
  //   [setParticipantData, dispatch]
  // );

  const onEditHandle = (row) =>
    setShowUpdate({visible: true, data: row.original});
  const onDeleteHandle = (row) =>
    setShowDeleteConfirmation({visible: true, data: row.original});

  const tableColumns = useMemo(
    () => PARTICIPANT_COLUMNS(onDeleteHandle, onEditHandle),
    []
  );
  const tableData = useMemo(
    () => (isLoading ? [] : participantData),
    [participantData, isLoading]
  );
  const initialState = {hiddenColumns: ["id", "institution"]};

  return (
    <Container fluid className="px-md-4">
      <Row className="mt-md-2 mb-md-2">
        <Col md={{span: 4, offset: 4}}>
          <h1>Manage Participants</h1>
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
        {/* {showCreate && <CreateParticipant onClose={onCreateParticipantHandler}/>}
        {showUpdate.visible && (
          <UpdateParticipant
            participantData={showUpdate.data}
            onClose={onUpdateParticipantHandler}
          />
        )}
        {showDeleteConfirmation.visible && (
          <DeleteParticipant
            participantData={showDeleteConfirmation.data}
            onClose={onDeleteParticipantHandler.bind(
              null,
              showDeleteConfirmation.data.id,
              showDeleteConfirmation.data.name
            )}
          />
        )} */}
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

export default Participants;
