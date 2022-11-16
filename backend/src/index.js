const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs, mocks: true });

server.listen().then(() => {
    const port = 4000;
    console.log(`
            Listening on port ${port}
            http://localhost:${port}
        `);
});
