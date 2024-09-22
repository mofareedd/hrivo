import dayjs from "dayjs";

export const FIFTEEN_MINUTE = dayjs().add(15, "minute").endOf("day").toDate();

export const THIRTY_DAYS = dayjs().add(30, "day").toDate();
