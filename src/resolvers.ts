import { Resolvers, Post, Author } from './@types/graphql-resolvers';

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
    Query: {
        posts: () => {
            return posts;
        },
        authors: () => {
            return authors;
        }
    },
    Author: {
        posts: () => {
            return posts;
        }
        
    }
};