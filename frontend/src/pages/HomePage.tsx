import React from 'react';

const HomePage = () => {
  return (
    <>
      <div>
        <main className="mb-96">
          <div className="mt md:mt-4 grid grid-cols-2 gap-4 place-items-center h-56">
            <div>
              <ul className="ms-24 mb-16">
                <li>
                  <a
                    style={{
                      width: 608,
                      color: '#0F0F0F',
                      fontSize: 72,
                      fontFamily: 'DM Serif Display',
                      fontWeight: 550,
                      lineHeight: '82.80px',
                      wordWrap: 'break-word',
                    }}
                  >
                    The Whole World Open Up To You
                  </a>
                </li>
                <li className="mt-4">
                  <a
                    style={{
                      width: 608,
                      color: '#0F0F0F',
                      fontSize: 21,
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      wordWrap: 'break-word',
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                  </a>
                </li>
              </ul>
              <ul className="ms-24">
                <li className="w-full h-16 flex justify-start items-center">
                  <input
                    name="search"
                    id="search"
                    placeholder="Search Books, Authors, or Categories"
                    className="p-6 rounded-lg border-2 bg-transparent border-yellow-700 text-neutral-600 text-base font-medium font-['Roboto']"
                    style={{ width: 384, height: 64 }}
                  />
                  <button className="h-16 ml-4 px-10 bg-yellow-700 rounded-lg flex justify-center items-center text-white text-xl font-normal font-['Roboto'] hover:bg-orange-400">
                    Search
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <img
                style={{ width: 529, height: 531 }}
                src="assets/images2/Globe and Book.png"
              />
            </div>
          </div>
          {/* Section 1 ends */}
        </main>
        {/*Section 2*/}
        <main className="mt-8 mb-24 flex-auto">
          <div className="flex justify-between ml-24 mr-24 mb-16">
            <div className="text-stone-900 text-4xl font-medium font-['Roboto']">
              Recommendation
            </div>
            <div />
            <div>
              <button className="text-yellow-700 text-xl font-normal font-['Roboto'] hover:text-gray-500">
                <ul className="flex my-3 justify-center items-center">
                  <li className="mr-2">View All</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
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
                <img src="assets/images2/RikiSanto.png" />
              </li>
              <li>
                <div className="w-48 h-28 flex-col justify-center items-center gap-1 inline-flex">
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Riki Santo
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Kisah Kedamaian
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Aaron Loeb
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    The Young Wizard
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Averi Davis
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Story Of Two Friends
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Estelle Darcy
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Walk Into The Shadow
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Shawn Gracia
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Conouest Of Flame
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </main>
        {/*Section 2 ends*/}
        {/*Section 3*/}
        <main className="mt-8 m-24 flex-auto">
          <div
            style={{ height: 480, width: 1240 }}
            className="card flex flex-col w-96 h-96 relative bg-gradient-to-r from-orange-500 to-amber-200 rounded-2xl shadow"
          >
            <div>
              <img
                src="assets/images2/Shawn Gracia.svg"
                className="w-56 h-80 left-[843px] top-[80px] absolute rounded-lg"
              />
              <div className="flex flex-col m-16">
                <div className="mb-8 text-white text-4xl font-medium font-['Roboto']">
                  Our Recommendation
                </div>
                <div className="mb-4 text-white text-5xl font-medium font-['Roboto']">
                  Conouest Of Flame
                </div>
                <div className="mb-4 w-96 text-white text-3xl font-normal font-['Roboto']">
                  Shawn Gracia
                </div>
                <div className="w-1/2 text-white text-xl font-normal font-['Roboto']">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </main>
        {/*Section 3 ends*/}
        {/*Section 4*/}
        <main className="mt-8 mb-24 flex-auto">
          <div className="flex justify-between ml-24 mr-24 mb-16">
            <div className="text-stone-900 text-4xl font-medium font-['Roboto']">
              Most Popular
            </div>
            <div />
            <div>
              <button className="text-yellow-700 text-xl font-normal font-['Roboto'] hover:text-gray-500">
                <ul className="flex my-3 justify-center items-center">
                  <li className="mr-2">View All</li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Tere Liye
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Bumi
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Claudia Wilson
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Soul
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Cahaya Dewi
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Rasa Sunyi
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Claudia Wilson
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Ranch
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
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
                  <div className="self-stretch text-center text-neutral-600 text-xl font-normal font-['Roboto']">
                    Tuti Kasih
                  </div>
                  <div className="mb-4 self-stretch text-center text-stone-900 text-3xl font-normal font-['Roboto']">
                    Merinding
                  </div>
                </div>
              </li>
              <li>
                <div className="w-48 h-6 justify-between items-center inline-flex">
                  <a
                    href="#"
                    className="text-black text-xl font-normal  hover:text-gray-500 font-['Roboto']"
                  >
                    Stock
                  </a>
                  <a
                    href="#"
                    className="text-right text-black text-xl hover:text-gray-500 font-normal font-['Roboto']"
                  >
                    Shelf
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </main>
        {/*Section 4 ends*/}
        {/*Section 5*/}
        <main className="mt-8 m-24 flex-auto">
          <div
            style={{ height: 480, width: 1240 }}
            className="card flex bg-gradient-to-r from-orange-500 to-amber-200 rounded-2xl shadow"
          >
            <div className="flex-none">
              <img
                src="assets/images2/mail with a frosted glass effect.svg"
                className="m-24"
              />
            </div>
            <div className="flex items-center justify-center flex-grow">
              <ul>
                <li>
                  <a className="text-white text-4xl font-medium font-['Roboto']">
                    Subscribe to our blog for the latest information.
                  </a>
                </li>
                <li className="flex items-center mt-8 gap-4">
                  <input
                    name="search"
                    id="search"
                    placeholder="Your Email"
                    className="w-80 h-16 p-6 rounded-lg border-2 border-yellow-700 bg-transparent text-white justify-start items-center gap-6 inline-flex"
                  />
                  <button className="w-60 h-16 px-14 bg-yellow-700 rounded-lg flex-col justify-center items-center inline-flex text-white text-xl font-normal font-['Roboto'] hover:bg-orange-400">
                    Subscribe
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
