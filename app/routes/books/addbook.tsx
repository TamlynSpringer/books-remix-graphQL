import { gql } from "@apollo/client";
import { ActionFunction, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { graphQLClient } from "~/lib/apollo";
import '../../index.css'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const author = formData.get('author');

  let book = {
    title,
    author
  };

  const mutation = gql`
  mutation ($book: BookInput) {
    addBook(book: $book) {
      title
    }
  }
`;

  const { data } = await graphQLClient.mutate({
    mutation,
    variables: { book },
  });

  return json({ books: data.books });
};

export default function AddBook() {
  return (
    <section className="container mx-auto my-10 md:w-1/3 p-5 border-2 border-blue-900 rounded-xl">
      <h2 className="text-center text-3xl text-blue-900 p-3 font-bold">Add a new book</h2>
      <Form method="post" className="space-y-10">
        <div className="form-control">
          <label htmlFor="title" className="text-lg px-5">Title</label>
          <input id="title" name="title" type="text" className="border border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-700 rounded-lg" />
        </div>
        <div className="form-control">
          <label htmlFor="author" className="text-lg px-5">Author</label>
          <input id="author" name="author" type="text" className="border border-gray-700 px-4 py-3 focus:outline-none focus:border-blue-700 rounded-lg" />
        </div>
        <button type="submit" className="focus:outline-none mt-5 bg-blue-900 px-4 py-3 text-white align-middle text-lg rounded-xl mx-auto">Submit</button>
      </Form>
    </section>
  )
}