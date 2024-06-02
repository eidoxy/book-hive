import { Link, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';

import Logo from '../../images/logo/logo-no-bg.png';
import Illustration from '../../images/illustrations/auth.svg';

axios.defaults.withCredentials = true;

const Login = (props: any) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.email === '') {
      return setError('Email is required.');
    } else if (inputValue.password === '') {
      return setError('Password is required.');
    }

    if (props.user === 'admin') {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/admin/login',
          inputValue
        );

        if (response.status === 200) {
          const data = {
            id: response.data.payload.id,
            name: response.data.payload.name,
            email: response.data.payload.email,
          };

          localStorage.setItem('user', JSON.stringify(data));
          setError(null);
          return navigate('/admin/dashboard');
        } else {
          setError('An error occurred while logging in.');
        }
      } catch (error) {
        setError('An error occurred while logging in.');
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/member/login',
          inputValue
        );

        if (response.status === 200) {
          const data = {
            id: response.data.payload.id,
            name: response.data.payload.name,
            email: response.data.payload.email,
          };

          localStorage.setItem('user', JSON.stringify(data));
          setError(null);
          return navigate('/profile');
        } else {
          setError('An error occurred while logging in.');
        }
      } catch (error) {
        setError('An error occurred while logging in.');
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full flex flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full p-10.5 sm:px-2 xl:px-5">
            <div className="px-4 xl:px-25 sm:px-25 lg:px-50">
              <h2 className="mb-1.5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                {props.user === 'admin' && 'Login Admin'}
                {props.user !== 'admin' && 'Login'}
              </h2>
              <span className="mb-9 block font-medium">
                Welcome back, please login to your account.
              </span>
            </div>
            <form
              id="form-login"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="px-4 xl:px-25 sm:px-25 lg:px-50"
            >
              <div className="mb-4">
                <label
                  htmlFor=""
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
                    placeholder="Enter your email address"
                    className="w-full rounded-full border border-stroke bg-transparent py-3 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                  />
                </div>
              </div>
              <div className="mb-9">
                <label
                  htmlFor=""
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

              {error && (
                <div
                  id="alert"
                  className="flex rounded-full items-center p-3 mb-4 text-danger border-danger shadow-sm dark:text-danger dark:bg-meta-4 dark:border-danger"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div className="ms-3 text-sm font-medium">
                    <p className="my-2 block font-medium text-danger dark:text-danger">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3.5 rounded-full border text-white border-stroke bg-primary p-3 hover:bg-primarydark dark:border-strokedark dark:bg-primary dark:hover:bg-primarydark"
                >
                  Login
                </button>
              </div>
            </form>

            {props.user !== 'admin' && (
              <div className="px-4 xl:px-25 sm:px-25 lg:px-50">
                <span className="block text-center">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-primary hover:underline dark:text-primarydark"
                  >
                    Register
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="hidden w-full h-full xl:block xl:w-1/2 bg-color-white bg-primary">
          <div className="py-17.5 px-26 text-center">
            <Link
              className="flex flex-wrap items-center justify-center mb-5.5"
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

export default Login;
