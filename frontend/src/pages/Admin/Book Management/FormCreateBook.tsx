import { useState, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import { BookDetail } from '../../../models/bookDetail.model';

const FormCreateBook = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<BookDetail>({
    books_id: '',
    authors_id: '',
    publishers_id: '',
    published_date: new Date(),
    isbn: '',
    stocks_id: '',
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.books_id === '') {
      return setError('Book is required.');
    } else if (inputValue.authors_id === '') {
      return setError('Author is required.');
    } else if (inputValue.publishers_id === '') {
      return setError('Publisher is required.');
    } else if (inputValue.published_date === new Date()) {
      return setError('Published date is required.');
    } else if (inputValue.isbn === '') {
      return setError('ISBN is required.');
    } else if (inputValue.stocks_id === '') {
      return setError('Stock is required.');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/book-detail/create',
        inputValue
      );

      if (response.status === 201) {
        setError(null);
        setInputValue({
          books_id: '',
          authors_id: '',
          publishers_id: '',
          published_date: new Date(),
          isbn: '',
          stocks_id: '',
        });
        return navigate('/admin/book-detail-management');
      } else {
        setError('An error occurred while creating the category.');
      }
    } catch (error) {
      setError('An error occurred while creating the category.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Job Vacancy" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Book Detail
              </h3>
            </div>
            <form
              id="form-upload"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="p-6">
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="book_id"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="book_id"
                      name="book_id"
                      value={inputValue.books_id}
                      onChange={handleInput}
                      placeholder="Choose Book"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/book-management"
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

export default FormCreateBook;
