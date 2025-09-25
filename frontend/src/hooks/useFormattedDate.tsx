import { useEffect, useState } from "react";

const useFormattedDate = () => {

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const pad = (n: number) => n.toString().padStart(2, "0");
    
        const date = new Date();
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const dayOfMonth = pad(date.getDate());
        const hours = pad(date.getHours())
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
    
        setFormattedDate(`${year}${month}${dayOfMonth}_${hours}${minutes}${seconds}`);
    }, []);

    return {formattedDate};
}

export default useFormattedDate;