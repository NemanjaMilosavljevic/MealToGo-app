import DashboardUsersLink from "@/components/admin/dashboardUsersLink";
import DashboardMealsLink from "@/components/admin/dashboardMealsLink";
import "../../globals.css";

const Page = () => {
  return (
    <div className="wrapper container-fluid">
      <h1 className="text-white text-center">Admin panel</h1>
      <div className="d-flex justify-content-center gap-5">
        <DashboardUsersLink />
        <DashboardMealsLink />
      </div>
    </div>
  );
};

export default Page;
