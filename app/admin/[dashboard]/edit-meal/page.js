import AdminForm from "@/components/admin/adminForm";
import { getMeal } from "@/lib/db";

const Page = ({ searchParams }) => {
  const meal = getMeal(searchParams.mealId);

  return <AdminForm editMode={true} editingMeal={meal} />;
};

export default Page;
