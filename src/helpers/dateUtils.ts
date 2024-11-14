import dayjs from "dayjs";

export const formatTime = (
  timestamp: string | number | Date | dayjs.Dayjs | null | undefined
) => dayjs(timestamp).format("HH:mm:ss");

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => dayjs(date).format("DD-MM-YYYY");

export const formatToday = () => dayjs().format("DD/MM/YYYY");
