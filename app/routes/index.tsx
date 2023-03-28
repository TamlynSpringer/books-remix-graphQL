import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

// type definitions
type Book = {
  title: string;
  genre: string;
};
type Books = Array<Book>;
type LoaderData = {
  books: Books;
};

// Loader function
export const loader = async () => {
  return json<LoaderData>({
    books: [
      {
        title: 'Harry Potter and the Deathly Hallows',
        genre: "Children's Fiction",
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        genre: "Children's Fiction",
      },
    ],
  });
};

// Action function
export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  return json({ name });
}

export default function Index() {
  const { books } = useLoaderData() as LoaderData;
  const data = useActionData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", backgroundColor: "#08080a", color: "#fff", height: "100vh" }}>
      <h1>Welcome to Remix {data ? data.name : 'Stranger'}</h1>
      <h3>Go to /books/addbook to see all books and add new books</h3>

      <ul>
        {books.map(({ title, genre }, i) => {
          return (
            <li key={i}>
              <h3> {title} </h3>
              <p> {genre} </p>
            </li>
          )
        })}
      </ul>

      <Form method='post'>
        <div>
          <label htmlFor='name'>
            Name 
            <input id='name' name='name' type='text' />
          </label>
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </div>
  );
}
