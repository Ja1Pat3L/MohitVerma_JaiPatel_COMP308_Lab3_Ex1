var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var CourseModel = require('../models/Course');
//
// Create a GraphQL Object Type for course model
const courseType = new GraphQLObjectType({
    name: 'course',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
       coursecode: {
          type: GraphQLString
        },
        coursename: {
          type: GraphQLString
        },
        section: {
          type: GraphQLString
        },
        semester: {
          type: GraphQLString
        },
        
      }
    }
  });
  //
  // create a GraphQL query type that returns all courses or a course by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        courses: {
          type: new GraphQLList(courseType),
          resolve: function () {
            const courses = CourseModel.find().exec()
            if (!courses) {
              throw new Error('Error')
            }
            return courses
          }
        },
        course: {
          type: courseType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const courseInfo = CourseModel.findById(params.id).exec()
            if (!courseInfo) {
              throw new Error('Error')
            }
            return courseInfo
          }
        }
      }
    }
  });
  //
  // add mutations for CRUD operations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addcourse: {
          type: courseType,
          args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
              },
            coursecode: {
                type: new GraphQLNonNull(GraphQLString)
              },
              coursename: {
                type: new GraphQLNonNull(GraphQLString)
              },
              section: {
                type: new GraphQLNonNull(GraphQLString)
              },
              semester: {
                type: new GraphQLNonNull(GraphQLString)
              },
          },
          resolve: function (root, params) {
            const courseModel = new CourseModel(params);
            const newcourse = courseModel.save();
            if (!newcourse) {
              throw new Error('Error');
            }
            return newcourse
          }
        },
        updateCourse: {
          type: courseType,
          args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
              },
            coursecode: {
                type: new GraphQLNonNull(GraphQLString)
              },
              coursename: {
                type: new GraphQLNonNull(GraphQLString)
              },
              section: {
                type: new GraphQLNonNull(GraphQLString)
              },
              semester: {
                type: new GraphQLNonNull(GraphQLString)
              },
            
          },
          resolve(root, params) {
            return CourseModel.findByIdAndUpdate(params.id, {  coursecode: params. coursecode, 
                coursename: params.coursename, section: params.section,   semester: params.  semester, 
             
               }, function (err) {
              if (err) return next(err);
            });
          }
        },
        deleteCourse: {
          type: courseType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const deletedCourse = CourseModel.findByIdAndRemove(params.id).exec();
            if (!deletedCourse) {
              throw new Error('Error')
            }
            return deletedCourse;
          }
        }
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  