import React from 'react'

const BooksDetail = () => {
  return (
<div className='bg-bodybg'>
  {/* Navbar */}
  {/* Navbar */}
  <nav className="bg-bodybg fixed w-full z-20 top-0 start-0   ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <ul className="flex">
        <a className="font-bold font-sans text-2xl text-primary">BOOK</a>
        <a className="font-bold font-sans text-2xl text-secondary">HIVE</a>
      </ul>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="text-white bg-primary focus:outline-none rounded-md px-8 py-2.5 text-center hover:bg-gradientfrom">Login
        </button>
      </div>
      <div className="bg-bodybg items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
          <li>
            <a href="#" className="block py-2 px-3 text-textbody rounded hover:text-body md:p-0">Home</a>
          </li>
          <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto">Categories
              <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
              </svg></button>
            {/* Dropdown menu */}
            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">International
                    Book</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Comic</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Novel</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Education</a>
                </li>
              </ul>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                  out</a>
              </div>
            </div>
            {/* End Dropdown menu */}
          </li>
          <li>
            <a href="#" className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto">About
              Us</a>
          </li>
          <li>
            <a href="#" className=" flex items-center justify-between w-full py-2 px-3 text-textbody hover:text-body md:p-0 md:w-auto">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  {/*Tutup Navbar */}
  {/*Section 1*/}
  <main className="flex-auto bg-bodybg">
    <div style={{height: 900, width: 1240}} className="grid grid-cols-2 ml-24 w-96 h-96 relative bg-gradient-to-r from-gradientfrom to-gradientto rounded-2xl shadow">
      <div>
        <img src="assets/images2/Tere Liye.svg" className="w-56 h-80 m-16 ml-16 rounded-lg shadow" />
      </div>
      <div className="flex flex-col justify-center">
        <ul>
          <li className="mb-10 mt-24 text-white text-7xl font-medium font-serif leading-10">Bumi</li>
          <li className="mb-10 text-white text-4xl font-normal font-['Roboto']">Tere Liye</li>
          <li className="w-96 text-white text-xl font-normal font-['Roboto']">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="ml-16 text-white text-4xl font-normal font-['Roboto']">Description</li>
          <li className="mt-2 ml-16 break-words w-96 text-white text-xl font-normal font-['Roboto']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur gravida risus eu dui faucibus, ac feugiat urna ultrices. Aenean ligula arcu, pulvinar non gravida quis, semper id felis.<br /><br />
            Phasellus pellentesque elit eget ante aliquet, quis dictum velit tincidunt. Vestibulum luctus tellus ut augue cursus, eleifend laoreet urna cursus. Praesent sit amet ipsum non libero ullamcorper auctor sed a sem.
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="mb-2 w-28 text-white text-4xl font-normal font-['Roboto']">
            Editor
          </li>
          <li className="mb-24 w-96 text-white text-xl font-normal font-['Roboto'] break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
          <li className="mb-2 w-28 text-white text-4xl font-normal font-['Roboto']">
            Language
          </li>
          <li className="w-96 text-white text-xl font-normal font-['Roboto'] break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </li>
        </ul>
      </div>
    </div>
  </main>
  {/*Section 1 Ends*/}
  <main className="mt-8 mb-24 flex-auto">
          <div className="flex justify-between ml-24 mr-24 mb-16">
            <div className="text-textbody text-3xl font-medium font-['Roboto']">
              Recommendation
            </div>
            <div />
            <div>
              <button className="text-primary text-lg font-normal font-['Roboto'] hover:text-body">
                <ul className="flex my-3 justify-center items-center">
                  <li className="mr-2">View All</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </li>
                </ul>
              </button>
            </div>
          </div>
          {/*Card1*/}
          <div className="ml-24 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex">
            <ul>
              <li>
                <img src="assets/images2/RikiSanto.png" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Riki Santo
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody  text-3xl font-normal font-['Roboto']">
                    Kisah Kedamaian
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody  text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody  text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card2*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Aaron Loeb.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Aaron Loeb
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    The Young Wizard
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card3*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="#" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Averi Davis
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Story Of Two Friends
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card4*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Estelle Darcy.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Estelle Darcy
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Walk Into The Shadow
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card5*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Shawn Gracia.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Shawn Gracia
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Conouest Of Flame
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </main>
        {/*Section 2 ends*/}
  {/*Section 4*/}
  <main className="mt-8 mb-24 flex-auto">
          <div className="flex justify-between ml-24 mr-24 mb-16">
            <div className="text-textbody text-3xl font-medium font-['Roboto']">
              Most Popular
            </div>
            <div />
            <div>
              <button className="text-primary text-lg font-normal font-['Roboto'] hover:text-body">
                <ul className="flex my-3 justify-center items-center">
                  <li className="mr-2">View All</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </li>
                </ul>
              </button>
            </div>
          </div>
          {/*Card1*/}
          <div className="ml-24 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Tere Liye.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Tere Liye
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Bumi
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card2*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Soul.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Claudia Wilson
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Soul
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card3*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Cahaya Dewi.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Cahaya Dewi
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Rasa Sunyi
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card4*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Ranch.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Claudia Wilson
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Ranch
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/*Card5*/}
          <div className="ml-2 mr-2 w-56 h-auto rounded-lg shadow border border-neutral-600/opacity-25 flex-col justify-center items-center inline-flex ">
            <ul>
              <li>
                <img src="assets/images2/Merinding.svg" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-body text-xl font-normal font-['Roboto']">
                    Tuti Kasih
                  </div>
                  <div className="mb-4 self-stretch text-center text-textbody text-3xl font-normal font-['Roboto']">
                    Merinding
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-textbody text-xl font-normal  hover:text-body font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-textbody text-xl hover:text-body font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </main>
        {/*Section 4 ends*/}
  {/*Footer*/}
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
              <a className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal" href="#">Home<br /></a>
              <a href="#" className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal">Books</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="mb-5 w-44 h-6 text-textbody text-base font-bold font-['Montserrat'] leading-normal">
              About BookHive
            </li>
            <li>
              <a className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal" href="#">About Us<br /></a>
              <a href="#" className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal">Help<br /></a>
              <a href="#" className="w-44 h-16 text-textbody text-base font-normal font-['Montserrat'] leading-normal">Contact Us</a>
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
              <img src="assets/images2/Instagram.svg" alt="Instagram" />
            </a>
            <a className="mr-4" href="#">
              <img src="assets/images2/TikToksvg.svg" alt="TikTok" />
            </a>
            <a className="mr-4" href="#">
              <img src="assets/images2/Twitter.svg" alt="Twitter" />
            </a>
            <a className="mr-4" href="#">
              <img src="assets/images2/Youtube.svg" alt="Youtube" />
            </a>
          </li>
        </ul>                    
        <ul>
        </ul>
      </div>
    </div>
  </div>        
</footer>
  {/*Footer ends*/}
</div>

  )
}

export default BooksDetail