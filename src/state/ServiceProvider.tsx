import { useMemo, useReducer, type ReactNode } from "react";
import {
  caseRegistryReducer,
  initialCaseRegistryState,
} from "./caseRegistry";
import {
  initialReferralRegistryState,
  referralRegistryReducer,
} from "./referralRegistry";
import { ServiceContext, type ServiceContextValue } from "./context";

/**
 * État partagé du dispositif. Un signalement déposé sur le portail public
 * apparaît immédiatement dans la file des agents, comme dans le service réel.
 *
 * Les réducteurs sont volontairement isolés des composants : le jour où les
 * données viendront d'une API, seul ce fournisseur changera.
 */
export function ServiceProvider({ children }: { children: ReactNode }) {
  const [caseState, dispatchCase] = useReducer(caseRegistryReducer, undefined, initialCaseRegistryState);
  const [referralState, dispatchReferral] = useReducer(
    referralRegistryReducer,
    undefined,
    initialReferralRegistryState,
  );

  const value = useMemo<ServiceContextValue>(
    () => ({ caseState, dispatchCase, referralState, dispatchReferral }),
    [caseState, referralState],
  );

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}
