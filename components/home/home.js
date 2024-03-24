import "./home.css";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/icon.png";
import twitterLogo from "@/public/images/twitter.svg";
import linkedinLogo from "@/public/images/linkedin.svg";
import faceLogo from "@/public/images/face.svg";
import FooterNav from "./footerNav";
import OrderButton from "./orderButton";
import OnsaleMeals from "./onsaleMeals";

const Home = ({ onsaleMeals }) => {
  return (
    <div className="home">
      <div className="text-white hero">
        <div className="hero-content">
          <h1>MEAL TO GO</h1>
          <p>delicious food on your</p>
          <p>address within minutes!</p>
          <OrderButton />
        </div>
      </div>

      <div className="main">
        <div className="text-white">
          <h2 className="text-center">Currently with discount</h2>
          <OnsaleMeals onsaleMeals={onsaleMeals} />
        </div>

        <div className="container-fluid d-flex text-white gap-5 justify-content-center align-items-center about">
          <h2 id="about">About us</h2>
          <div>
            <p>
              At Meal to Go, we believe that great food should be within
              everyone's reach, no matter how busy life gets. Founded with a
              passion for culinary excellence and convenience, we're your go-to
              destination for mouthwatering meals delivered right to your
              doorstep.
            </p>
            <p>
              Our mission is simple: to provide you with a hassle-free dining
              experience that tantalizes your taste buds and fits seamlessly
              into your lifestyle. Whether you're craving hearty comfort food,
              fresh salads bursting with flavor, or gourmet delicacies to treat
              yourself, we've got you covered.
            </p>
          </div>
        </div>

        <footer className="d-flex text-white justify-content-between container">
          <div className="d-flex flex-column justify-content-between">
            <Link href="/">
              <Image
                src={logoImage}
                alt="Meal to go logo image"
                width={50}
                height={50}
              />
            </Link>
            <p className="footer-text">
              Delicious food on your address within minutes!
            </p>

            <p className="mt-5">© 2024 Meal to go. All Rights Reserved.</p>
          </div>

          <div className="d-flex flex-column justify-content-between h-100">
            <h6 className="mt-3">NAVIGATION</h6>
            <FooterNav />

            <div className="d-flex gap-2">
              <Image src={twitterLogo} alt="Twitter logo" />
              <Image src={linkedinLogo} alt="Linkedin logo" />
              <Image src={faceLogo} alt="Facebook logo" />
            </div>
          </div>

          <div className="d-flex flex-column justify-content-between h-100">
            <h6 className="mt-3">CONTACT</h6>

            <ul className="list-unstyled m-0">
              <li>
                <p>ADDRESS</p>
                3517 W. Gray St. Utica, Pennsylvania 57867
              </li>
              <li>
                <p>EMAIL</p>
                info@mealtogo.com
              </li>
              <li>
                <p>PHONES</p>
                (808) 555-0111 or (303) 555-0105
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
