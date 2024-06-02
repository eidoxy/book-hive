import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import Loader from '../common/Loader';
import { Category } from '../models/category.model';
import { Book } from '../models/book.model';
import img_ig from '../images/illustrations/Instagram.svg';
import img_Tiktok from '../images/illustrations/Tiktok.svg';
import img_yt from '../images/illustrations/Youtube.svg';
import img_twitter from '../images/illustrations/Twitter.svg';

const AllBooks = () => {
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [dataBooks, setDataBooks] = useState<Book[]>([]);
  const [updateBooks, setUpdateBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('All Books');

  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [categoryId, setCagoryId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseCategory, responseBook] = await Promise.all([
          axios.get('http://localhost:3000/api/category'),
          axios.get('http://localhost:3000/api/book/list'),
        ]);

        console.log('responseCategory', responseCategory.data.payload);
        console.log('responseBook', responseBook.data.payload);

        setDataCategory(responseCategory.data.payload);
        setDataBooks(responseBook.data.payload);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const distance = 200;
      setScrollPosition(
        direction === 'right'
          ? Math.min(
              scrollPosition + distance,
              scrollContainerRef.current.scrollWidth -
                scrollContainerRef.current.offsetWidth
            )
          : Math.max(0, scrollPosition - distance)
      );
    }
  };

  const handleSearch = async (
    categoryId: number,
    categoryName: string
  ) => {
    setCagoryId(categoryId.toString());

    try {
      const response = await axios.get(
        `http://localhost:3000/api/book/category/${categoryId}`
      );

      if (response.status === 200) {
        setDataBooks(response.data.payload);
        setLoading(false);
        setTitle(categoryName);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    const updatedData = dataBooks.map((item: Book) => ({
      ...item,
      cover: 'http://localhost:3000/images/' + item.cover,
    }));
    setUpdateBooks(updatedData);
  }, [dataBooks]);

  return (
    <div className="bg-bodybg">
      {/* Navbar */}
      <nav className="bg-bodybg fixed w-full z-20 top-0 start-0   ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <ul className="flex">
            <a className="font-bold font-sans text-2xl text-primary">
              BOOK
            </a>
            <a className="font-bold font-sans text-2xl text-secondary">
              HIVE
            </a>
          </ul>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-primary focus:outline-none rounded-md px-8 py-2.5 text-center hover:bg-gradientfrom"
            >
              Login
            </button>
          </div>
          <div
            className="bg-bodybg items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-textbody rounded hover:text-body md:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto"
                >
                  All Books
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*Tutup Navbar */}
      {/* Hero */}
      <section className="bg-bodybg">
        <div className="p-8 mt-6 mb-6 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <p className="mt-8 mb-8 text-nowrap font-serif font-bold text-textbody text-5xl">
              Find Your Own Book
            </p>
            <p className="mt-8 mb-8 text-textbody sm:mt-4 sm:block">
              We provide many jobs that you dreaming it, find your job
              according to your expertise to make it easier to find a job
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <form action="#" className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <label htmlFor="email" className="sr-only">
                  Search
                </label>
                <input
                  type="Search"
                  placeholder="Search Books, Authors, or Categories"
                  className="w-full rounded-md p-3 text-body bg-transparent border-primary border-2 focus:outline-none  focus:ring-yellow-700"
                />
              </div>
              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary hover:bg-gradientfrom px-8 py-3 text-white transition focus:outline-none focus:ring-yellow-700 sm:mt-0 sm:w-auto"
              >
                <span className="text-sm font-medium">Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Tutup Hero */}
      {/* Navbar2 */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="font-sans w-full flex h-16 items-center justify-between">
          <div className="hover:text-secondary border-2 border-yellow-700 rounded-md py-2 px-5">
            <a
              className="text-textbody transition hover:text-yellow-600"
              href="#"
            >
              {' '}
              Filter
            </a>
            <button className=" ml-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <button onClick={() => handleScroll('left')}>{`<`}</button>
              <div
                ref={scrollContainerRef}
                className="flex items-center justify-center overflow-x-hidden w-[1000px] scroll-smooth"
                onScroll={() =>
                  setScrollPosition(
                    scrollContainerRef.current?.scrollLeft || 0
                  )
                }
              >
                {dataCategory.map((category: Category, id: number) => (
                  <div key={id}>
                    <button
                      onClick={() =>
                        category.id &&
                        handleSearch(category.id, category.name)
                      }
                      className="text-textbody transition hover:text-primary pr-8"
                    >
                      {category.name}
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => handleScroll('right')}>{`>`}</button>
            </div>
          )}
        </div>
      </div>
      {/* Tutup Navbar2 */}
      {/* Kategori 1*/}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-7 container mx-auto flex justify-between">
            <div className="container px-6 flex justify-between">
              <div className="text-textbody text-3xl font-medium font-['Roboto']">
                {title}
              </div>
            </div>
          </div>

          <div className="flex justify-between p-14">
            {updateBooks.map((book: Book, id: number) => (
              <div key={id} className="w-56 rounded-lg border-2 h-auto">
                <div className="p">
                  <img src={book.cover} />
                </div>
                <div>
                  <p className="flex justify-center pb-3 text-body">
                    {book.author}
                  </p>
                  <p className="font-serif flex justify-center text-2xl text-textbody">
                    {book.title}
                  </p>
                  <div className="flex justify-between p-4 ">
                    <p className="r text-textbody">{book.stock}</p>
                    <p className="text-textbody">{book.shelf}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Footer */}
      <footer>
        <div className="p-10 bg-white text-textbody">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-flow-row gap-4">
              <div>
                <ul>
                  <li className="mb-5 w-44 h-6 text-textbody text-base font-bold font-['Montserrat'] leading-normal">
                    Other Links
                  </li>
                  <li>
                    <a
                      className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal"
                      href="#"
                    >
                      Home
                      <br />
                    </a>
                    <a
                      href="#"
                      className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal"
                    >
                      Books
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className="mb-5 w-44 h-6 text-textbody text-base font-bold font-['Montserrat'] leading-normal">
                    About BookHive
                  </li>
                  <li>
                    <a
                      className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal"
                      href="#"
                    >
                      About Us
                      <br />
                    </a>
                    <a
                      href="#"
                      className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal"
                    >
                      Help
                      <br />
                    </a>
                    <a
                      href="#"
                      className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 w-full h-0.5 bg-primary" />
            <div>
              <ul className="flex flex-wrap items-center justify-between mt-8 w-full">
                <li className="text-textbody text-base font-normal font-['Montserrat'] leading-normal">
                  © BookHive, We Love our User!
                </li>
                <li className="flex items-center text-right text-textbody text-base font-normal font-['Montserrat'] leading-normal">
                  <a className="mr-4">Follow us:</a>
                  <a className="mr-4" href="#">
                    <img src={img_ig} alt="Instagram" />
                  </a>
                  <a className="mr-4" href="#">
                    <img src={img_Tiktok} alt="TikTok" />
                  </a>
                  <a className="mr-4" href="#">
                    <img src={img_twitter} alt="Twitter" />
                  </a>
                  <a className="mr-4" href="#">
                    <img src={img_yt} alt="Youtube" />
                  </a>
                </li>
              </ul>
              <ul></ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Tutup Footer */}
    </div>
  );
};

export default AllBooks;
