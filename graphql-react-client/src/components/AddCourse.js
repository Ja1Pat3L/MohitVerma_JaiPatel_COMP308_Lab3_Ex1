import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"
//
//
const ADD_COURSE = gql`
    mutation AddCourse(
        $coursecode: String!,
        $coursename: String!,
        $section: String!,
        $semester: String!   
        ) {
        addCourse(
            coursecode: $coursecode,
            coursename: $coursename,
            section: $section,
            semester: $semester
            ) {
            _id
            
        }
    }
`;
//function component to add a student
const AddCourse = () => {
    //
    let navigate = useNavigate()
    //
    let coursecode, coursename, section, semester ;
    const [addCourse, { data, loading, error }] = useMutation(ADD_COURSE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className = 'entryform'>
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    addCourse( { variables: { coursecode: coursecode.value, coursename: coursename.value, 
                    section: section.value, semester: semester.value
                     } 
                    });
                    //
                    coursecode.value='';
                    coursename.value='';
                    section.value = '';
                    semester.value='';
                    
                    navigate('/courselist')                    } 
                }
            >

                    <Form.Group>
                        <Form.Label> Course Code:</Form.Label>
                        <Form.Control type="text"  name="coursecode" ref={node => {coursecode = node; }} 
                            placeholder="Course Code:" />
                    </Form.Group> 

                    <Form.Group>
                        <Form.Label> Course Name:</Form.Label>
                        <Form.Control type="text"  name="coursename" ref={node => {coursename = node; }} 
                            placeholder="coursename:" />
                    </Form.Group>   

                    <Form.Group>
                        <Form.Label> Section:</Form.Label>
                        <Form.Control type="text"  name="section" ref={node => {section = node; }} 
                            placeholder="section:" />
                    </Form.Group>                   
                    

                    <Form.Group>
                        <Form.Label> Semester:</Form.Label>
                        <Form.Control type="text" name="semester" ref={node => {semester = node; }} 
                            placeholder="semester:" />
                    </Form.Group> 
                                      

                    <Button variant="primary" type="submit"> Create Course </Button>

            </form>
        </div>
    );
}

export default AddCourse;
