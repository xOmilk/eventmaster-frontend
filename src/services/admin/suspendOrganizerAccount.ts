import type { OrganizerData } from '../../types/OrganizerData';

export async function suspendOrganizerAccount(
    id: number,
    organizerInfo: OrganizerData
) {
    console.log(id, organizerInfo);
}
