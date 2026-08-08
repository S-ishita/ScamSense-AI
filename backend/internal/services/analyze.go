package services

import (
	"github.com/S-ishita/ScamSense-AI/internal/gemini"
	"github.com/S-ishita/ScamSense-AI/internal/models"
)

func AnalyzeText(req models.AnalyzeRequest) (models.AnalyzeResponse, error) {
	return gemini.AnalyzeText(req.Content)
}

func AnalyzeImage(imageData []byte, mimeType string) (models.AnalyzeResponse, error) {
	return gemini.AnalyzeImage(imageData, mimeType)
}

func AnalyzeURL(url string) (models.AnalyzeResponse, error) {
	return gemini.AnalyzeURL(url)
}