const express = require('express');
const {ApolloServer}= require('@apollo/server');
const {expressMiddleware}= require('@apollo/server/express4');
const bodyParser= require('body-parser');
const cors= require('cors');

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
                getTodos: () => {
                    return [
                        {id: 1, title: "Todo 1", completed: false},
                        {id: 2, title: "Todo 2", completed: true},
                        {id: 3, title: "Todo 3", completed: false},
                    ];
                }
            }
        
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