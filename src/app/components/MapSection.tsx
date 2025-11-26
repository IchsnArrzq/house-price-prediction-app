"use client";

import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { LocationPoint } from "../types";

type Props = {
  locations: LocationPoint[];
  mapCenter: [number, number];
  isMapLoading: boolean;
  mapError: string | null;
  selectedCity: string;
};

export default function MapSection({
  locations,
  mapCenter,
  isMapLoading,
  mapError,
  selectedCity,
}: Props) {
  const markerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Peta properti Jabodetabek</h2>
            </div>
            <div className="text-right">
              <div className="badge badge-outline badge-lg">
                {selectedCity || "Semua kota"}
              </div>
            </div>
          </div>

          {mapError && (
            <div role="alert" className="alert alert-error">
              <span className="font-bold">Peta bermasalah</span>
              <span>{mapError}</span>
            </div>
          )}

          <div className="relative h-[440px] overflow-hidden rounded-box border border-base-300">
            <MapContainer
              center={mapCenter}
              zoom={11}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc, index) => (
                <Marker
                  key={`${loc.lat}-${loc.long}-${index}`}
                  position={[loc.lat, loc.long]}
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">{loc.title}</p>
                      <p className="text-xs text-base-content/70">
                        {loc.district}, {loc.city}
                      </p>
                      <p className="text-xs">
                        Lat: {loc.lat.toFixed(4)}, Long: {loc.long.toFixed(4)}
                      </p>
                      <p className="badge badge-outline badge-sm">
                        Rp {loc.price_in_rp.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            {isMapLoading && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-base-100/70 backdrop-blur-sm">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
          <p className="text-xs text-base-content/60">
            Menampilkan maksimum 400 titik. Tambahkan kota pada formulir untuk
            memfokuskan peta dan menampilkan titik sesuai kota.
          </p>
        </div>
      </div>
    </div>
  );
}
