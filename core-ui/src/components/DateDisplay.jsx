/* eslint-disable react/prop-types */
import { format, isToday, isYesterday, subDays, isSameWeek } from "date-fns";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (isToday(date)) {
        return "Today";
    } else if (isYesterday(date)) {
        return "Yesterday";
    } else if (isSameWeek(date, today, { weekStartsOn: 1 })) {
        return "Last " + format(date, "EEEE");
    } else {
        return format(date, "MMM d, yyyy");
    }
};


export default function DateDisplay({ date }) {
    return (
        <span>{formatDate(date)}</span>
    );
}


