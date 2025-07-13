"use client";
import {useEffect} from "react";
import "../public/scss/styles.scss";
import "photoswipe/dist/photoswipe.css";
import "react-modal-video/scss/modal-video.scss";
import "rc-slider/assets/index.css";
import {usePathname} from "next/navigation";
import LoginModals from "@/components/modals/LoginModals";
import Register from "@/components/modals/Register";
import BackToTop from "@/components/common/BackToTop";
import WhatsappIcon from "@/components/common/WhatsappIcon";

export default function RootLayout({children}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    const {WOW} = require("wowjs");
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <html lang="en">
    <head>
      <meta name="google-site-verification" content="34G1Z2L0_fmG9G6keljZFv8YfdjLDbaL4z6wnZFNzwo"/>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SQ1D7SK9C4"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-SQ1D7SK9C4');
        </script>
        `,
        }}
      />
    </head>
    <body className="body">
    <div id="wrapper">
      <div id="pagee" className="clearfix">
        {children}
      </div>
    </div>
    <LoginModals/>
    <Register/>
    <BackToTop/>
    <WhatsappIcon/>
    </body>
    </html>
  );
}
