package middleware

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

type client struct {
	limiter  *rate.Limiter
	lastSeen int64
}

var (
	clients = make(map[string]*client)
	mu      sync.Mutex
)

func RateLimit() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		mu.Lock()

		if _, exists := clients[ip]; !exists {
			clients[ip] = &client{
				limiter: rate.NewLimiter(rate.Limit(5), 10),
			}
		}

		allowed := clients[ip].limiter.Allow()

		mu.Unlock()

		if !allowed {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error": "Too many analysis requests. Please try again later.",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}