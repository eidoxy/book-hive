import Breadcrumb from '../../../components/Breadcrumb';
import AdminTable from '../../../components/Table/AdminTable';

const AdminManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Admin Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default AdminManagement;
