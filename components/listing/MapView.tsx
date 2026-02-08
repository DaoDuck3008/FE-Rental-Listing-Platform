"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { formatVietnamesePrice } from "@/utils";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  address: string;
  price: number;
  latitude?: number;
  longitude?: number;
  images?: { image_url: string }[];
  area?: number;
}

interface MapViewProps {
  listings: Listing[];
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 21.0285,
  lng: 105.8542,
};

export default function MapView({ listings }: MapViewProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const listingsWithCoords = listings?.filter(
    (listing) => listing.latitude && listing.longitude
  );

  useEffect(() => {
    if (listingsWithCoords && listingsWithCoords.length > 0) {
      const firstListing = listingsWithCoords[0];
      if (firstListing.latitude && firstListing.longitude) {
        setMapCenter({
          lat: firstListing.latitude,
          lng: firstListing.longitude,
        });
      }
    }
  }, [listings]);

  const formatPrice = (price: number) => {
    const millions = price / 1000000;
    return millions >= 1
      ? `${millions.toFixed(1)} tr`
      : `${(price / 1000).toFixed(0)}k`;
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Bản đồ đang tải...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={(map) => setMap(map)}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {listingsWithCoords?.map((listing) => (
          <OverlayView
            key={listing.id}
            position={{
              lat: listing.latitude!,
              lng: listing.longitude!,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="relative flex flex-col items-center">
              {selectedListing?.id === listing.id && (
                <Link
                  target="_blank"
                  href={`/listing-detail/${listing.id}`}
                  className="absolute bottom-full mb-4 w-64 bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 z-50"
                >
                  <div
                    className="h-32 w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${
                        listing.images?.[0]?.image_url || "/placeholder.png"
                      }')`,
                    }}
                  />
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-primary font-extrabold text-base">
                        {formatVietnamesePrice(listing.price)}
                      </span>
                      {listing.area && (
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {listing.area} m²
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 text-xs font-bold truncate">
                      {listing.title}
                    </p>
                    <p className="text-slate-500 text-[10px] truncate">
                      {listing.address}
                    </p>
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
                </Link>
              )}

              {/* Price Pin */}
              <div
                onClick={() =>
                  setSelectedListing(
                    selectedListing?.id === listing.id ? null : listing
                  )
                }
                className={`${
                  selectedListing?.id === listing.id
                    ? "bg-primary text-white ring-4 ring-white scale-110"
                    : "bg-white hover:bg-primary hover:text-white text-text-main"
                } font-bold text-sm px-3 py-1.5 rounded-full shadow-md cursor-pointer transition-all relative z-10 whitespace-nowrap`}
              >
                {formatPrice(listing.price)}
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${
                    selectedListing?.id === listing.id
                      ? "bg-primary"
                      : "bg-white"
                  } rotate-45 transition-colors`}
                />
              </div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-bottom-4 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
