export enum AreaEnum {
    MAIN = 'MAIN',
    OUTSIDE = "OUTSIDE",
    BALCONY = 'BALCONY'
}

export enum CategoryEnum {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",
    PRIVATE_EVENT = "PRIVATE_EVENT",
    BOOKED_OUT = "BOOKED_OUT"
}

export enum ResStatusEnum {
    PENDING= "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    SEATED = "SEATED",
    COMPLETED = "COMPLETED"
}

export enum SourceEnum {
    ONLINE = "ONLINE",
    APP = "APP",
    IN_PERSON = "IN_PERSON",
    EMAIL = "EMAIL",
    PHONE = "PHONE"
}

export enum TableStatusEnum {
    BOOKED = "BOOKED",
    OCCUPIED = "OCCUPIED",
    AVAILABLE = "AVAILABLE",
    CONFIRMED_BOOKING = "CONFIRMED_BOOKING",
}

export type TableStatusType =
    | {type: "BOOKED" | "OCCUPIED" | "AVAILABLE" | "CONFIRMED_BOOKING"}

