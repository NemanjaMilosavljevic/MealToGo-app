import { getUsers } from "@/lib/meals";

export default function Home() {
  const users = getUsers();
  console.log(users);
  return <div className="text-success text-center my-5">HOME PAGE</div>;
}
