import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const CardHeader = ({ columnKeys, onSortClick }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSortClick = (column) => {
    if (column === '') {

    }
    else {
      if (onSortClick) {
        onSortClick(column);
      }
      if (sortColumn === column) {
        // If the same column is clicked twice, toggle the sort direction
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        // Otherwise, sort by the new column in ascending order
        setSortColumn(column);
        setSortDirection("asc");
      }
    }
  };

  return (
    <div className="card-component card pointer" style={{ overflow: "hidden" }}>

      <div className="card-header row">
        {columnKeys.map((column) => (
          <div
            key={column.key}
            className="col"
            onClick={() => handleSortClick(column.key)}
          >
            <strong>{column.label}</strong>
            {sortColumn === column.key && (
              <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default CardHeader;