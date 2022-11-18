
import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"

//delete a student
const DELETE_STUDENT = gql`
    mutation DeleteStudent($studentId: String!){
        deleteStudent(id: $studentId){
        _id
        }
    }         
    
`;
function DeleteStudent(props)
{
    let navigate = useNavigate()
    let studentId;
    const [DeleteStudent, { data, loading, error }] = useMutation(DELETE_STUDENT);
    //
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <div className = 'entryform'>
            <h2>Delete Operation</h2>
            <form
                onSubmit={ (e) => {    
                    e.preventDefault();
                    DeleteStudent( { variables: {studentId: studentId.value } });

                    studentId.value = '';
                    navigate('/studentlist')
                     }
                }
            >
                <Form.Group>
                        <Form.Label> StudentId:</Form.Label>
                        <Form.Control type="text"  name="studentId" ref={node => {studentId = node; }} placeholder="Student Id:" />
                    </Form.Group>

                    <Button variant="primary" type="submit"> Delete Student </Button>
        
            </form>
        </div>

    );

}

export default DeleteStudent;
