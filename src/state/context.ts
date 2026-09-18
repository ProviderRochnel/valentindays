import { createContext, type Dispatch } from "react";
import type { CaseRegistryAction, CaseRegistryState } from "./caseRegistry";
import type { ReferralRegistryAction, ReferralRegistryState } from "./referralRegistry";

export interface ServiceContextValue {
  caseState: CaseRegistryState;
  dispatchCase: Dispatch<CaseRegistryAction>;
  referralState: ReferralRegistryState;
  dispatchReferral: Dispatch<ReferralRegistryAction>;
}

export const ServiceContext = createContext<ServiceContextValue | null>(null);
