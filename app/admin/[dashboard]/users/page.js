import DashboardUsers from "@/components/admin/dashboardUsers";
import { getUsers } from "@/lib/db";

const Page = () => {
  const users = getUsers();

  return (
    <div className="wrapper p-5">
      <DashboardUsers users={users} />
    </div>
  );
};

export default Page;
