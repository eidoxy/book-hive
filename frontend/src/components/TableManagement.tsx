import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from '../common/Loader';

// import TableData from '../components/TableData';

const TableManagement = () => {
  const [metadatas, setMetadatas] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = metadatas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(metadatas.length / itemsPerPage);
  let currentPage = itemOffset / itemsPerPage;
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleOpenDocument = (url: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <body style="margin: 0;">
            <iframe src="${url}" width="100%" height="100%"></iframe>
          </body>
        </html>
      `);
    } else {
      console.error('Failed to open a new window.');
    }
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % metadatas.length;
    setItemOffset(newOffset);
    currentPage = event.selected;
  };

  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <form>
        <div className="flex flex-auto mb-9 mt-2 items-center">
          <h3 className="text-2xl font-bold text-black dark:text-white mr-auto">
            Tabel Data
          </h3>

          <NavLink
            to="/data-management/create"
            className={`group max-h-12 rounded-full flex items-center gap-2.5 py-2 px-6 font-medium text-white duration-300 ease-in-out bg-primary hover:bg-primarydark dark:hover:bg-primarydark`}
          >
            + Tambah
          </NavLink>
        </div>

        {/* To add table height */}
        <div className="max-w-full overflow-x-auto pb-5">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[20px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      No
                    </h5>
                  </th>
                  <th className="min-w-[220px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Dokumen
                    </h5>
                  </th>
                  <th className="min-w-[150px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Deskripsi
                    </h5>
                  </th>
                  <th className="min-w-[150px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Tanggal Rilis
                    </h5>
                  </th>
                  <th className="min-w-[120px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Ukuran File
                    </h5>
                  </th>
                  <th className="py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Aksi
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {currentItems.map((items: any, id: any) => (
                  <tr key={id}>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <p className="text-black dark:text-white">
                        {currentPage * itemsPerPage + id + 1}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <p className="text-black dark:text-white">
                        {items.filename}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <p className="text-black dark:text-white">
                        {items.description}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <p className="text-black dark:text-white">
                        {items.timestamp}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <p className="text-black dark:text-white">
                        {items.pdf_size}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:px-8 xl:py-6">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleOpenDocument(items.pdf_path)
                          }
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                          </svg>
                        </button>

                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            window.open(items.pdf_path, '_blank')
                          }
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z" />
                          </svg>
                        </button>

                        <button
                          className="hover:text-danger"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="inline-flex -space-x-px text-base h-10 my-5"
          pageLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-greendark hover:bg-primary hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-primary dark:hover:text-white"
          previousLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-greendark rounded-s-lg hover:bg-primary hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-primary dark:hover:text-white"
          nextLinkClassName="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-greendark rounded-e-lg hover:bg-primary hover:text-white dark:border-bodydark2 dark:text-gray-400 dark:hover:bg-primary dark:hover:text-white"
          activeClassName="text-white border-green bg-primary dark:bg-primary dark:text-white"
        />
      </form>
    </div>
  );
};

export default TableManagement;
