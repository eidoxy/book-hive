import Breadcrumb from '../../../components/Breadcrumb';
import MemberTable from '../../../components/Table/MemberTable';

const MemberManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Member Management" />

      <div className="flex flex-col gap-10">
        <MemberTable />
      </div>
    </>
  );
};

export default MemberManagement;
