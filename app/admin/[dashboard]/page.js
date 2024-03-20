import Users from "@/components/admin/users";
import Meals from "@/components/admin/meals";
import "../../globals.css";

const Page = () => {
  return (
    <div className="container-fluid d-flex w-50 justify-content-evenly wrapper">
      <Users />
      <Meals />
    </div>
  );
};

export default Page;
