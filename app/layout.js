import "./globals.css";

export const metadata = {
  title: "Delicious meals",
  description: "Place where you can find most delicious meals and enjoy it!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
