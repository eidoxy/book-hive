import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../common/Loader';
import { Borrowing } from '../../models/borrowing.model';
import formatDate from '../../utils/formatDate';

const MemberBorrowing = () => {
  const [borrowingData, setBorrowingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId: number = user.id ? user.id : 0;

  useEffect(() => {
    const fetchBorrowingData = async () => {
      try {
        console.log('Fetching borrowing data...');
        const response = await axios.get(
          `http://localhost:3000/api/borrowing/member/${userId}`
        );

        console.log('Response:', response);

        setBorrowingData(response.data.payload);
        setLoading(false);
      } catch (error) {
        console.error(
          'An error occurred while fetching borrowing data: ',
          error
        );
      }
    };

    fetchBorrowingData();
  }, [userId]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Pengaturan" />

        <div className="flex justify-center items-center">
          <div className="p-7 mr-24">
            <ul className="flex my-1 justify-start items-start gap-2">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-7 text-textbody"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </li>
              <li className="text-3xl text-textbody font-['Roboto']">
                Notification
              </li>
            </ul>
            <ul className="ml-5">
              <li className="ml-5">
                <span className="text-body text-base font-medium font-['Roboto']">
                  You Have
                </span>
                <span> </span>
                <span className="text-secondary text-base font-medium font-['Roboto']">
                  {borrowingData?.length}
                </span>
                <span> </span>
                <span className="text-body text-base font-medium font-['Roboto']">
                  Notification Today!
                </span>
              </li>
            </ul>
            {/*Notif today*/}
            <ul className="mt-8 ml-5">
              <li className="mb-4 text-textbody text-xl font-normal font-['Roboto']">
                Today
              </li>
            </ul>
            {loading ? (
              <Loader />
            ) : (
              <>
                {borrowingData?.map((borrowing, id: number) => (
                  <ul
                    key={id}
                    className="ml-6 mb-2 h-28 w-full p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex"
                  >
                    <li className="flex-none">
                      <span className="w-16 h-16 rounded-full">
                        <img src="assets/images2/The Young Wizzard.svg" />
                      </span>
                    </li>
                    <li>
                      <span className="text-textbody text-xl font-normal font-['Roboto']">
                        {borrowing.title}
                      </span>
                      <span> </span>
                      <span className="text-body text-xs font-normal font-['Roboto']">
                        borrowed at{' '}
                        {formatDate(new Date(borrowing.borrow_date))}
                      </span>
                      <span className="block" />
                      <span className="text-body text-base font-medium font-['Roboto']">
                        Deadline for returning your book is
                      </span>
                      <span className="text-danger text-base font-medium font-['Roboto']">
                        {' '}
                        Tomorrow
                      </span>
                    </li>
                    <button className="w-[416px] text-right text-primary text-base font-medium font-['Roboto'] hover:text-body">
                      View
                    </button>
                  </ul>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberBorrowing;
