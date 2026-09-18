import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restaure la position de lecture à chaque navigation : haut de page, ou
 * section visée lorsque l'adresse comporte une ancre.
 */
export function ScrollToSection() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const isNewPage = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (!hash) {
      if (isNewPage) window.scrollTo({ top: 0 });
      return;
    }

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    target.scrollIntoView({ behavior: isNewPage ? "auto" : "smooth", block: "start" });
  }, [pathname, hash]);

  return null;
}
