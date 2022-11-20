import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"

//delete a student
const DELETE_COURSE = gql`
    mutation DeleteCourse($courseid: String!){
        deleteCourse(id: $courseid){
        _id
        }
    }         
    
`;
function DeleteCourse(props)
{
    let navigate = useNavigate()
    let courseid;
    const [DeleteCourse, { data, loading, error }] = useMutation(DELETE_COURSE);
    //
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <div className = 'entryform'>
            <h2>Delete Operation</h2>
            <form
                onSubmit={ (e) => {    
                    e.preventDefault();
                    DeleteCourse( { variables: {courseid: courseid.value } });

                    courseid.value = '';
                    navigate('/courselist')
                     }
                }
            >
                <Form.Group>
                        <Form.Label> CourseID:</Form.Label>
                        <Form.Control type="text"  name="courseid" ref={node => {courseid = node; }} 
                            placeholder="Course Id:" />
                    </Form.Group>

                    <Button variant="primary" type="submit"> Delete Course </Button>
        
            </form>
        </div>

    );

}

export default DeleteCourse;