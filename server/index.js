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
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }

            type Query {
                getTodos: [Todo]
            }
        `,
        resolvers:{
            Query: {
                getTodos: async () => 
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
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