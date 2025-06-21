export interface ContestFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  evaluationDeadline: string;
  maxFileSize: number;
  allowedFormats: string[];
  videoLinkAllowed: boolean;
  paymentReceiptRequired: boolean;
  isPublic: boolean;
  targetAudience: string;
}

export interface ContestData extends ContestFormData {
  regulations: File[];
  jury: string[];
  status: "draft" | "published";
  createdAt: string;
}

export type JurySelectionMode = "select" | "manual";

export interface JuryUser {
  id: string;
  fullName: string;
  email: string;
  institution?: string;
}
