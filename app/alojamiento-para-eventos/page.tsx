import { GroupLanding } from "@/components/group-landing";
import { eventsContent } from "@/lib/group-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Alojamiento para congresos y eventos en Mar del Plata", "Consultá habitaciones para asistentes a congresos, encuentros y delegaciones deportivas. Hotel Bermudas en La Perla, con desayuno continental incluido.", eventsContent.path);
export default function EventsPage() { return <GroupLanding content={eventsContent} />; }
