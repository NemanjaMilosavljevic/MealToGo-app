import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "@/components/header/mainHeader";
import BootstrapClient from "@/components/bootstrapClient";
import "./globals.css";
import { getOrders, getTotalPrice } from "@/lib/db";

export const metadata = {
  title: "Delicious meals",
  description: "Place where you can find most delicious meals and enjoy it!",
};

export default function RootLayout({ children }) {
  const orders = getOrders();
  const totalPrice = getTotalPrice().price;

  return (
    <html lang="en">
      <body id="body">
        <MainHeader orders={orders} totalPrice={totalPrice} />
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
