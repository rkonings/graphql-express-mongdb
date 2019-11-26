import { AuthenticationError } from 'apollo-server-express';
import { Resolvers, Post, Author, User } from './@types/graphql-resolvers';
import Users from './Models/Users';
import Clients from './Models/Clients';
import auth from './Auth';
import bcrypt from 'bcrypt';
import faker from 'faker/locale/nl';

const authors: Author[] = [
    { id: 'FOOBAR', name: 'FOOBAR' },
    { id: 'FOO', name: 'FOO' }
];

const posts: Post[] = [
    { id: 'FOO', title: 'Post 1', author: authors[0] },
    { id: 'BAR', title: 'Post 2', author: authors[1] },
    { id: 'BAR', title: 'Post 2', author: authors[1] }
];

const ClientTypes = [
    'Klant',
    'Prospect',
    'Lead',
    'Suspect'
];

const Cities = [
    'Utrecht',
    'Nieuwegein',
    'Eindhoven',
    'Ijsselstein',
    'Amsterdam',
    'Hellendoorn',
    'Hilversum',
    'Breda',
    'Bilthoven',
    'Amersfoort'
];


export const resolvers: Resolvers = {
    Mutation: {
        addClient: async (_, obj, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const client = await Clients.create({...obj,user: _id});
            return client;
        },
        login: async (_, {email, password}) => {
            const token = await auth(email, password, 'secret!');
            return {token};
        },
        signup: async (_, {email, password}) => {
            const cryptedPassword = await bcrypt.hash(password, 10);
            const user = await Users.create({email, password: cryptedPassword});
            console.log(user);
            return user;
        },
        seedClients: async (_, {amount}, {_id}) => {

            const data = [];
            for(let i = 0; i < amount; i++) {
                data.push({
                    name: faker.company.companyName(),
                    address: faker.address.streetAddress(),
                    zipcode: faker.address.zipCode(),
                    city: Cities[Math.floor(Math.random() * Cities.length)],
                    telephone: faker.phone.phoneNumber(),
                    user: _id,
                    type: ClientTypes[Math.floor(Math.random() * ClientTypes.length)]
                });
            }

            const clients = await Clients.insertMany(data);
            return clients;
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
        clients: async (_, __, {_id}, ___) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const clients = await Clients.find({user: _id}).exec();
            return clients.map((client) => {return { data: client }});
        }
    },
    Author: {
        posts: () => {
            return posts;
        }
        
    }
};