import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, state, useEffect } from "react";

const AboutAs = () => {
    return (
        <div id="content">
            <div
                style={{
                    width: "100%",
                    marginLeft: "100px",
                    marginTop: "50px",
                }}
                className="container"
            >
                <div
                    className="block-heading"
                    style={{
                        marginLeft: "350px",
                    }}
                >
                    <h2 style={{ marginLeft: "130px" }}>About Us</h2>
                    <p>
                        Two friends joined forces to streamline the rental
                        industry, <br />
                        making it incredibly user-friendly and accessible for
                        all. <br />
                        Embracing our passion for blockchain technologies, we
                        <br />
                        are excited to share its potential with all of you. ♥
                    </p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-center clean-card">
                            <img
                                className="card-img-top w-100 d-block"
                                src={require("../assets/images/spring.png")}
                            />
                            <div className="card-body info">
                                <h4 className="card-title">Yarden Hovav</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card text-center clean-card">
                            <img
                                className="card-img-top w-100 d-block"
                                src={require("../assets/images/reading-book.png")}
                            />
                            <div className="card-body info">
                                <h4 className="card-title">Chen Ben Tolila</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 style={{ marginTop: "50px" }}>Terms and Conditions</h2>
                    <div class="faq-item">
                        <h4 class="question" style={{ fontWeight: "bold" }}>
                            <strong>Deliveries and Orders</strong>
                            <br />
                        </h4>
                        <p>
                            To help determine if your connection is secure, look
                            at the status bar of your browser window. If you see
                            an unbroken key or a closed lock (depending on your
                            browser), Secure Sockets Layer (SSL) should be
                            active, which helps to protect the transmission of
                            information through the website. You should also
                            verify that the URL for the page you are on includes
                            &quot;https&quot; at the beginning. Most browsers
                            offer additional security alerts as well.
                            <br />
                        </p>
                    </div>
                    <div class="faq-item">
                        <h4 class="question" style={{ fontWeight: "bold" }}>
                            <strong>Cancel Transaction</strong>
                            <br />
                        </h4>
                        <p>
                            You can request to cancel your order within a short
                            time period after placing your order. To cancel your
                            order, sign in to your account, find the order in
                            your purchases, click &quot;Details&quot; and then
                            click &quot;Cancel Order&quot; to start the request
                            process. If the &quot;Cancel Order&quot; button is
                            disabled, the window to cancel has passed and your
                            order is not eligible for cancellation. We&#39;re
                            unable to cancel an order beyond this time
                            period.Your payment method will not be charged if we
                            are able to cancel your order. If we&#39;re unable
                            to cancel your order, your payment method will be
                            charged and your items will be shipped to you.
                            <br />
                        </p>
                    </div>
                    <div class="faq-item">
                        <h4 class="question" style={{ fontWeight: "bold" }}>
                            <strong>Return policy</strong>
                            <br />
                        </h4>
                        <p>
                            We handle returns on a case-by-case basis with the
                            ultimate goal of making our customers happy. We
                            stand behind our goods and services, and want
                            customers to be satisfied with them. We&#39;ll
                            always do our best to take care of customers—our
                            philosophy is to deal with them fairly and
                            reasonably. We have long believed that when we treat
                            our customers fairly, they in turn are fair with us.
                            We apply refunds to the tender with which returned
                            items were purchased.
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutAs;
