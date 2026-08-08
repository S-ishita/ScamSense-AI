export interface AnalyzeRequest {
  type: "text" | "image" | "pdf";
  content: string;
}

export interface AnalyzeResponse {
  risk_score: number;
  risk_level: string;
  category: string;
  confidence: number;
  summary: string;
  red_flags: string[];
  recommendations: string[];
}