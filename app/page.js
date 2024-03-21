import Home from "@/components/home/home";
import { getUsers } from "@/lib/db";

export default function Page() {
  const users = getUsers();
  console.log(users);
  return <Home />;
}
