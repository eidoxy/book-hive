import React from 'react'

const BorrowingDetails = () => {
  return (
    <div className='bg-bodybg'>
      <div>
  <header>
    <button className="w-28 h-9 justify-center items-center gap-1 m-8 inline-flex hover:text-body">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <span className="text-primary text-2xl font-normal font-['Roboto'] hover:text-body">
        Back
      </span>
    </button>
  </header>
  <main>
    <div className="flex items-center justify-center">
      <div className="mb-24 w-[914px] h-[900px] bg-white rounded-2xl shadow">
        <div>
          <ul>
            <li className="m-4 mb-2 text-textbody text-xl font-normal font-['Roboto']">
              Borrowing Details
            </li>
            <li className="flex justify-center">
              <p className="w-[885px] h-0.5 bg-primary" />
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-2 h-96">
          <div className="max-w-48">
            <img src="assets/images2/Aaron Loeb.svg" className="m-10 mt-4" />
          </div>
          <div className="col-span-2 ">
            <ul className="mt-20">
              <li className="mb-1 text-textbody text-2xl font-normal font-['Roboto']">The Young Wizzard</li>
              <li className="mb-2 text-body text-xl font-normal font-['Roboto']">Aaron Loeb</li>
              <li className="w-[448px] h-32 text-textbody text-lg font-normal font-['Roboto']">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur gravida risus eu dui faucibus, ac feugiat urna ultrices. Aenean ligula arcu, pulvinar non gravida quis, semper id felis.
              </li>
            </ul>
          </div>
          <div className="m-11 mt-2">
            <ul className="grid gap-10 w-40 text-body text-xl font-normal font-['Roboto']">
              <li>
                Name
              </li>
              <li>
                NRP
              </li>
              <li>
                Phone Number
              </li>
              <li>
                Email
              </li>
              <li>
                Borrowing Date
              </li>
              <li>
                Return Date
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <ul>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                Adrian
              </li>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                3123500031
              </li>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                +62
              </li>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                abc@it.student.pens.ac.id
              </li>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                2 May 2024
              </li>
              <li className="mb-4 w-96 h-11 p-6 rounded-lg border-2 border-primary justify-start items-center gap-6 inline-flex">
                23 May 2024
              </li>
            </ul>
          </div>
          <div className="m-10 mt-0 w-96 h-12 px-8 bg-danger rounded-lg flex-col justify-center items-center inline-flex">
            <p className="text-white text-lg font-normal font-['Roboto']">Not Returned</p>
          </div>
        </div>
      </div></div></main>
</div>

    </div>
  )
}

export default BorrowingDetails