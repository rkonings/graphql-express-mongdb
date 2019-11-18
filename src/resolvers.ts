import { AuthenticationError } from 'apollo-server-express';
import { Resolvers, Post, Author, User } from './@types/graphql-resolvers';
import Users from './Models/Users';
import Clients from './Models/Clients';

const authors: Author[] = [
    { id: 'FOOBAR', name: 'FOOBAR' },
    { id: 'FOO', name: 'FOO' }
];

const posts: Post[] = [
    { id: 'FOO', title: 'Post 1', author: authors[0] },
    { id: 'BAR', title: 'Post 2', author: authors[1] },
    { id: 'BAR', title: 'Post 2', author: authors[1] }
];


export const resolvers: Resolvers = {
    Mutation: {
        addClient: async (_, obj, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const client = await Clients.create({...obj,user: _id});
            return client;
        } 
    },
    Query: {
        posts: () => {
            return posts;
        },
        authors: () => {
            return authors;
        },
        users: async () => {
            const users = await Users.find({}).exec();
            return users;
        },
        clients: async (obj, args, {_id}, info) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const clients = await Clients.find({user: _id}).exec();
            return clients;
        }
    },
    Author: {
        posts: () => {
            return posts;
        }
        
    }
};