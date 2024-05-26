import Breadcrumb from '../../../components/Breadcrumb';
import PublisherTable from '../../../components/Table/PublisherTable';

const PublisherManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Publisher Management" />

      <div className="flex flex-col gap-10">
        <PublisherTable />
      </div>
    </>
  );
};

export default PublisherManagement;
