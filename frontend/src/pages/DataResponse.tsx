import Breadcrumb from '../components/Breadcrumb';
import AnswerTable from '../components/AnswerTable';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const DataResponse = () => {
  return (
    <>
      <Breadcrumb pageName="Data Respon " />

      <div className="flex flex-col gap-10">
        <AnswerTable />
      </div>
    </>
  );
};

export default DataResponse;
