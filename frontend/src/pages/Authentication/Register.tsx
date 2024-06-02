import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from '../../images/logo/logo-no-bg.png';
import Illustration from '../../images/illustrations/auth.svg';

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    member_type: 'siswa',
    major: '',
    departement: '',
    parent_number: '',
  });
  const [selectedValue, setSelectedValue] = useState('siswa');

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.name === '') {
      return alert('Name is required.');
    } else if (inputValue.email === '') {
      return alert('Email is required.');
    } else if (inputValue.phone === '') {
      return alert('Phone is required.');
    } else if (inputValue.password === '') {
      return alert('Password is required.');
    } else if (inputValue.member_type === '') {
      return alert('Member type is required.');
    } else if (inputValue.parent_number === '') {
      return alert('Parent number is required.');
    }

    if (inputValue.member_type === 'siswa' && inputValue.major === '') {
      return alert('Major is required.');
    } else if (
      inputValue.member_type === 'dosen' &&
      inputValue.departement === ''
    ) {
      return alert('Departement is required.');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/member/register',
        inputValue
      );

      if (response.status === 200) {
        alert('Register success.');
        navigate('/login');
      } else {
        alert('An error occurred while registering.');
      }
    } catch (error) {
      alert('An error occurred while registering.');
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full flex flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full p-10.5 sm:px-2 xl:px-5">
            <div className="px-4 xl:px-25 sm:px-25 lg:px-50">
              <h2 className="mb-1.5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Register
              </h2>
              <span className="mb-9 block font-medium">
                Welcome, please register to your account.
              </span>
            </div>
            <form
              id="form-login"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="px-4 xl:px-25 sm:px-25 lg:px-50"
            >
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="name"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Name*
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      value={inputValue.name}
                      onChange={handleInput}
                      type="text"
                      placeholder="Carl Johnson"
                      className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 pl-2">
                  <label
                    htmlFor="email"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      value={inputValue.email}
                      onChange={handleInput}
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="phone"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Phone Number*
                  </label>
                  <div className="relative">
                    <input
                      name="phone"
                      value={inputValue.phone}
                      onChange={handleInput}
                      type="text"
                      placeholder="Enter your phone number"
                      className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="password"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={inputValue.password}
                      onChange={handleInput}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="member_type"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Member Type*
                </label>
                <div className="relative">
                  <ul className="items-center w-full rounded-full text-sm bg-transparent border border-stroke outline-none flex dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <li className="w-full border-b-0 border-r border-stroke">
                      <div className="flex items-center ps-3">
                        <input
                          id="dosen"
                          type="radio"
                          name="list-radio"
                          value="dosen"
                          onChange={(e) =>
                            setSelectedValue(e.target.value)
                          }
                          className="w-4 h-4 border-stroke"
                          checked={selectedValue === 'dosen'}
                        />
                        <label
                          htmlFor="dosen"
                          className="w-full py-3 ms-2 text-sm font-medium dark:text-gray-300"
                        >
                          Dosen
                        </label>
                      </div>
                    </li>
                    <li className="w-full sm:border-b-0">
                      <div className="flex items-center ps-3">
                        <input
                          id="siswa"
                          type="radio"
                          name="list-radio"
                          value="siswa"
                          onChange={(e) =>
                            setSelectedValue(e.target.value)
                          }
                          className="w-4 h-4 border-stroke"
                          checked={selectedValue === 'siswa'}
                        />
                        <label
                          htmlFor="siswa"
                          className="w-full py-3 ms-2 text-sm font-medium dark:text-gray-300"
                        >
                          Siswa
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  {selectedValue === 'siswa' && (
                    <>
                      <label
                        htmlFor="major"
                        className="mb-2.5 block font-medium text-black dark:text-white"
                      >
                        Major*
                      </label>
                      <div className="relative">
                        <input
                          name="major"
                          value={inputValue.major}
                          onChange={handleInput}
                          type="text"
                          placeholder="What is your major?"
                          className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          required
                        />
                      </div>
                    </>
                  )}

                  {selectedValue === 'dosen' && (
                    <>
                      <label
                        htmlFor="departement"
                        className="mb-2.5 block font-medium text-black dark:text-white"
                      >
                        Departement*
                      </label>
                      <div className="relative">
                        <input
                          name="departement"
                          value={inputValue.departement}
                          onChange={handleInput}
                          type="text"
                          placeholder="What is your departement?"
                          className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="w-1/2 pr-2">
                  <label
                    htmlFor="parent_number"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Parent Number*
                  </label>
                  <div className="relative">
                    <input
                      name="parent_number"
                      value={inputValue.parent_number}
                      onChange={handleInput}
                      type="text"
                      placeholder="Enter your parent number"
                      className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3.5 rounded-full border text-white border-stroke bg-primary p-3 hover:bg-primarydark dark:border-strokedark dark:bg-primary dark:hover:bg-primarydark"
                >
                  Register
                </button>
              </div>
            </form>

            <div className="flex mt-5 items-center justify-center gap-2">
              <span className="text-black dark:text-white">
                Already have an account?
              </span>
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden w-full h-full xl:block xl:w-1/2 bg-color-white bg-primary">
          <div className="py-17.5 px-26 text-center">
            <Link
              className="flex items-center justify-center mb-5.5"
              to="/"
            >
              <h1 className="text-white font-extrabold text-4xl">
                <span className="text-white">BOOK</span>
                <span className="text-secondary">HIVE</span>
              </h1>
            </Link>

            <span className="mt-15 inline-block">
              <img
                className="w-96"
                src={Illustration}
                alt="Illustration"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
