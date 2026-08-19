import type { Metadata } from "next";
import { RoomDetail } from "@/components/room-detail";
import { roomBySlug } from "@/lib/hotel-content";

const room = roomBySlug("quintuple");

export const metadata: Metadata = {
  title: "Habitación quíntuple de dos ambientes",
  description: room.description,
  alternates: { canonical: "/habitaciones/quintuple" },
  openGraph: { title: `${room.shortName} | Hotel Bermudas`, description: room.description, url: "/habitaciones/quintuple", images: [{ url: room.image, alt: room.imageAlt }] },
};

export default function QuintupleRoomPage() {
  return <RoomDetail room={room} />;
}
