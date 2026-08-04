import type { Metadata } from "next";
import { RoomDetail } from "@/components/room-detail";
import { roomBySlug } from "@/lib/hotel-content";

const room = roomBySlug("triple");

export const metadata: Metadata = {
  title: "Habitación triple en La Perla",
  description: room.description,
  alternates: { canonical: "/habitaciones/triple" },
  openGraph: { title: `${room.shortName} | Hotel Bermudas`, description: room.description, url: "/habitaciones/triple", images: [{ url: room.image, alt: room.imageAlt }] },
};

export default function TripleRoomPage() {
  return <RoomDetail room={room} />;
}
