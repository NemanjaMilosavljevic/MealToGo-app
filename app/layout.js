import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "@/components/mainHeader";
import BootstrapClient from "@/components/bootstrapClient";
import "./globals.css";

export const metadata = {
  title: "Delicious meals",
  description: "Place where you can find most delicious meals and enjoy it!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="body">
        <MainHeader />
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
