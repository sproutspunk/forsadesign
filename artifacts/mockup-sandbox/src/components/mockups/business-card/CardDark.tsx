export function CardDark() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "sans-serif",
        padding: "40px",
      }}
    >
      <p style={{ color: "#666", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
        Przód — Wariant Ciemny (Navy)
      </p>

      {/* Card front */}
      <div
        style={{
          width: "680px",
          height: "400px",
          background: "#0D2540",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Gold left accent bar */}
        <div style={{ width: "6px", background: "linear-gradient(180deg, #C9A84C 0%, #DBB993 50%, #C9A84C 100%)", flexShrink: 0 }} />

        {/* Content */}
        <div style={{ flex: 1, padding: "44px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          {/* Top: Logo + tagline */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <img
              src="/logo-hero.png"
              alt="Forsa Design"
              style={{ width: "90px", height: "90px", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ paddingTop: "8px" }}>
              <div style={{
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "3px",
                color: "#C9A84C",
                fontFamily: "'Georgia', serif",
                lineHeight: 1,
              }}>
                FORSA DESIGN
              </div>
              <div style={{
                fontSize: "11px",
                color: "rgba(219,185,147,0.7)",
                letterSpacing: "1.5px",
                marginTop: "6px",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
              }}>
                Websites for Industrial & Trade Businesses
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.1))", margin: "0" }} />

          {/* Bottom: Person + contact */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#F0EBE1", fontFamily: "'Georgia', serif", letterSpacing: "0.5px" }}>
                Miro Potaczek
              </div>
              <div style={{ fontSize: "12px", color: "#C9A84C", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>
                Founder & Web Designer
              </div>
            </div>

            <div style={{ textAlign: "right", fontSize: "11px", color: "rgba(240,235,225,0.65)", lineHeight: "1.9", letterSpacing: "0.3px" }}>
              <div>hello@forsadesign.co.uk</div>
              <div>07770 110 735</div>
              <div>forsadesign.co.uk</div>
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
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{ width: "6px", background: "linear-gradient(180deg, #C9A84C 0%, #DBB993 50%, #C9A84C 100%)", position: "absolute", left: 0, top: 0, bottom: 0 }} />
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

      <p style={{ color: "#444", fontSize: "11px", marginTop: "8px" }}>
        Format druku: 85 × 55 mm · 300 DPI · Bleed 3 mm
      </p>
    </div>
  );
}
