import Breadcrumb from '../../../components/Breadcrumb';
import ShelfTable from '../../../components/Table/ShelfTable';

const ShelfManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Shelf Management" />

      <div className="flex flex-col gap-10">
        <ShelfTable />
      </div>
    </>
  );
};

export default ShelfManagement;
