const https = require("https");
const fs = require("fs");
const path = require("path");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(d));
      })
      .on("error", reject);
  });
}

const africaNames = new Set([
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cameroon",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Cote d'Ivoire",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Swaziland",
  "Eswatini",
  "Tanzania",
  "United Republic of Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Western Sahara",
  "Zambia",
  "Zimbabwe",
]);

(async () => {
  const raw = await get(
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
  );
  const geo = JSON.parse(raw);

  const features = geo.features.filter((f) => {
    const n = f.properties.name || "";
    return africaNames.has(n);
  });
  console.log("countries", features.length);

  const chad = features.find((f) => f.properties.name === "Chad");
  if (!chad) throw new Error("Chad not found");

  const minLon = -20;
  const maxLon = 55;
  const minLat = -36;
  const maxLat = 38;
  const W = 800;
  const H = 900;
  const pad = 36;

  function project(lon, lat) {
    const x = pad + ((lon - minLon) / (maxLon - minLon)) * (W - pad * 2);
    const y = pad + ((maxLat - lat) / (maxLat - minLat)) * (H - pad * 2);
    return [x, y];
  }

  function simplifyRing(ring, step) {
    if (ring.length < 24) return ring;
    const out = [];
    for (let i = 0; i < ring.length; i += step) out.push(ring[i]);
    const first = ring[0];
    const last = out[out.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) out.push(first);
    return out;
  }

  function simplifyGeom(geom, step) {
    if (geom.type === "Polygon") {
      return {
        type: "Polygon",
        coordinates: geom.coordinates.map((r) => simplifyRing(r, step)),
      };
    }
    if (geom.type === "MultiPolygon") {
      return {
        type: "MultiPolygon",
        coordinates: geom.coordinates.map((poly) =>
          poly.map((r) => simplifyRing(r, step))
        ),
      };
    }
    return geom;
  }

  function ringToPath(ring) {
    return (
      ring
        .map((c, i) => {
          const [x, y] = project(c[0], c[1]);
          return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ") + " Z"
    );
  }

  function geomToPath(geom) {
    if (geom.type === "Polygon") {
      return geom.coordinates.map(ringToPath).join(" ");
    }
    if (geom.type === "MultiPolygon") {
      return geom.coordinates
        .map((poly) => poly.map(ringToPath).join(" "))
        .join(" ");
    }
    return "";
  }

  const countries = features.map((f) => {
    const g = simplifyGeom(f.geometry, 2);
    return {
      name: f.properties.name,
      d: geomToPath(g),
      isChad: f.properties.name === "Chad",
    };
  });

  let chadCx = 0;
  let chadCy = 0;
  let n = 0;
  function walk(coords) {
    for (const c of coords) {
      if (typeof c[0] === "number") {
        const [x, y] = project(c[0], c[1]);
        chadCx += x;
        chadCy += y;
        n++;
      } else walk(c);
    }
  }
  walk(chad.geometry.coordinates);
  chadCx /= n;
  chadCy /= n;

  const nodes = [
    { name: "Cairo", lon: 31.2, lat: 30.0 },
    { name: "Lagos", lon: 3.4, lat: 6.5 },
    { name: "Nairobi", lon: 36.8, lat: -1.3 },
    { name: "Johannesburg", lon: 28.0, lat: -26.2 },
    { name: "Casablanca", lon: -7.6, lat: 33.6 },
    { name: "Dakar", lon: -17.4, lat: 14.7 },
    { name: "Addis Ababa", lon: 38.7, lat: 9.0 },
    { name: "Kinshasa", lon: 15.3, lat: -4.3 },
    { name: "Cape Town", lon: 18.4, lat: -33.9 },
    { name: "Accra", lon: -0.2, lat: 5.6 },
    { name: "Khartoum", lon: 32.5, lat: 15.5 },
    { name: "Abidjan", lon: -4.0, lat: 5.3 },
  ].map((node) => {
    const [x, y] = project(node.lon, node.lat);
    return { name: node.name, x, y };
  });

  const out = {
    viewBox: `0 0 ${W} ${H}`,
    countries,
    chad: {
      d: countries.find((c) => c.isChad).d,
      cx: Number(chadCx.toFixed(1)),
      cy: Number(chadCy.toFixed(1)),
    },
    nodes,
  };

  const outPath = path.join(__dirname, "..", "src", "data", "africa-map.json");
  fs.writeFileSync(outPath, JSON.stringify(out));
  console.log(
    "written",
    countries.length,
    "countries, chad center",
    out.chad.cx,
    out.chad.cy,
    "bytes",
    fs.statSync(outPath).size
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
