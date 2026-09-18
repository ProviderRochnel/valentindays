import { CaseTracker } from "@/components/public/CaseTracker";
import { ContactChannels } from "@/components/public/ContactChannels";
import { FaqSection } from "@/components/public/FaqSection";
import { HelpFinder } from "@/components/public/HelpFinder";
import { HomeHero } from "@/components/public/HomeHero";
import { ReportWizard } from "@/components/public/ReportWizard";
import { SafetyTips } from "@/components/public/SafetyTips";
import { ServiceCards } from "@/components/public/ServiceCards";

/** Portail public : signaler, suivre, trouver de l'aide, joindre le service. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceCards />

      <div className="mt-11 grid items-start gap-[18px] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ReportWizard />
        <div className="flex flex-col gap-4">
          <CaseTracker />
          <SafetyTips />
        </div>
      </div>

      <ContactChannels />
      <HelpFinder />
      <FaqSection />
    </>
  );
}
