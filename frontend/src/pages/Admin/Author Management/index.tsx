import Breadcrumb from '../../../components/Breadcrumb';
import AuthorTable from '../../../components/Table/AuthorTable';

const AuthorManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Author Management" />

      <div className="flex flex-col gap-10">
        <AuthorTable />
      </div>
    </>
  );
};

export default AuthorManagement;
