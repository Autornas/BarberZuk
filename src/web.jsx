import Header from "./components/Header/Header.jsx";
import Booking from "./Components/Booking/Booking.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./Web.css";


function Web() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Booking />
      </div>
      <Footer />
    </>
  );
}

export default Web;