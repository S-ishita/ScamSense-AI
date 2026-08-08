package gemini

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/S-ishita/ScamSense-AI/internal/config"
	"github.com/S-ishita/ScamSense-AI/internal/models"
	"github.com/S-ishita/ScamSense-AI/internal/prompts"

	neturl "net/url"
	"google.golang.org/genai"
)

func AnalyzeText(text string) (models.AnalyzeResponse, error) {

	ctx := context.Background()

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey: config.GeminiAPIKey(),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	prompt := prompts.AnalyzePrompt + "\n\nMessage:\n" + text

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		genai.Text(prompt),
		&genai.GenerateContentConfig{
			ResponseMIMEType: "application/json",
		},
	)

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	if result.Text() == "" {
		return models.AnalyzeResponse{}, fmt.Errorf("empty response from Gemini")
	}

	var response models.AnalyzeResponse

	err = json.Unmarshal([]byte(result.Text()), &response)
	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	return response, nil
}

func AnalyzeImage(imageData []byte, mimeType string) (models.AnalyzeResponse, error) {
	ctx := context.Background()

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey: config.GeminiAPIKey(),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	prompt := prompts.AnalyzePrompt +
		"\n\nAnalyze the attached image. Extract and analyze any visible message, text, links, sender information, or other relevant content."

	content := genai.NewContentFromParts(
	[]*genai.Part{
		genai.NewPartFromText(prompt),
		genai.NewPartFromBytes(imageData, mimeType),
	},
	genai.RoleUser,
	)

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		[]*genai.Content{content},
		&genai.GenerateContentConfig{
			ResponseMIMEType: "application/json",
		},
	)

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	if result.Text() == "" {
		return models.AnalyzeResponse{}, fmt.Errorf("empty response from Gemini")
	}

	var response models.AnalyzeResponse

	err = json.Unmarshal([]byte(result.Text()), &response)
	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	return response, nil
}

func AnalyzeURL(url string) (models.AnalyzeResponse, error) {
	ctx := context.Background()

	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  config.GeminiAPIKey(),
		Backend: genai.BackendGeminiAPI,
	})

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	parsedURL, err := neturl.Parse(url)
	if err != nil {
		return models.AnalyzeResponse{}, fmt.Errorf("invalid URL: %w", err)
	}

	if parsedURL.Scheme != "http" && parsedURL.Scheme != "https" {
		return models.AnalyzeResponse{}, fmt.Errorf("URL must use http or https")
	}

	if parsedURL.Hostname() == "" {
		return models.AnalyzeResponse{}, fmt.Errorf("URL must contain a valid hostname")
	}

	host := parsedURL.Hostname()

	prompt := prompts.AnalyzePrompt +
		"\n\nAnalyze this suspicious URL for phishing, scams, fraud, or malicious intent." +
		"\n\nURL: " + url +
		"\nDomain: " + host +
		"\nScheme: " + parsedURL.Scheme +
		"\nPath: " + parsedURL.Path +
		"\nQuery: " + parsedURL.RawQuery +
		"\n\nDo not visit or access the URL. Analyze only the URL characteristics provided." +
		"\n\nReturn confidence as an integer from 0 to 100."

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.5-flash",
		genai.Text(prompt),
		&genai.GenerateContentConfig{
			ResponseMIMEType: "application/json",
		},
	)

	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	if result.Text() == "" {
		return models.AnalyzeResponse{}, fmt.Errorf("empty response from Gemini")
	}

	var response models.AnalyzeResponse

	err = json.Unmarshal([]byte(result.Text()), &response)
	if err != nil {
		return models.AnalyzeResponse{}, err
	}

	return response, nil
}