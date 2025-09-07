package api

import (
	"database/sql"
	"net/http"
	"time"

	"back/internal/api/handlers"
	"back/internal/api/middleware"
	"back/internal/config"
	"back/internal/services"
	"back/internal/workers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configura todas las rutas de la aplicación
func SetupRoutes(db *sql.DB, cfg *config.Config, taskQueue *workers.TaskQueue, videoService services.VideoServiceInterface) *gin.Engine {
	router := gin.New()
	router.Use(gin.Recovery(), gin.Logger())

	// Inicializar handlers inyectando dependencias
	authHandler := handlers.NewAuthHandler(db, cfg)
	videoHandler := handlers.NewVideoHandler(db, cfg, taskQueue, videoService)
	rankingHandler := handlers.NewRankingHandler(db, cfg)

	// Health
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "healthy",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
			"version":   "1.0.0",
		})
	})

	// Auth routes
	authGroup := router.Group("/api/auth")
	{
		authGroup.POST("/signup", authHandler.Signup)
		authGroup.POST("/login", authHandler.Login)
	}

	// Protected video routes
	videosGroup := router.Group("/api/videos")
	videosGroup.Use(middleware.AuthMiddleware(cfg))
	{
		videosGroup.POST("/upload", videoHandler.UploadVideo)
		videosGroup.GET("", videoHandler.GetMyVideos)
		videosGroup.GET(":video_id", videoHandler.GetVideoDetail)
		videosGroup.DELETE(":video_id", videoHandler.DeleteVideo)
	}

	// Rutas para Ranking y Videos Públicos
	rankingGroup := router.Group("/api/ranking")
	{
		// *** CAMBIO AQUÍ: Se ha ajustado la ruta para coincidir con /ranking/public
		rankingGroup.GET("/public", rankingHandler.ListPublicVideos)

		// *** CAMBIO AQUÍ: Se ha ajustado la ruta para coincidir con /ranking/public/:video_id/vote
		rankingGroup.POST("/public/:video_id/vote", middleware.AuthMiddleware(cfg), rankingHandler.VoteVideo)

		// *** NUEVA RUTA: Se ha añadido el endpoint /ranking/top
		rankingGroup.GET("/top", rankingHandler.GetTopRankings)
	}

	return router
}
