import React from 'react'

const BorrowingBooks = () => {
  return (
    <div className='bg-bodybg'>
      <div className="flex">
  <div className="bg-primary max-h-max w-[608px] p-5 pt-8 relative">
    <ul>
      <li className="flex justify-center mt-11">
        <span className="text-white text-4xl font-bold font-['DM Sans']">BOOK</span>
        <span className="text-secondary text-4xl font-bold font-['DM Sans']">HIVE</span> 
      </li>
      <li className="flex justify-center mt-4">
        <span className="w-[200px] h-0.5 bg-white" />
      </li>
      <li href="#" className="flex justify-start ml-11 mt-11">
        <button className="flex items-center">
          <span className="w-5 h-5 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>                          
          </span>
          <span className="text-white text-xl font-normal font-['Roboto']">Profile</span>
        </button>
      </li>
      <li href="#" className="flex justify-start ml-11 mt-4">
        <button className="flex items-center">
          <span className="w-5 h-5 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </span>
          <span className="text-white text-xl font-normal font-['Roboto']">Borrowing Books</span>
        </button>
      </li>                 
    </ul>
  </div>
  {/*Main*/}
  <div className="p-7 mr-24">
    <ul className="flex my-1 justify-start items-start gap-2">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-textbody">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
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
          2
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
    {/*box1*/}
    <ul className="ml-6 mb-2 h-28 w-full p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
      <li className="flex-none">
        <span className="w-16 h-16 rounded-full">
          <img src="assets/images2/The Young Wizzard.svg" />
        </span>
      </li>
      <li>
        <span className="text-textbody text-xl font-normal font-['Roboto']">The Young Wizzard</span>
        <span> </span>
        <span className="text-body text-xs font-normal font-['Roboto']">1hr Ago</span>
        <span className="block" />
        <span className="text-body text-base font-medium font-['Roboto']">Deadline for returning your book is</span>
        <span className="text-danger text-base font-medium font-['Roboto']"> Tomorrow</span>
      </li>
      <button href="#" className="w-[416px] text-right text-primary text-base font-medium font-['Roboto'] hover:text-body">
        View
      </button>
    </ul>
    {/*box2*/}
    <ul className="ml-6 mb-2 h-28 w-full p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
      <li className="flex-none">
        <span className="w-16 h-16 rounded-full">
          <img src="assets/images2/The Young Wizzard.svg" />
        </span>
      </li>
      <li>
        <span className="text-textbody text-xl font-normal font-['Roboto']">The Young Wizzard</span>
        <span> </span>
        <span className="text-body text-xs font-normal font-['Roboto']">5hr Ago</span>
        <span className="block" />
        <span className="text-body text-base font-medium font-['Roboto']">Thankyou! You Have</span>
        <span className="text-success text-base font-medium font-['Roboto']"> Returned</span>
        <span className="text-body text-base font-medium font-['Roboto']"> This Book Today</span>
      </li>
      <button href="#" className="w-[416px] text-right text-primary text-base font-medium font-['Roboto'] hover:text-body">
        View
      </button>
    </ul>
    {/*Notif yesterday*/}
    <ul className="mt-8 ml-5">
      <li className="mb-4 text-textbody text-xl font-normal font-['Roboto']">
        Yesterday
      </li>
    </ul>
    {/*box1*/}
    <ul className="ml-6 mb-2 h-28 p-6 w-full rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
      <li className="flex-none">
        <span className="w-16 h-16 rounded-full">
          <img src="assets/images2/Ellipse 5.png" />
        </span>
      </li>
      <li>
        <span className="text-textbody text-xl font-normal font-['Roboto']">The Young Wizzard</span>
        <span> </span>
        <span className="text-body text-xs font-normal font-['Roboto']">Yesterday</span>
        <span className="block" />
        <span className="text-body text-base font-medium font-['Roboto']">Thankyou, You have</span>
        <span className="text-success text-base font-medium font-['Roboto']"> Returned</span>
        <span className="text-body text-base font-medium font-['Roboto']"> this book Yesterday</span>
      </li>
      <button href="#" className="w-96 text-right text-primary text-base font-medium font-['Roboto'] hover:body">
        View
      </button>
    </ul>
    {/*box2*/}
    <ul className="ml-6 mb-2 h-28 p-6 w-full rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
      <li className="flex-none">
        <span className="w-16 h-16 rounded-full">
          <img src="assets/images2/Ellipse 5.png" />
        </span>
      </li>
      <li>
        <span className="text-textbody text-xl font-normal font-['Roboto']">The Young Wizzard</span>
        <span> </span>
        <span className="text-body text-xs font-normal font-['Roboto']">Yesterday</span>
        <span className="block" />
        <span className="text-body text-base font-medium font-['Roboto']">Thankyou, You have</span>
        <span className="text-success text-base font-medium font-['Roboto']"> Returned</span>
        <span className="text-body text-base font-medium font-['Roboto']"> this book Yesterday</span>
      </li>
      <button href="#" className="w-96 text-right text-primary text-base font-medium font-['Roboto'] hover:body">
        View
      </button>
    </ul>
    {/*Notif 17 may*/}
    <ul className="mt-8 ml-5">
      <li className="mb-4 text-body text-xl font-normal font-['Roboto']">
        17 May
      </li>
    </ul>
    {/*box1*/}
    <ul className="ml-6 mb-2 h-28 p-6 w-full rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
      <li className="flex-none">
        <span className="w-16 h-16 rounded-full">
          <img src="assets/images2/Ellipse 5.png" />
        </span>
      </li>
      <li>
        <span className="text-textbody text-xl font-normal font-['Roboto']">The Young Wizzard</span>
        <span> </span>
        <span className="text-body text-xs font-normal font-['Roboto']">17 May</span>
        <span className="block" />
        <span className="text-body text-base font-medium font-['Roboto']">Thankyou, You have</span>
        <span className="text-success text-base font-medium font-['Roboto']"> Returned</span>
        <span className="text-body text-base font-medium font-['Roboto']"> this book on 17 May</span>
      </li>
      <button href="#" className="w-96 text-right text-primary text-base font-medium font-['Roboto'] hover:body">
        View
      </button>
    </ul>
  </div>
</div>

    </div>
  )
}

export default BorrowingBooks