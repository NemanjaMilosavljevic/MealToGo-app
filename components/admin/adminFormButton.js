import { useFormStatus } from "react-dom";
import "./admin.css";

const AdminFormButton = ({ editMode }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn ${pending ? "button-pending" : "button-admin"}`}
    >
      {pending && !editMode
        ? "Creating..."
        : pending && editMode
        ? "Editing..."
        : !pending && !editMode
        ? "Create meal"
        : !pending && editMode
        ? "Edit meal"
        : ""}
    </button>
  );
};

export default AdminFormButton;
