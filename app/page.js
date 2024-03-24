import Home from "@/components/home/home";
import { getOnsaleMeals } from "@/lib/db";

export default function Page() {
  const onsaleMeals = getOnsaleMeals(1);

  return <Home onsaleMeals={onsaleMeals} />;
}
