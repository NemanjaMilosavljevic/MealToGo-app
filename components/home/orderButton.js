"use client";

import useClientSession from "@/hooks/useClientSession";
import { usePathname, useRouter } from "next/navigation";

const OrderButton = () => {
  const router = useRouter();
  const path = usePathname();
  const [session] = useClientSession(path);

  const orderHandler = () => {
    if (!session) {
      router.replace("/login");
      return;
    }

    router.push("/meals");
  };
  return <button onClick={orderHandler}>Order now</button>;
};

export default OrderButton;
