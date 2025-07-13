"use client";
// import {
//   GoogleMap,
//   OverlayView,
//   useLoadScript,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { useMemo, useState } from "react";

// const contactItems = [
//   {
//     lat: 32.411201277163975,
//     long: -96.12394824867293,
//     title: "Office address",
//     imageSrc: "/images/banner/contact.jpg",
//     info: [
//       {
//         iconClass: "icon icon-map-trifold",
//         text: "101 E 129th St, East Chicago, IN 46312, US",
//       },
//       {
//         iconClass: "icon icon-phone-line",
//         text: "1-333-345-6868",
//       },
//       {
//         iconClass: "icon icon-mail-line",
//         text: "themesflat@gmail.com",
//       },
//     ],
//   },
//   // Add more objects here for additional contact items
// ];

// const option = {
//   zoomControl: true,
//   disableDefaultUI: true,
//   scrollwheel: false,
//   styles: [
//     {
//       featureType: "all",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           weight: "2.00",
//         },
//       ],
//     },
//     {
//       featureType: "all",
//       elementType: "geometry.stroke",
//       stylers: [
//         {
//           color: "#9c9c9c",
//         },
//       ],
//     },
//     {
//       featureType: "all",
//       elementType: "labels.text",
//       stylers: [
//         {
//           visibility: "on",
//         },
//       ],
//     },
//     {
//       featureType: "landscape",
//       elementType: "all",
//       stylers: [
//         {
//           color: "#f2f2f2",
//         },
//       ],
//     },
//     {
//       featureType: "landscape",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#ffffff",
//         },
//       ],
//     },
//     {
//       featureType: "landscape.man_made",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#ffffff",
//         },
//       ],
//     },
//     {
//       featureType: "poi",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "all",
//       stylers: [
//         {
//           saturation: -100,
//         },
//         {
//           lightness: 45,
//         },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#eeeeee",
//         },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           color: "#7b7b7b",
//         },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           color: "#ffffff",
//         },
//       ],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//       ],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "labels.icon",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "transit",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "all",
//       stylers: [
//         {
//           color: "#46bcec",
//         },
//         {
//           visibility: "on",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#c8d7d4",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           color: "#070707",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           color: "#ffffff",
//         },
//       ],
//     },
//   ],
// };
// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };
export default function ContactMap() {
  // const [getLocation, setLocation] = useState(null);

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyAAz77U5XQuEME6TpftaMdX0bBelQxXRlM",
  // });
  // const center = useMemo(
  //   () => ({ lat: 32.411201277163975, lng: -96.12394824867293 }),
  //   []
  // );

  // const CustomMarker = ({ elm }) => {
  //   return (
  //     <div className="marker-container" onClick={() => setLocation(elm)}>
  //       <div className="marker-card">
  //         <div className="front face">
  //           <div />
  //         </div>
  //         <div className="back face">
  //           <div />
  //         </div>
  //         <div className="marker-arrow" />
  //       </div>
  //     </div>
  //   );
  // };

  // close handler
  // const closeCardHandler = () => {
  //   setLocation(null);
  // };

  return (
    <>
      <div className=" px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="map overflow-hidden w-full" style={{ height: "70vh" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.965149459954!2d77.4344158!3d28.600822299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef29ba0e1a4f%3A0x63538614dd1688af!2sNX%20One%20Avenue.!5e0!3m2!1sen!2sin!4v1740156324506!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    </>
  );
}
