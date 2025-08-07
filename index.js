const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
   { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari" },
  { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 7, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 9, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
];

app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API!');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (book) {
    book.title = title;
    book.author = author;
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`📚 Book API server running at http://localhost:${port}`);
});
