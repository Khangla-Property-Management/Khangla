"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, MapPin, Images } from "lucide-react";

type ImgSlot = { file?: File; preview?: string };

const COLORS = {
  primary: "#547794",
  bg: "#F6F3EE",
  panel: "#FFFFFF",
  muted: "#C2C9CD",
};

export default function PostPage() {
  const router = useRouter();
  const params = useSearchParams();
  const unitId = params.get("unitId") || "—";
  const floor = params.get("floor") || "—";

  // image uploads
  const [images, setImages] = React.useState<ImgSlot[]>([{}, {}, {}]);
  const fileInputs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  const onFileChange =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const next = [...images];
      next[idx] = { file: f, preview: URL.createObjectURL(f) };
      setImages(next);
    };

  const handleDrop = (idx: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const next = [...images];
    next[idx] = { file: f, preview: URL.createObjectURL(f) };
    setImages(next);
  };

  // form fields
  const [locationName, setLocationName] = React.useState("Lower Motithang");
  const [price, setPrice] = React.useState<string>("10000");
  const [description, setDescription] = React.useState<string>("");
  const [coords, setCoords] = React.useState<[number, number]>([
    27.476618, 89.618583,
  ]); // from screenshot

  const onSubmit = async () => {
    // ...existing code...
    // TODO: replace with your API call
    const payload = {
      unitId,
      floor,
      locationName,
      price: Number(price),
      description,
      coords,
      imagesMeta: images.map((i) => ({
        name: i.file?.name,
        size: i.file?.size,
      })),
    };
    console.log("Post payload:", payload);
    alert("Listing prepared. Hook up your API in onSubmit.");
    router.push("/owner"); // navigate back or wherever you want
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.title}>Create a listing</div>
          <div style={styles.subTitle}>
            Unit {unitId} • Floor {floor}
          </div>
        </div>
        <button style={styles.secondaryBtn} onClick={() => router.back()}>
          Back
        </button>
      </div>

      <div style={styles.grid}>
        {/* Images card */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <Images size={18} color={COLORS.primary} />
            <span>Photos</span>
          </div>

          <div style={styles.imagesRow}>
            <ImageSlot
              big
              slot={images[0]}
              onPick={() => fileInputs[0].current?.click()}
              onDrop={handleDrop(0)}
              onDragOver={(e) => e.preventDefault()}
            />
            <div style={styles.sideSlots}>
              <ImageSlot
                slot={images[1]}
                onPick={() => fileInputs[1].current?.click()}
                onDrop={handleDrop(1)}
                onDragOver={(e) => e.preventDefault()}
              />
              <ImageSlot
                slot={images[2]}
                onPick={() => fileInputs[2].current?.click()}
                onDrop={handleDrop(2)}
                onDragOver={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* hidden inputs */}
          <input
            ref={fileInputs[0]}
            type="file"
            accept="image/*"
            onChange={onFileChange(0)}
            hidden
          />
          <input
            ref={fileInputs[1]}
            type="file"
            accept="image/*"
            onChange={onFileChange(1)}
            hidden
          />
          <input
            ref={fileInputs[2]}
            type="file"
            accept="image/*"
            onChange={onFileChange(2)}
            hidden
          />
        </section>

        {/* Map + fields card */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <MapPin size={18} color={COLORS.primary} />
            <span>Location & Details</span>
          </div>

          <div style={styles.mapWrap}>
            <MapPicker coords={coords} onChange={setCoords} />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Location</label>
            <input
              style={styles.input}
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. Lower Motithang"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Monthly price (Nu.)</label>
            <input
              style={styles.input}
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="10000"
            />
          </div>

          <div style={styles.formRow}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the unit, amenities, and terms..."
            />
          </div>

          <div style={styles.coordsRow}>
            <span style={styles.coordsText}>
              Location: {coords[0].toFixed(6)}, {coords[1].toFixed(6)}
            </span>
          </div>

          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={onSubmit}>
              post
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* Image slot */
function ImageSlot({
  slot,
  big,
  onPick,
  onDrop,
  onDragOver,
}: {
  slot: ImgSlot;
  big?: boolean;
  onPick: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onClick={onPick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        ...styles.imgSlot,
        ...(big ? styles.imgSlotBig : styles.imgSlotSmall),
        backgroundImage: slot.preview ? `url(${slot.preview})` : "none",
      }}
      title="Click or drag a photo here"
    >
      {!slot.preview && (
        <div style={styles.plusWrap}>
          <Plus size={28} color="#0f172a" />
        </div>
      )}
    </div>
  );
}

/* Map picker using Leaflet via CDN */
function MapPicker({
  coords,
  onChange,
}: {
  coords: [number, number];
  onChange: (c: [number, number]) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let map: any;
    let marker: any;
    const init = () => {
      // @ts-ignore
      const L = (window as any).L;
      if (!ref.current || !L) return;
      map = L.map(ref.current).setView(coords, 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);
      marker = L.marker(coords).addTo(map);

      map.on("click", (e: any) => {
        const c: [number, number] = [e.latlng.lat, e.latlng.lng];
        marker.setLatLng(c);
        onChange(c);
      });
    };

    // load Leaflet CSS/JS once
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const jsId = "leaflet-js";
    if (!(window as any).L) {
      const script = document.createElement("script");
      script.id = jsId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = init;
      document.body.appendChild(script);
    } else {
      init();
    }

    return () => {
      // cleanup
      if (map) {
        map.off();
        map.remove();
      }
    };
  }, [coords, onChange]);

  return <div ref={ref} style={styles.mapBox} />;
}

/* styles */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: COLORS.bg,
    padding: "18px",
    color: COLORS.primary,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: 4 },
  title: { fontSize: 18, fontWeight: 700 },
  subTitle: { fontSize: 12.5, color: "#6B7C88" },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 12,
  },
  card: {
    background: COLORS.panel,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    marginBottom: 10,
    color: COLORS.primary,
  },

  imagesRow: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    gap: 10,
  },
  sideSlots: { display: "grid", gridTemplateRows: "1fr 1fr", gap: 10 },

  imgSlot: {
    border: `2px dashed ${COLORS.muted}`,
    borderRadius: 12,
    background: "#e5e7eb",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  imgSlotBig: { height: 190 },
  imgSlotSmall: { height: 90 },
  plusWrap: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mapWrap: { marginBottom: 10 },
  mapBox: {
    height: 200,
    borderRadius: 10,
    border: `1px solid ${COLORS.muted}`,
    overflow: "hidden",
  },

  formRow: { display: "flex", flexDirection: "column", gap: 6, marginTop: 8 },
  label: { fontSize: 12, color: "#6B7C88" },
  input: {
    height: 36,
    borderRadius: 8,
    border: `1px solid ${COLORS.muted}`,
    padding: "0 10px",
    background: "#fff",
    color: COLORS.primary,
  },
  textarea: {
    borderRadius: 8,
    border: `1px solid ${COLORS.muted}`,
    padding: "8px 10px",
    background: "#fff",
    color: COLORS.primary,
    resize: "vertical",
  },

  coordsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ECEDEE",
    borderRadius: 8,
    padding: "8px 10px",
    marginTop: 8,
  },
  coordsText: { fontSize: 12.5, color: "#4b5563" },

  actions: { display: "flex", justifyContent: "flex-end", marginTop: 10 },
  primaryBtn: {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },
  secondaryBtn: {
    background: "#fff",
    color: COLORS.primary,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};
