import { useFormStatus } from "react-dom";

const AdminFormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn ${pending ? "btn-secondary" : "btn-primary"}`}
    >
      {pending ? "Creating..." : "Create meal"}
    </button>
  );
};

export default AdminFormButton;
