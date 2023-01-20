import { useEffect } from 'react';

/**
* Hook that alerts clicks outside of the passed ref
* @param {React.MutableRefObject} ref - The ref to watch
* @param {function} handler - Callback to run when clicked outside of ref
*/
export default function useOnClickOutside(ref, handler) {
  const handleMousedown = (event) => {
    const element = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!element || element.contains(event.target)) {
      return;
    }

    handler(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMousedown);

    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, []);
}

