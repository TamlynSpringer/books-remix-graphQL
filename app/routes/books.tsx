import { LoaderFunction, json } from "@remix-run/node";
import { gql } from "@apollo/client";
import { graphQLClient } from "~/lib/apollo";
import { Outlet, useLoaderData } from "@remix-run/react";

const query = gql`
  query GetBooks {
    books {
      title
      author
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data } = await graphQLClient.query({
    query,
  });
  return json({ books: data.books });
};

export default function Books() {
  const { books } = useLoaderData();
  return (
    <main>
      <Outlet />
      <section>
        <h1>All books</h1>
        <ul>
          {books.map(({ title, author }: { title: string; author: string }, index: number) => (
            <li key={index}>
              <h3>{title}</h3>
              <p>{author}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
};