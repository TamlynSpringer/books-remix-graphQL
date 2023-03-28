import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { read, write } from '../../utils/readWrite';

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  input BookInput {
    title: String
    author: String
  }

  type Mutation {
    addBook(book: BookInput): [Book]!
  }
`;

export const resolvers = {
  Query: {
    books: () => {
      const books = read();
      return books;
    },
  },
  Mutation: {
    addBook: (parent: any, { book }: any) => {
      console.log({ book });
      let books = write(book);
      return books;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphQLClient = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new SchemaLink({ schema }),
});
