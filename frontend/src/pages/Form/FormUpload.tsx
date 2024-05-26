import Breadcrumb from '../../components/Breadcrumb';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../components/firebase/Config';
import { useNavigate } from 'react-router-dom';

const FormUpload = () => {
  // const navigate = useNavigate();
  // const [filename, setFilename] = useState('');
  // const [description, setDescription] = useState('');

  // const handleSubmit = (event: React.SyntheticEvent) => {
  //     event.preventDefault();

  //     const data = new FormData();
  //     data.append('filename', filename);
  //     data.append('description', description);

  //     axios.post('http://127.0.0.1:5000/api/upload/pdf', data)
  //         .then(response => {
  //         if (response.data.message === 'Data uploaded successfully') {
  //                 navigate('/data-management');
  //             }
  //         })
  //         .catch(error => {
  //             console.error('There was an error!', error);
  //         });
  // };

  const Navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('uid', uid);
      } else {
        // User is signed out
        Navigate('/signin');
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Manajemen Data" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Upload File
              </h3>
            </div>
            <form
              id="form-upload"
              action="http://127.0.0.1:5000/api/upload/pdf"
              method="post"
              encType="multipart/form-data"
            >
              <div className="p-6">
                <div className="mb-5 flex flex-col gap-6">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="filename"
                      name="filename"
                      placeholder="Masukkan nama file"
                      className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="description"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    rows={window.innerWidth < 764 ? 4 : 3}
                    id="description"
                    name="description"
                    placeholder="Deskripsi file"
                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    className="mb-3 block text-black dark:text-white"
                    htmlFor="file"
                  >
                    Tambah File
                  </label>
                  <input
                    type="file"
                    id="pdf"
                    name="pdf"
                    accept=".pdf"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/data-management"
                    className="flex w-1/2 justify-center rounded text-danger border transition hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium"
                  >
                    Cancel
                  </NavLink>
                  <button
                    type="submit"
                    className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-white transition hover:bg-primarydark"
                  >
                    Upload
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

export default FormUpload;
