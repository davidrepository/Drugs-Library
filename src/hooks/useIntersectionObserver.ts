import { useEffect, useState } from "react";

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLDivElement>
) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsComponentVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isComponentVisible;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
