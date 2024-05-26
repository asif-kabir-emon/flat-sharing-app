import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TBouncedProps = { searchQuery: string; delay: number };

export const useDebounced = ({ searchQuery, delay }: TBouncedProps) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, delay]);

    return debouncedValue;
};
