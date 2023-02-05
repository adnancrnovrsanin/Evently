import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.scrollY);
        }

        window.addEventListener('scroll', updatePosition);

        updatePosition();

        return () => window.removeEventListener('scroll', updatePosition);
    }, [])

    return scrollPosition;
};