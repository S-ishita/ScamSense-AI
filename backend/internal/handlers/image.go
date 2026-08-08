package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/S-ishita/ScamSense-AI/internal/services"
)

func AnalyzeImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "image is required",
		})
		return
	}

	openedFile, err := file.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to open image",
		})
		return
	}
	defer openedFile.Close()

	imageData := make([]byte, file.Size)

	_, err = openedFile.Read(imageData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to read image",
		})
		return
	}

	response, err := services.AnalyzeImage(
		imageData,
		file.Header.Get("Content-Type"),
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, response)
}