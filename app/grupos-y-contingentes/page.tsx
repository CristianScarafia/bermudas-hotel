import { GroupLanding } from "@/components/group-landing";
import { groupsContent } from "@/lib/group-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Hotel para grupos y contingentes en Mar del Plata", "Alojamiento para agencias, contingentes y delegaciones en La Perla. Consultá habitaciones, distribución y una propuesta grupal con desayuno incluido.", groupsContent.path);
export default function GroupsPage() { return <GroupLanding content={groupsContent} />; }
