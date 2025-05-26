import dayjs from "dayjs";


const timeouts: { [key: string]: ReturnType<typeof setTimeout> | undefined } =
    {};

const cTimeout = (key = "key") => {
    if (timeouts[key]) {
        clearTimeout(timeouts[key]);
        timeouts[key] = undefined;
    }
};

export const debounce = (key = "key", fn = () => {
}, timeout = 500) => {
    const sTimeout = (key: string, fn: () => void, timeout: number) => {
        cTimeout(key);

        timeouts[key] = setTimeout(() => {
            try {
                fn();
            } catch (e) {
                console.log(e);
            }

            timeouts[key] = undefined;
        }, timeout);
    };

    return sTimeout(key, fn, timeout);
};

export const formatDate = (date: string, format?: string) =>
    dayjs.tz(date || new Date(), "Asia/Tashkent").format(format || "DD.MM.YYYY");

