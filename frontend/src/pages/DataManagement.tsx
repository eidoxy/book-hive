import Breadcrumb from '../components/Breadcrumb';
import TableManagement from '../components/TableManagement';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const DataManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Manajemen Data" />

      <div className="flex flex-col gap-10">
        <TableManagement />
      </div>
    </>
  );
};

export default DataManagement;
