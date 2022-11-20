import React from 'react';
import {gql, useQuery} from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_COURSES = gql`
{
    courses{
        _id
      coursecode
      coursename
      section
      semester
      
    }
}
`;
//
const CourseList = () => {

    const { loading, error, data , refetch } = useQuery(GET_COURSES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>_id</th>
                        <th>course code</th>
                        <th>course name</th>
                        <th>section</th>
                        <th>semester</th>

                </tr>
                {data.courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course._id}</td>
                            <td>{course.coursecode}</td>
                            <td>{course.coursename}</td>
                            <td>{course.section}</td>
                            <td>{course.semester}</td>
                        </tr>
                ))}
             </tbody>
            </Table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default CourseList

