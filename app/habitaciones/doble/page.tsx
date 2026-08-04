import type { Metadata } from "next";
import { RoomDetail } from "@/components/room-detail";
import { roomBySlug } from "@/lib/hotel-content";

const room = roomBySlug("doble");

export const metadata: Metadata = {
  title: "Habitación doble en Mar del Plata",
  description: room.description,
  alternates: { canonical: "/habitaciones/doble" },
  openGraph: { title: `${room.shortName} | Hotel Bermudas`, description: room.description, url: "/habitaciones/doble", images: [{ url: room.image, alt: room.imageAlt }] },
};

export default function DoubleRoomPage() {
  return <RoomDetail room={room} />;
}
