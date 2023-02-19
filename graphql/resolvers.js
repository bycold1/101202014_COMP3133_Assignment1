const User = require('../model/user');
const Employee = require('../model/employee');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }
    
      return user;
    },
    employees: () => Employee.find(),
    employees: () => Employee.find(),
    employee: async (_, { eid }) => {
      const employee = await Employee.findById(eid);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    },
    employees: async () => {
  const employees = await Employee.find();
  return employees;
}
  
},
  Mutation: {
    createUser: async (parent, { userName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  
      const user = new User({ userName, email, password: hashedPassword });
      const savedUser = await user.save();
  
      if (!savedUser) {
        throw new Error('Failed to create user');
      }
  
      return savedUser;
    },
    addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
        const employee = new Employee({ first_name, last_name, email, gender, salary });
        const savedEmployee = await employee.save();
        if (!savedEmployee) {
          throw new Error('Failed to add employee');
        }
        return savedEmployee;
      },
      updateEmployee: async (_, { eid, first_name, last_name, email, gender, salary }) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          eid,
          { first_name, last_name, email, gender, salary },
          { new: true }
        );
        if (!updatedEmployee) {
          throw new Error('Failed to update employee');
        }
        return updatedEmployee;
      },
      deleteEmployee: async (_, { eid }) => {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
          throw new Error('Failed to delete employee');
        }
        return deletedEmployee;
      }
    },
  Employee: {
    eid: (parent) => parent._id,
    first_name: (parent) => parent.first_name,
    last_name: (parent) => parent.last_name,
    email: (parent) => parent.email,
    gender: (parent) => parent.gender,
    salary: (parent) => parent.salary,
    
  },
};

module.exports = resolvers;
