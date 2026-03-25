import type {
    OrganizerData,
    statusOrganizerRequest,
} from '../types/OrganizerData';

export function filterOrganizersByStatus(
    organizers: OrganizerData[],
    statusOrganizerRequest: statusOrganizerRequest
): OrganizerData[] {
    return organizers.filter(
        (organizer) => organizer.status === statusOrganizerRequest
    );
}
