"use client";

import Image from "next/image";
import { Phone } from 'lucide-react';

export default function WhatsappIcon() {
  return (
    <>
      {/* Phone Icon Button */}
      <a
        className="phone-wrap"
        href="tel:+918860460544"
        style={{
          position: 'fixed',
          bottom: 100,
          left: 32,
          cursor: 'pointer',
          display: 'block',
          zIndex: 100,
          transition: 'all 400ms linear',
        }}
        title="Call +91 88-604-605-44"
      >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #006ac1', borderRadius: '100px', padding: '8px', backgroundColor: 'white'}}>
          <Phone color={'#006ac1'} size={22} strokeWidth={3}/>
        </div>
      </a>
      {/* WhatsApp Icon Button */}
      <a className={`whatsapp-wrap`} href="https://wa.me/918860460544" target="_blank">
        <Image src={"/images/social/whatsapp.svg"} width={50} height={50} alt="Whatsapp Image" />
      </a>
    </>
  );
}
