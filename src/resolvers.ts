import { AuthenticationError, UserInputError } from 'apollo-server-express';
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

interface ClientFilter {
    type?: Array<null|string> | null;
    city?: Array<null|string> | null;
    user: string;
}

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const resolvers: Resolvers = {
    Mutation: {
        addClient: async (_, {client}, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const result = await Clients.create({...client,user: _id});
            return result;
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
        updateUser: async (_, {user}, {_id}) => {
            const result = await Users.findById(_id);
            if (result){
                result.set(user);
                result.save();
            }
            return result;
        },
        updateClient: async (_, {client}, {_id}) => {
            if(!client) {
                throw new UserInputError('No client data');
            }
            if(!client._id) {
                throw new UserInputError('No client._id');
            }
            const result = await Clients.findById(client._id);
            if (result){
                result.set(client);
                result.save();
            }
            return result;
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
        user: async (_, __, {_id}) => {
            // await delay(5000);
            return Users.findById(_id).exec();
        },
        client: async (_, {_id}, {_id: user}) => {
            console.log(_id);
            return Clients.findOne({_id, user}).exec();
        },
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
        clients: async (_, {type, city}, {_id}, ___) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const filter: ClientFilter = {
                user: _id,
            };

            if (type) {
                filter.type = type;
            }

            if (city) {
                filter.city = city;
            }

            const clients = await Clients.find(filter).exec();
            return clients;
            // return clients.map((client) => {return { data: client }});
        }
    },
    Author: {
        posts: () => {
            return posts;
        }
        
    }
};