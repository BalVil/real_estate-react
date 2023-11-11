import "./Footer.css";

function Footer() {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        <div className="flexColStart f-first">
          <div className="logo-wrap__footer">
            <img src="/img/logo.svg" alt="logo" width={120} />
          </div>

          <p className="secondaryText">
            Our vision is to make people <br />
            the best place to live for them.
          </p>
        </div>

        <div className="flexColStart f-second">
          <p className="primaryText">Information</p>
          <p className="secondaryText">145 NewYork, FL 4571, USA</p>
          <div className="flexCenter f-menu">
            <p>Property</p>
            <p>Services</p>
            <p>Product</p>
            <p>About us</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
