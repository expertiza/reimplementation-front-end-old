import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "Assignment 1",
        course: {
          name: "Course 1",
        },
        institution: "Institution 1",
        createdate: "2021-01-01",
        updatedate: "2021-01-01",
      },
      {
        id: 2,
        name: "Assignment 2",
        course: {
          name: "Course 2",
        },
        institution: "Institution 2",
        createdate: "2021-01-01",
        updatedate: "2021-01-01",
      },
      {
        id: 3,
        name: "Assignment 3",
        course: {
          name: "Course 3",
        },
        institution: "Institution 3",
        createdate: "2021-01-01",
        updatedate: "2021-01-01",
      },
    ];
    setAssignments(dummyData);
  }, []);

  function handleClick(id) {}

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Assignments</th>
          <th>Course</th>
          <th>Institution</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment.id} onClick={() => handleClick(assignment.id)}>
            <td>{assignment.name}</td>
            <td>{assignment.course.name}</td>
            <td>{assignment.institution}</td>
            <td>{assignment.createdate}</td>
            <td>{assignment.updatedate}</td>
            <td>
              <Link to="new"> Add </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Assignments;
