package main

import (
	"log"
	"os"

	"github.com/S-ishita/ScamSense-AI/internal/config"
	"github.com/S-ishita/ScamSense-AI/internal/router"
)

func main() {
	config.LoadEnv()
	r := router.SetupRouter()

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	log.Println("Server started on :" + port)

	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}