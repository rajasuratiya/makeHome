import React from "react";

export default function TeamHero() {
  // Calculate increased padding for 20% more height (original: 100px top/bottom)
  // 20% more: 120px top/bottom
  return (
    <section className="flat-title-page hero-video-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <video
        src="/videos/aboutUs.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hero-bg-video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />
      <div className="hero-video-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 2,
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="title-page" style={{ textAlign: 'center', color: '#fff', padding: '160px 0 160px' }}>
              <h2 className="text-center" style={{ color: '#fff', fontWeight: 700, fontSize: 46, lineHeight: '58px' }}>Meet Our Expert Team</h2>
              <p className="text-center body-1 text-variant-1" style={{ color: '#fff', fontSize: 20, marginTop: 16 }}>
                Our dedicated professionals are here to guide you through every step of your real estate journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
