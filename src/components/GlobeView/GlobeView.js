import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const GlobeView = ({ location, theme }) => {
  const globeEl = useRef();

  const dayTexture = "/textures/world.jpg";
  const nightTexture = "/textures/world_2.jpg";
  const bumpTexture = "//unpkg.com/three-globe/example/img/earth-topology.png";

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    setMarkers([
      {
        id: Date.now(),
        lat: location.lat,
        lng: location.lon,
        size: 0.4,
        color: "red",
        label: location.name,
      },
    ]);
    globeEl.current?.pointOfView(
      { lat: location.lat, lng: location.lon, altitude: 1.5 },
      2000
    );
  }, [location]);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().enableZoom = false;
    }

    const interval = setInterval(() => {
      setMarkers((prev) =>
        prev.map((m) => ({
          ...m,
          size: 0.4 + Math.abs(Math.sin(Date.now() / 300)) * 0.1,
        }))
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`card ${
        theme === "dark" ? "text-white bg-dark" : "text-dark bg-light"
      } shadow-sm `}
    >
      <div className="card-body p-0" style={{ height: "20rem" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Globe
            ref={globeEl}
            globeImageUrl={theme === "dark" ? dayTexture : nightTexture}
            bumpImageUrl={bumpTexture}
            backgroundColor="rgba(0,0,0,0)"
            pointsData={markers}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude={0}
            pointRadius="size"
            pointLabel="label"
            width={460}
            height={240}
            atmosphereColor="rgba(0,0,0,0)"
            atmosphereAltitude={0}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobeView;
