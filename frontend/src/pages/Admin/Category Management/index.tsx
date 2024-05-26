import Breadcrumb from '../../../components/Breadcrumb';
import CategoryTable from '../../../components/Table/CategoryTable';

const CategoryManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Category Management" />

      <div className="flex flex-col gap-10">
        <CategoryTable />
      </div>
    </>
  );
};

export default CategoryManagement;
