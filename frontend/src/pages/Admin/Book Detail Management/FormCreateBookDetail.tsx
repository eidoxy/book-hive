import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import formatDate from '../../../utils/format';

const FormCreateDetailBook = () => {
  const [bookDetail, setBookDetail] = useState({
    authors: [],
    publishers: [],
    books: [],
  });
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedStock, setSelectedStock] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState({
    published_date: new Date(),
    isbn: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsResponse, publishersResponse, booksResponse] =
          await Promise.all([
            axios.get('http://localhost:3000/api/author'),
            axios.get('http://localhost:3000/api/publisher'),
            axios.get('http://localhost:3000/api/book'),
          ]);

        setBookDetail({
          authors: authorsResponse.data.payload || [],
          publishers: publishersResponse.data.payload || [],
          books: booksResponse.data.payload || [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBookSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBook(e.target.value);
  };

  const handleAuthorSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(e.target.value);
  };

  const handlePublisherSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPublisher(e.target.value);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = formatDate(inputValue.published_date);

    const data = {
      ...inputValue,
      books_id: selectedBook,
      authors_id: selectedAuthor,
      publishers_id: selectedPublisher,
      published_date: formattedDate,
    };

    if (data.books_id === '') {
      return setError('Book is required.');
    } else if (data.authors_id === '') {
      return setError('Author is required.');
    } else if (data.publishers_id === '') {
      return setError('Publisher is required.');
    } else if (data.published_date.toString() === '') {
      return setError('Published Date is required.');
    } else if (data.isbn === '') {
      return setError('ISBN is required.');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/book-detail/create',
        data
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/book-detail-management');
      } else {
        setError('An error occurred while creating the book detail.');
      }
    } catch (error) {
      setError('An error occurred while creating the book detail.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Book Detail" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Card
              </h3>
            </div>
            <form
              id="form-upload"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="p-6">
                {/* Select Book */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="book_id"
                    >
                      Select Book
                    </label>
                    <select
                      name="book_id"
                      id="book_id"
                      value={selectedBook}
                      onChange={handleBookSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Book</option>
                      {bookDetail.books.map((book: any) => (
                        <option key={book.id} value={book.id}>
                          {book.title}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Select Author */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="author_id"
                    >
                      Select Author
                    </label>
                    <select
                      name="author_id"
                      id="author_id"
                      value={selectedAuthor}
                      onChange={handleAuthorSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Author</option>
                      {bookDetail.authors.map((author: any) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Select Publisher */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="publisher_id"
                    >
                      Select Publisher
                    </label>
                    <select
                      name="publisher_id"
                      id="publisher_id"
                      value={selectedPublisher}
                      onChange={handlePublisherSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Publisher</option>
                      {bookDetail.publishers.map((publisher: any) => (
                        <option key={publisher.id} value={publisher.id}>
                          {publisher.name}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Published Date */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="published_date"
                    >
                      Published Date
                    </label>
                    <input
                      type="date"
                      id="published_date"
                      name="published_date"
                      value={
                        inputValue.published_date
                          .toISOString()
                          .split('T')[0]
                      }
                      onChange={handleInput}
                      placeholder="Published Date"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* ISBN */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="isbn"
                    >
                      ISBN
                    </label>
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      value={inputValue.isbn}
                      onChange={handleInput}
                      placeholder="ISBN"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/book-detail-management"
                    className="flex w-1/2 justify-center rounded text-danger border transition hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium"
                  >
                    Cancel
                  </NavLink>
                  <button
                    type="submit"
                    className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-white transition hover:bg-dark-blue"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCreateDetailBook;
