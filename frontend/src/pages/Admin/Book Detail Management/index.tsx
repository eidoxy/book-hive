import Breadcrumb from '../../../components/Breadcrumb';
import BookDetailTable from '../../../components/Table/BookDetailTable';

const BookDetailManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Book Detail Management" />

      <div className="flex flex-col gap-10">
        <BookDetailTable />
      </div>
    </>
  );
};

export default BookDetailManagement;
