import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server-express';
import { Resolvers, Post, Author, Activity, Client, SortDirectionInput } from './@types/graphql-resolvers';
import Users from './Models/Users';
import Clients from './Models/Clients';
import Activities from './Models/Activity'
import Time from './Models/Time';
import auth from './Auth';
import bcrypt from 'bcrypt';
import faker from 'faker/locale/nl';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

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

const ActivitiesTypes = ['task', 'call'];

const dummpyClient = async (userId: string) => {
    const client = new Clients({
        name: faker.company.companyName(),
        address: faker.address.streetAddress(true),
        zipcode: faker.address.zipCode(),
        city: Cities[Math.floor(Math.random() * Cities.length)],
        telephone: faker.phone.phoneNumber(),
        user: userId,
        type: ClientTypes[Math.floor(Math.random() * ClientTypes.length)]
    });

    const clientResult = await client.save();

    const activities: Activity[] = [];

    for(let i = 0; i < faker.random.number({min:1, max: 15}); i++) {
        const activitiy = new Activities({
            user: userId,
            client: clientResult,
            type: ActivitiesTypes[Math.floor(Math.random() * ActivitiesTypes.length)]
        });
        activitiy.notes = faker.lorem.lines(faker.random.number({min:1, max: 10}));
        activitiy.title = faker.lorem.words(faker.random.number({min: 2, max: 6}));
        activitiy.creationDate = faker.date.between('2019-01-01', '2019-12-31');
        await activitiy.save();
        activities.push(activitiy)
    }
    
    clientResult.activities = activities;
    await clientResult.save();
    return clientResult;
}

interface ClientFilter {
    type?: Array<null|string> | null;
    city?: Array<null|string> | null;
    user: string;
}

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const resolvers: Resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        serialize(value) {
        //   return value.getTime(); // value sent to the client
            return new Date(value);
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return new Date(ast.value) // ast value is always in string format
          } else if(ast.kind === Kind.STRING) {
            return new Date(ast.value) // ast value is always in string format
          }
          return null;
        },
      }),
    Mutation: {
        addClient: async (_, {client}, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            const result = await Clients.create({...client,user: _id});
            return result;
        },
        deleteClient: async (_, {_id}, {_id: userId}) => {
            if (!userId) throw new AuthenticationError('you must be logged in'); 
            if(!_id) throw new UserInputError('no client id'); 
            const client = await Clients.findOneAndDelete({_id, user: userId}).exec();
            if(!client){
                throw new ApolloError('client not found and deleted');
            } 
            return client;
        },
        addActivity: async (_, {activity: data}, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            if(!data || !data.client) throw new UserInputError('no client id'); 
            const client = await Clients.findById(data.client);
            if(!client)throw new UserInputError('no client found'); 
            
            const activity = new Activities({...data,user: _id});
            client.activities?.push(activity);
            await activity.save();
            await client.save();
        
            return activity;
        },
        time: async (_, {time}, {_id}) => {
            if (!_id) throw new AuthenticationError('you must be logged in'); 
            if(!time.client) throw new UserInputError('No client id found');
            
            const client = await Clients.findOne({_id: time.client, user: _id});
            if(!client) throw new UserInputError('No client found');
            
            const result = await Time.create({...time,user: _id});
            return result
        },
        updateActivity: async (_, {activity}, {_id}) => {
            if(activity && !activity._id) throw new UserInputError('No _id fount'); 

            const result = await Activities.findOne({_id: activity?._id, user: _id});
            if (result){
                result.set(activity);
                result.save();
            }
            return result;
        },
        login: async (_, {email, password}) => {
            const token = await auth(email, password, 'secret!');
            return {token};
        },
        signup: async (_, {email, password, firstName, lastName}) => {
            const cryptedPassword = await bcrypt.hash(password, 10);
            const settings = {
                language: 'nl',
                dateFormat: 'nl',
                pushNotifications: true,
                unscribeEmailLink: true,
                signature: 'A really long signature to end the message with a good vibe'
            }
            const user = await Users.create({email, password: cryptedPassword, firstName, lastName, settings});
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

            const result: Client[] = [];
            for(let i = 0; i < amount; i++) {
                const client = await dummpyClient(_id);
                result.push(client);
            }

            return result;
        }
    },
    Query: {
        time: async (_, {client}, {_id: user}) => {
            if (!user) throw new AuthenticationError('you must be logged in'); 
            const time = await Time.find({client, user}).exec();
            if(!time) throw new ApolloError('No client found');
            return time;
        },
        filter: async (_, {types}, {_id}) => {

            const filters = [];
            for(let i = 0; i < types.length; i++) {
                if(types[i]) {
                    const filterValues = await Clients.distinct(types[i], {user: _id});
                    const options = filterValues.map((option): {value: string, label: string} => {
                        return {
                            value: option,
                            label: option
                        }
                    });
                    const filter = {
                        id: types[i],
                        label: types[i],
                        options
                    }
                    filters.push(filter);
                }
            }

            return filters;
        },
        user: async (_, __, {_id}) => {
            // await delay(5000);
            const user = await Users.findById(_id).exec();
            if(!user) throw new ApolloError('No user found');
            return user;
        },
        client: async (_, {_id}, {_id: user}) => {
            if (!user) throw new AuthenticationError('you must be logged in'); 
            const client = await Clients.findOne({user, _id}).populate({path: 'activities', options: { sort: {creationDate: -1} }}).exec();
            if(!client) throw new ApolloError('No client found');
            return client;
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
        clients: async (_, {type, city, sort}, {_id}, ___) => {
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
            if(!sort) {
                sort = {field: 'name', direction: SortDirectionInput.Asc};
            }
            return await Clients.find(filter).sort({[sort.field]:sort.direction}).exec();
            // return clients.map((client) => {return { data: client }});
        }
    },
    Author: {
        posts: () => {
            return posts;
        }
        
    }
};