package models

type AnalyzeRequest struct {
	Type    string `json:"type"`
	Content string `json:"content"`
}

type AnalyzeResponse struct {
	RiskScore      int      `json:"risk_score"`
	RiskLevel      string   `json:"risk_level"`
	Category       string   `json:"category"`
	Confidence     int      `json:"confidence"`
	Summary        string   `json:"summary"`
	RedFlags       []string `json:"red_flags"`
	Recommendations []string `json:"recommendations"`
}

type AnalyzeURLRequest struct {
	URL string `json:"url"`
}