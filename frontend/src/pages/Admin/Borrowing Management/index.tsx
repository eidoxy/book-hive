import Breadcrumb from '../../../components/Breadcrumb';
import BorrowingTable from '../../../components/Table/BorrowingTable';

const BorrowingManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Borrowing Management" />

      <div className="flex flex-col gap-10">
        <BorrowingTable />
      </div>
    </>
  );
};

export default BorrowingManagement;
