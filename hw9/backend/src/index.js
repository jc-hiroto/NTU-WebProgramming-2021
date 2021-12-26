import { GraphQLServer, PubSub } from 'graphql-yoga';
import { Query, Mutation, Subscription, ChatBox, Message, User } from './resolvers/';
import mongo from './mongo';
import * as db from './models';

mongo();
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message,
    User,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});