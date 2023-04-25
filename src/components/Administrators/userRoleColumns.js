import {Fragment} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditIcon, RemoveUserIcon} from "../UI/Icons";

export const USER_ROLE_COLUMNS = () => [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Username",
    accessor: "name",
    Cell: ({row}) => (
      <Link to={`/users/${row.original.id}`}> {row.original.name}</Link>
    ),
  },
  {
    Header: "Full Name",
    accessor: "fullname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  
  {
    id: "institution",
    Header: "Institution",
    accessor: (d) => d.institution.name,
    disableFilters: true,
  }
];
