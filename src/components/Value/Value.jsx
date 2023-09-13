import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import "./Value.css";
import data from "../../utils/accordion";

function Value() {
  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        <div className="flexCenter v-first">
          <div className="image-container">
            <img src="./img/value.png" alt="" />
          </div>
        </div>
        <div className="flexColStart v-second">
          <p className="orangeText">Our Value</p>
          <p className="primaryText">Value We Give To You</p>
          <p className="secondaryText">
            We believe a good place to live can make your life better
          </p>

          <Accordion
            className="accordion"
            allowMultipleExpanded={false}
            preExpanded={[0]}
          >
            {data.map(({ id, icon, heading, detail }, index) => {
              return (
                <AccordionItem className="accordionItem" key={id} uuid={index}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordionButton">
                      <AccordionItemState>
                        {({ expanded }) => (expanded ? true : false)}
                      </AccordionItemState>
                      <div className="flexCenter icon">{icon}</div>
                      <p className="primaryText">{heading}</p>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Value;
