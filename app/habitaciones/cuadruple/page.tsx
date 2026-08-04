import type { Metadata } from "next";
import { RoomDetail } from "@/components/room-detail";
import { roomBySlug } from "@/lib/hotel-content";

const room = roomBySlug("cuadruple");

export const metadata: Metadata = {
  title: "Habitación cuádruple familiar",
  description: room.description,
  alternates: { canonical: "/habitaciones/cuadruple" },
  openGraph: { title: `${room.shortName} | Hotel Bermudas`, description: room.description, url: "/habitaciones/cuadruple", images: [{ url: room.image, alt: room.imageAlt }] },
};

export default function QuadrupleRoomPage() {
  return <RoomDetail room={room} />;
}
