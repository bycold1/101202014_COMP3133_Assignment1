const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
  }

  type Employee {
    eid: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    employees: [Employee]
    employee(eid: ID!): Employee
    login(email: String!, password: String!): User!
  }

  type Mutation {
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee
    updateEmployee(
      eid: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      salary: Float
    ): Employee
    deleteEmployee(eid: ID!): Employee
    createUser(userName: String!, email: String!, password: String!): User!
  }
`;