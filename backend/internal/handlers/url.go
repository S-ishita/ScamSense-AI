package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/S-ishita/ScamSense-AI/internal/models"
	"github.com/S-ishita/ScamSense-AI/internal/services"
)

func AnalyzeURL(c *gin.Context) {
	var req models.AnalyzeURLRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	req.URL = strings.TrimSpace(req.URL)

	if req.URL == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "URL is required",
		})
		return
	}

	response, err := services.AnalyzeURL(req.URL)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, response)
}