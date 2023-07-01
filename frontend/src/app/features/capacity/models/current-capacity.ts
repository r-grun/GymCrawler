export interface CurrentCapacity {
    timestamp: Date;
    centerId: number;
    currentlyCheckedInCount: number;
    maximumAllowedCheckedIn: number;
    numberOfAvailableSpots: number;
    numberOfReservedSpots: number;
    webName: string;
    status: number;
}
