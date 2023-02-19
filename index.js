const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB = process.env.MONGODB_URI;
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

