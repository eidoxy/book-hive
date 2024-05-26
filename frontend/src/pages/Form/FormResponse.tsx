import Breadcrumb from '../../components/Breadcrumb';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db, storage, auth } from '../../components/firebase/Config';
import {
  collection,
  query,
  orderBy,
  getDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import emailjs from '@emailjs/browser';

const FormResponse = () => {
  const [report, setReport] = useState<any>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const myRef = useRef('form');
  const auth = getAuth();

  useEffect(() => {
    const collectionRef = collection(db, 'report');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    getDocs(q)
      .then((querySnapshot) => {
        setReport(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error mengambil data koleksi:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const usersCollection = collection(db, 'users');
          const userDocRef = doc(usersCollection, user.uid);

          // Fetch user data from Firestore
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('User document not found!');
          }
        } else {
          // User is signed out
          Navigate('/signin');
          console.log('User is logged out');
        }
      });
    };

    fetchUserData();
  }, [auth]);

  const Navigate = useNavigate();

  // Send to Email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_zak6dce',
        'template_sjf0mcg',
        myRef.current,
        'DEs8oUW5ApBeW2pqU'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Kirim Respon" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Kirim Respon
              </h3>
            </div>
            <form
              id="form-upload"
              ref={myRef}
              onSubmit={sendEmail}
              action="#"
              method="post"
              encType="multipart/form-data"
            >
              <div className="p-6">
                {report.map((items: any, id: any) => (
                  <div key={id}>
                    <div className="mb-5">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="question"
                      >
                        Email User
                      </label>
                      <input
                        type="text"
                        id="admin_name"
                        name="admin_name"
                        value={items.email}
                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary read-only:cursor-default read-only:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        readOnly
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="userQuestion"
                      >
                        Pertanyaan
                      </label>
                      {/* <p className="w-full py-3 px-5 font-medium">
                                                {items.question}
                                            </p> */}
                      <textarea
                        rows={window.innerWidth < 764 ? 4 : 3}
                        id="userQuestion"
                        name="userQuestion"
                        defaultValue={items.question}
                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary read-only:cursor-default read-only:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        readOnly
                        required
                      ></textarea>
                    </div>
                  </div>
                ))}

                {userData ? (
                  <div className="mb-5 flex flex-col gap-6 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="adminName"
                      >
                        Nama Admin
                      </label>
                      <input
                        type="text"
                        id="adminName"
                        name="adminName"
                        value={userData.fullname}
                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary read-only:cursor-default read-only:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        readOnly
                        required
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-2.5 block text-black dark:text-white"
                        htmlFor="adminEmail"
                      >
                        Email Admin
                      </label>
                      <input
                        type="text"
                        id="adminEmail"
                        name="adminEmail"
                        value={userData.email}
                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary read-only:cursor-default read-only:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        readOnly
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <Loader />
                )}

                <div className="mb-5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="response"
                  >
                    Respon
                  </label>
                  <textarea
                    rows={window.innerWidth < 764 ? 5 : 4}
                    id="response"
                    name="response"
                    placeholder="Respon Anda"
                    className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary read-only:cursor-default read-only:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/data-response"
                    className="flex w-1/2 justify-center rounded text-danger border transition hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium"
                  >
                    Cancel
                  </NavLink>
                  <button
                    type="submit"
                    className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-white transition hover:bg-primarydark"
                  >
                    Kirim
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

export default FormResponse;
