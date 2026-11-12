import { GroupLanding } from "@/components/group-landing";
import { studentContent } from "@/lib/group-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Consultas de alojamiento para viajes educativos y egresados", "Evaluá alojamiento para un viaje educativo o de egresados a Mar del Plata. Consultá viabilidad, distribución y condiciones con Hotel Bermudas.", studentContent.path);
export default function StudentPage() { return <GroupLanding content={studentContent} />; }
