export function CardLight() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#2a2a3e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      <p style={{ color: "#888", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
        Przód — Wariant Jasny (Kremowy)
      </p>

      {/* Card front */}
      <div
        style={{
          width: "680px",
          height: "400px",
          background: "linear-gradient(135deg, #FDFAF4 0%, #F4EDD8 100%)",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(13,37,64,0.08)",
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Navy top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "#0D2540" }} />
        {/* Gold bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #C9A84C, #DBB993, #C9A84C)" }} />

        {/* Content */}
        <div style={{ flex: 1, padding: "54px 52px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Top: Company name + tagline */}
          <div>
            <div style={{
              fontSize: "26px",
              fontWeight: "700",
              letterSpacing: "4px",
              color: "#0D2540",
              fontFamily: "'Georgia', serif",
              lineHeight: 1,
            }}>
              FORSA DESIGN
            </div>
            <div style={{
              fontSize: "11px",
              color: "#8B6914",
              letterSpacing: "1px",
              marginTop: "7px",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}>
              Websites for Industrial & Trade Businesses
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))" }} />

          {/* Bottom: Person + contact */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#0D2540", fontFamily: "'Georgia', serif", letterSpacing: "0.5px" }}>
                Miro Potaczek
              </div>
              <div style={{ fontSize: "11px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginTop: "5px", fontWeight: "600" }}>
                Founder & Web Designer
              </div>
            </div>

            <div style={{ textAlign: "right", fontSize: "11px", color: "#4A5568", lineHeight: "1.9", letterSpacing: "0.3px" }}>
              <div>hello@forsadesign.co.uk</div>
              <div>07770 110 735</div>
              <div style={{ color: "#0D2540", fontWeight: "600" }}>forsadesign.co.uk</div>
              <div>Banff, Aberdeenshire, Scotland</div>
            </div>
          </div>

        </div>
      </div>

      {/* Card back */}
      <div
        style={{
          width: "680px",
          height: "400px",
          background: "#0D2540",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #C9A84C, #DBB993, #C9A84C)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #C9A84C, #DBB993, #C9A84C)" }} />
        <div style={{ textAlign: "center" }}>
          <img
            src="/logo-hero.png"
            alt="Forsa Design"
            style={{ width: "160px", height: "160px", objectFit: "contain", display: "block", margin: "0 auto" }}
          />
          <div style={{ width: "60px", height: "1px", background: "#C9A84C", margin: "12px auto" }} />
          <div style={{ fontSize: "10px", color: "rgba(219,185,147,0.5)", letterSpacing: "3px", textTransform: "uppercase" }}>
            forsadesign.co.uk
          </div>
        </div>
      </div>

      <p style={{ color: "#666", fontSize: "11px", marginTop: "8px" }}>
        Format druku: 85 × 55 mm · 300 DPI · Bleed 3 mm
      </p>
    </div>
  );
}
