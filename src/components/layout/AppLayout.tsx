import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { navigationEntryFor } from "@/app/routes";
import { useQuickExit } from "@/hooks/useQuickExit";
import { EmergencyBar } from "./EmergencyBar";
import { NeutralScreen } from "./NeutralScreen";
import { PrivacyDialog } from "./PrivacyDialog";
import { ScrollToSection } from "./ScrollToSection";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Ossature commune à toutes les pages du service. */
export function AppLayout() {
  const { pathname } = useLocation();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // La sortie rapide n'a de sens que sur les pages ouvertes au public.
  const isPublicFacing = navigationEntryFor(pathname)?.publicFacing ?? true;
  const { neutralScreenVisible, triggerQuickExit, dismissNeutralScreen } =
    useQuickExit(isPublicFacing);

  if (neutralScreenVisible) {
    return <NeutralScreen onReturn={dismissNeutralScreen} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToSection />
      <EmergencyBar />
      <SiteHeader
        pathname={pathname}
        showQuickExit={isPublicFacing}
        onQuickExit={triggerQuickExit}
      />

      <main className="gov-wrap flex-1 animate-fade-in pb-14 pt-5 sm:pb-[56px] sm:pt-[30px]">
        <Outlet />
      </main>

      <SiteFooter onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </div>
  );
}
