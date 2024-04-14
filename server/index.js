const express = require('express');
const {ApolloServer}= require('@apollo/server');
const {expressMiddleware}= require('@apollo/server/express4');
const bodyParser= require('body-parser');
const cors= require('cors');
const {default: axios}= require('axios');
async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs:  `

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String
                website: String!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,
        resolvers:{
            Query: {
                getTodos: async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () =>
                    (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, {id}) =>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
        },
    });

    app.use(cors());
    app.use(bodyParser.json());

    await server.start();

    app.use(  "/graphql" , expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

startApolloServer();