import { GroupLanding } from "@/components/group-landing";
import { agenciesContent } from "@/lib/group-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Hotel para agencias y operadores en Mar del Plata", "Información de Hotel Bermudas para agencias de viajes: habitaciones, desayuno incluido y consultas de alojamiento para contingentes en La Perla.", agenciesContent.path);
export default function AgenciesPage() { return <GroupLanding content={agenciesContent} />; }
