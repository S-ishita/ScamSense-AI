package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/S-ishita/ScamSense-AI/internal/models"
	"github.com/S-ishita/ScamSense-AI/internal/services"
)

func Analyze(c *gin.Context) {
	var req models.AnalyzeRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	response, err := services.AnalyzeText(req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, response)
}