import { useEffect } from "react";

export const useNoScroll = (path: string) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname === path) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    const handleLocationChange = () => {
      handleScroll();
    };

    handleScroll();

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.body.style.overflow = "auto";
    };
  }, [path]);
};

