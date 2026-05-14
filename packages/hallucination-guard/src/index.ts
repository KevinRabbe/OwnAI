export interface VerificationClaim {
  claim: string;
  sourceVerified: boolean;
  sourceType?: string;
  confidence?: number;
}
