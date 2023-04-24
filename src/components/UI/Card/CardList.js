import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card';
import CardHeader from './CardHeader';

const CardList = ({ courses, columnKeys }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort courses by name in ascending or descending order
  let sortedCourses = [...courses];

  // Filter courses by search term
  const [sortColumn, setSortColumn] = useState(null);

  const handleSortClick = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"));

    } else {
      setSortColumn(columnKey);
      setSortOrder("asc");
    }
  };


  if (sortColumn) {
    sortedCourses.sort((a, b) => {
      let comparison = a[sortColumn].localeCompare(b[sortColumn]);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }
  const filteredCourses = sortedCourses.filter((course) => {
    const values = Object.values(course);
    return values.some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="course-list p-3">
      <div className="sort-controls">

        <label htmlFor="search-term">Search:</label>
        <input
          id="search-term"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br></br>
      <CardHeader columnKeys={columnKeys} onSortClick={handleSortClick} />

      {filteredCourses.map((course) => (
        <Card key={course.courseId} course={course} />
      ))}
    </div>
  );
};

export default CardList;