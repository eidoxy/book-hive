import Breadcrumb from '../../../components/Breadcrumb';
import BookTable from '../../../components/Table/BookTable';

const BookManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Book Management" />

      <div className="flex flex-col gap-10">
        <BookTable />
      </div>
    </>
  );
};

export default BookManagement;
