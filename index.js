const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB = "mongodb+srv://bycold:sabedra123@bycold.1ous9oq.mongodb.net/COMP3133_Assignment1?retryWrites=true&w=majority"
;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log("Mongodb connected");
    return server.listen({port: 5000});
})
.then((res) => {
    console.log(`server running at ${res.url}`)
})

