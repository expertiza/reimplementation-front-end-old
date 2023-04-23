import {Fragment} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditIcon, RemoveUserIcon} from "../UI/Icons";

export const INSTITUTIONS_COLUMNS = (handleDelete, handleEdit) => [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({row}) => (
      <Link to={`/users/${row.original.id}`}> {row.original.name}</Link>
    ),
  },
  {
    id: "actions",
    Header: "Actions",
    Cell: ({row}) => {
      return (
        <Fragment>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            <EditIcon/>
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-sm-2"
            onClick={() => handleDelete(row)}
          >
            <RemoveUserIcon/>
          </Button>
        </Fragment>
      );
    },
  },
];
