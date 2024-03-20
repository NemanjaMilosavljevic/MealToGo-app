import { useFormStatus } from "react-dom";
import "./admin.css";

const AdminFormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn ${pending ? "button-pending" : "button-admin"}`}
    >
      {pending ? "Creating..." : "Create meal"}
    </button>
  );
};

export default AdminFormButton;
