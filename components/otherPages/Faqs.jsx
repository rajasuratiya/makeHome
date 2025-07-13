import React from "react";

export default function Faqs() {
  return (
    <section className="flat-section">
      <div className="container">
        <div className="tf-faq">
          <h3 className="fw-8 text-center title">Frequently Asked Questions</h3>
          <ul className="box-faq" id="wrapper-faq">
            <li className="faq-item">
              <a
                href="#accordion-faq-one"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-one"
              >
                What kind of charges/taxes is mandatory at the time of
                purchasing property?
              </a>
              <div
                id="accordion-faq-one"
                className="collapse"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  In addition to the price of the property, the buyer needs to
                  pay the GST, Registration Fee, Stamp Duty while buying a
                  property.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion-faq-two"
                className="faq-header"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-two"
              >
                What documents and formalities are required while buying
                property?
              </a>
              <div
                id="accordion-faq-two"
                className="collapse show"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  Real Estate Regulatory Act (RERA) has made it easier to check
                  the documents while buying property. If the project has RERA
                  Number, all details like approved maps, number of floors,
                  parking space, payment status against land, open area, green
                  area, fire fighting, environment, height, pollution NOC,
                  possession date etc can be checked at https://www.up-rera.in
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion-faq-three"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-three"
              >
                Things you should check at the time of signing the agreement?
              </a>
              <div
                id="accordion-faq-three"
                className="collapse"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  Before signing the builder buyer agreement, the buyer should
                  check the details like base price mentioned, additional
                  charges like PLC, club membership, carpet area along with
                  facilities, taxes applicable, payment mode, occupation
                  certificate, building insurance, schedule of possession and
                  penalty clause in case of project delay.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion-faq-four"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-four"
              >
                What should a consumer keep in mind while purchasing a house?
              </a>
              <div
                id="accordion-faq-four"
                className="collapse"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  There are many factors to be considered at the time of
                  property purchase like the locality or the area of the home,
                  whether all the basic and civic utilities are available,
                  transport facilities, construction quality, the carpet,
                  built-up and super built-up area of the flat, provisions of
                  basic features like water and power supply, and most
                  importantly, reputation of the developer.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion-faq-five"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-five"
              >
                What is stamp duty?
              </a>
              <div
                id="accordion-faq-five"
                className="collapse"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  Stamp duty refers to the tax paid to the government and should
                  be paid on time and in full. A stamp duty paid document is an
                  important and legal instrument to be taken care of.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion-faq-six"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion-faq-six"
              >
                How can a buyer be protected if the project is delayed?
              </a>
              <div
                id="accordion-faq-six"
                className="collapse"
                data-bs-parent="#wrapper-faq"
              >
                <p className="faq-body">
                  The buyer is entitled to get the delayed penalty as per the
                  builder buyer agreement issued in the format prescribed by
                  RERA.
                </p>
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="tf-faq">
          <h3 className="fw-8 text-center title">Costs and Payments</h3>
          <ul className="box-faq" id="wrapper-faq-two">
            <li className="faq-item">
              <a
                href="#accordion2-faq-one"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-one"
              >
                How do you calculate fees?
              </a>
              <div
                id="accordion2-faq-one"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion2-faq-two"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-two"
              >
                How do I pay Message?
              </a>
              <div
                id="accordion2-faq-two"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordio2-faq-three"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-three"
              >
                Are there opportunities for discounts or promotions?
              </a>
              <div
                id="accordio2-faq-three"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion2-faq-four"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-four"
              >
                Are there any hidden fees not displayed in the pricing table?
              </a>
              <div
                id="accordion2-faq-four"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion2-faq-five"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-five"
              >
                What is the refund procedure?
              </a>
              <div
                id="accordion2-faq-five"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion2-faq-six"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion2-faq-six"
              >
                Is there financial or accounting support?
              </a>
              <div
                id="accordion2-faq-six"
                className="collapse"
                data-bs-parent="#wrapper-faq-two"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="tf-faq">
          <h3 className="fw-8 text-center title">Safety and Security</h3>
          <ul className="box-faq" id="wrapper-faq-three">
            <li className="faq-item">
              <a
                href="#accordion3-faq-one"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-one"
              >
                What languages does your service support?
              </a>
              <div
                id="accordion3-faq-one"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion3-faq-two"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-two"
              >
                How do I integrate your service into my system?
              </a>
              <div
                id="accordion3-faq-two"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordio3-faq-three"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-three"
              >
                What are the safety features of your system?
              </a>
              <div
                id="accordio3-faq-three"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion3-faq-four"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-four"
              >
                How can I request new features?
              </a>
              <div
                id="accordion3-faq-four"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion3-faq-five"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-five"
              >
                Is my data protected?
              </a>
              <div
                id="accordion3-faq-five"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
            <li className="faq-item">
              <a
                href="#accordion3-faq-six"
                className="faq-header collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="accordion3-faq-six"
              >
                How do I report a technical issue?
              </a>
              <div
                id="accordion3-faq-six"
                className="collapse"
                data-bs-parent="#wrapper-faq-three"
              >
                <p className="faq-body">
                  Once your account is set up and you've familiarized yourself
                  with the platform, you are ready to start using our services.
                  Whether it's accessing specific features, making transactions,
                  or utilizing our tools, you'll find everything you need at
                  your fingertips.
                </p>
              </div>
            </li>
          </ul>
        </div> */}
      </div>
    </section>
  );
}
