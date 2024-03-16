import Users from "@/components/admin/users";
import Meals from "@/components/admin/meals";

const Page = () => {
  return (
    <div className="container-fluid d-flex w-50 justify-content-evenly">
      <Users />
      <Meals />
    </div>
  );
};

export default Page;
