import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList  from "./CardList";

  const Card = ({ course,actions }) => {
    const [showAssignments, setShowAssignments] = useState(false);
    const keys = Object.keys(course).filter(key => key !== 'assignments' && !key.includes("Id"));
    const columnKeys = [
      { key: "assignmentName", label: "Assignment Name" },
      { key: "institution", label: "Institution" },
      { key: "createDate", label: "Created Date" },
      { key: "updateDate", label: "Updated Date" },
      { key: "", label: "Actions" }
    ];

    const actionsAssign = [
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/add-assignment-24.png`,
        alt: 'Add Assignment'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/add-participant-24.png`,
        alt: 'Add Participant'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/add-ta-24.png`,
        alt: 'Add TA'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/Copy-icon-24.png`,
        alt: 'Copy'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/delete-icon-24.png`,
        alt: 'Delete'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/edit-icon-24.png`,
        alt: 'Edit'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/create-teams-24.png`,
        alt: 'Create Teams'
      },
      {
        src: `${process.env.PUBLIC_URL}/assets/actions/360-dashboard-24.png`,
        alt: 'Dashboard'
      }
    ];

    function handleClick(event) {
      event.stopPropagation();
    
    }
  
    const toggleAssignments = (assignments) => {
      
        if(!assignments)
        {
         
        }
        else{
        setShowAssignments(!showAssignments);
        
        }
    };
    if (!course) {
        return null; // Or some other fallback component
      }
  
    return (
      
        <div style={{ marginBottom: "5px" }}>
        <div className="card-component p-2 card"
           onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f2f2f2"}
           onMouseOut={(e) => e.currentTarget.style.backgroundColor = ""}>
            
          <div className="card-body row" onClick={() => toggleAssignments(course.assignments)} >
          {keys.map((key, index) => (
        <div key={index} className="card-text col" style={{ wordWrap: 'break-word', borderRight: '1px solid black' }}>
          {course[key]}
        </div>
      ))}
      <div className="card-text col" style={{ wordWrap: 'break-word' }}>
      {actions.map((action, index) => (
        <img key={index} src={action.src} alt={action.alt} />
      ))}
          </div>

          {showAssignments && 
           <div onClick={handleClick}>
        <CardList  courses={course.assignments} columnKeys={columnKeys} actions={actionsAssign} />
        </div>

        


       
    }

        </div>
        </div>
        </div>
        
    );
  };

  export default Card;
