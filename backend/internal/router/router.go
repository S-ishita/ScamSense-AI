package router

import (
	"time"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/S-ishita/ScamSense-AI/internal/handlers"
	"github.com/S-ishita/ScamSense-AI/internal/middleware"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()
	allowedOrigin := os.Getenv("FRONTEND_URL")

	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:5173"
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins: 	  []string{allowedOrigin},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.GET("/health", handlers.Health)

	analysisLimiter := middleware.RateLimit()

	router.POST("/api/v1/analyze", analysisLimiter, handlers.Analyze)
	router.POST("/api/v1/analyze-image", analysisLimiter, handlers.AnalyzeImage)
	router.POST("/api/v1/analyze-url", analysisLimiter, handlers.AnalyzeURL)

	return router
}