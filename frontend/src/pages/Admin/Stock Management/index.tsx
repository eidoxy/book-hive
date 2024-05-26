import Breadcrumb from '../../../components/Breadcrumb';
import StockTable from '../../../components/Table/StockTable';

const StockManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Stock Management" />

      <div className="flex flex-col gap-10">
        <StockTable />
      </div>
    </>
  );
};

export default StockManagement;
