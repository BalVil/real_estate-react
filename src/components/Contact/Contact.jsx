import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import "./Contact.css";

function Contact() {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        <div className="flexColStart c-first">
          <p className="orangeText">Our Contacts</p>
          <p className="primaryText">Easy to Contact Us</p>
          <p className="secondaryText">
            We always ready to help by providing the best servicesfor you.
          </p>

          <div className="flexColStart contactModes">
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <p className="primaryText">Call</p>
                    <p className="secondaryText">044 254 95 95</p>
                  </div>
                </div>
                <button className="flexCenter button">Call Now</button>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <p className="primaryText">Chat</p>
                    <p className="secondaryText">068 123 00 00</p>
                  </div>
                </div>
                <button className="flexCenter button">Chat Now</button>
              </div>
            </div>

            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <p className="primaryText">Video Call</p>
                    <p className="secondaryText">068 123 00 00</p>
                  </div>
                </div>
                <button className="flexCenter button">Video Call Now</button>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <p className="primaryText">Message</p>
                    <p className="secondaryText">068 123 00 00</p>
                  </div>
                </div>
                <button className="flexCenter button">Message Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="c-second">
          <div className="image-container">
            <img src="./img/contact.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
