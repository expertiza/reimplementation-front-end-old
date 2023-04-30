import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from '../UI/Card/CardList';


const Courses = () => {

  const columnKeys = [
    { key: "courseName", label: "Course Name" },
    { key: "institution", label: "Institution" },
    { key: "createDate", label: "Created Date" },
    { key: "updateDate", label: "Updated Date" },
    { key: "", label: "Actions" }
  ];
    const dummyData = [
        {
          "courseId": 1,
          "courseName": "Computer Science 101",
          "institution": "Harvard University",
          "createDate": "2022-01-01",
          "updateDate": "2022-02-01",
          "assignments": [
            {
              "assignmentName": "Project 1",
              "institution": "Harvard University",
              "createDate": "2022-01-15",
              "updateDate": "2022-02-01"
            },
            {
              "assignmentName": "Quiz 1",
              "institution": "Harvard University",
              "createDate": "2022-01-30",
              "updateDate": "2022-02-01"
            }
          ]
        },
        {
          "courseId": 2,
          "courseName": "Mathematics 101",
          "institution": "Massachusetts Institute of Technology",
          "createDate": "2022-02-15",
          "updateDate": "2022-03-01",
          "assignments": [
            {
              "assignmentName": "Problem Set 1",
              "institution": "Massachusetts Institute of Technology",
              "createDate": "2022-02-25",
              "updateDate": "2022-03-01"
            },
            {
              "assignmentName": "Midterm Exam",
              "institution": "Massachusetts Institute of Technology",
              "createDate": "2022-03-01",
              "updateDate": "2022-03-10"
            }
          ]
        },
        {
          "courseId": 3,
          "courseName": "English 101",
          "institution": "Stanford University",
          "createDate": "2022-03-15",
          "updateDate": "2022-04-01",
          "assignments": [
            {
              "assignmentName": "Essay 1",
              "institution": "Stanford University",
              "createDate": "2022-03-20",
              "updateDate": "2022-04-01"
            },
            {
              "assignmentName": "Presentation",
              "institution": "Stanford University",
              "createDate": "2022-03-30",
              "updateDate": "2022-04-01"
            }
          ]
        },
        {
          "courseId": 4,
          "courseName": "History 101",
          "institution": "Yale University",
          "createDate": "2022-04-15",
          "updateDate": "2022-05-01",
          "assignments": [
            {
              "assignmentName": "Research Paper",
              "institution": "Yale University",
              "createDate": "2022-04-20",
              "updateDate": "2022-05-01"
            },
            {
              "assignmentName": "Exam 1",
              "institution": "Yale University",
              "createDate": "2022-04-30",
              "updateDate": "2022-05-01"
            }
          ]
        }
        ];

        const actions = [
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
    
      return (
        <div>
          <h1>Courses</h1>
          <CardList courses={dummyData} columnKeys={columnKeys} actions={actions}/>
        </div>
      );
    };

export default Courses;