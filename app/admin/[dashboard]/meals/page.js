import DashboardMeals from "@/components/admin/dashboardMeals";
import { getMeals } from "@/lib/db";

const Page = () => {
  const meals = getMeals();
  return (
    <div className="wrapper p-5">
      <DashboardMeals meals={meals} />;
    </div>
  );
};

export default Page;
