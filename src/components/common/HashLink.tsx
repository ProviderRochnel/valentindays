import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface HashLinkProps {
  to: string;
  /** Ancre de section, sans le `#`. */
  hash?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Lien interne vers une section d'une page. Le défilement est traité par
 * `ScrollToSection`, ce qui évite de manipuler le DOM depuis les composants.
 */
export const HashLink = forwardRef<HTMLAnchorElement, HashLinkProps>(
  ({ to, hash, className, children }, ref) => (
    <Link ref={ref} to={hash ? `${to}#${hash}` : to} className={className}>
      {children}
    </Link>
  ),
);
HashLink.displayName = "HashLink";
