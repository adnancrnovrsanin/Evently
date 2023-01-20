// hook that calls a function when you click outside of the passed ref
import { useEffect, useRef } from 'react';

export const useClickOutside = (ref: any, callback: any) => {

    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });

    return ref;
};
