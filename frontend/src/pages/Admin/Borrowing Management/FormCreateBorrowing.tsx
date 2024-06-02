import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import formatDate from '../../../utils/format';
import { Member } from '../../../models/member.model';
import { BookDetail } from '../../../models/bookDetail.model';

const FormCreateBorrowing = () => {
  const [borrowing, setBorrowing] = useState({
    member: [],
    book_detail: [],
    admin: [],
  });
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedBookDetail, setSelectedBookDetail] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState({
    borrow_date: new Date(),
    return_date: '',
    status: 'borrowed',
  });

  const [userData, setUserData] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId: number = user ? user.id : 0;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/admin/${userId}`
        );
        if (response.status === 200) {
          setUserData(response.data.payload);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberResponse, bookDetailResponse, adminResponse] =
          await Promise.all([
            axios.get('http://localhost:3000/api/member'),
            axios.get('http://localhost:3000/api/book-detail'),
            axios.get('http://localhost:3000/api/admin'),
          ]);

        if (
          memberResponse.status === 200 &&
          bookDetailResponse.status === 200 &&
          adminResponse.status === 200
        ) {
          setBorrowing({
            member: memberResponse.data.payload,
            book_detail: bookDetailResponse.data.payload,
            admin: adminResponse.data.payload,
          });
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handleMemberSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(e.target.value);
  };

  const handleBookDetailSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBookDetail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = formatDate(inputValue.borrow_date);

    const data = {
      ...inputValue,
      published_date: formattedDate,
      members_id: selectedMember,
      books_detail_id: selectedBookDetail,
      admins_id: userData.id,
    };

    if (!data.published_date) {
      return setError('Please select a valid date.');
    } else if (!data.members_id) {
      return setError('Please select a member.');
    } else if (!data.books_detail_id) {
      return setError('Please select a book.');
    } else if (!data.admins_id) {
      return setError('Please select an admin.');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/borrowing/create',
        data
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/borrowing-management');
      } else {
        setError('An error occurred while creating the borrowing.');
      }
    } catch (error) {
      setError('An error occurred while creating the borrowing.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Borrowing" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Borrowing
              </h3>
            </div>
            <form
              id="form-upload"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="p-6">
                {/* Select Member */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="members_id"
                    >
                      Select Member
                    </label>
                    <select
                      name="members_id"
                      id="members_id"
                      value={selectedMember}
                      onChange={handleMemberSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Member</option>
                      {borrowing.member.map((member: Member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Select Book */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="books_detail_id"
                    >
                      Select Book
                    </label>
                    <select
                      name="books_detail_id"
                      id="books_detail_id"
                      value={selectedBookDetail}
                      onChange={handleBookDetailSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Member</option>
                      {borrowing.book_detail.map(
                        (book_detail: BookDetail) => (
                          <option
                            key={book_detail.id}
                            value={book_detail.id}
                          >
                            {book_detail.title} by {book_detail.author},
                            ISBN: {book_detail.isbn}
                          </option>
                        )
                      )}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/borrowing-management"
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

export default FormCreateBorrowing;
