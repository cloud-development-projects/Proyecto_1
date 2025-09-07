package handlers

import (
	"database/sql"
	"net/http"
	"strconv"

	"back/internal/config"
	"back/internal/database/models"
	"back/internal/services"

	"github.com/gin-gonic/gin"
)

// RankingHandler gestiona las peticiones de ranking y votación
type RankingHandler struct {
	db             *sql.DB
	config         *config.Config
	videoService   services.VideoServiceInterface
	rankingService *services.RankingService
}

// NewRankingHandler crea una instancia del handler para inyectar dependencias
func NewRankingHandler(db *sql.DB, cfg *config.Config) *RankingHandler {
	return &RankingHandler{
		db:             db,
		config:         cfg,
		rankingService: services.NewRankingService(db, cfg),
	}
}

// ListPublicVideos devuelve una lista de videos públicamente disponibles
func (h *RankingHandler) ListPublicVideos(c *gin.Context) {
	// TODO: Implementar lógica para obtener videos con estado "processed" o "publicado"
	c.JSON(http.StatusOK, gin.H{
		"message": "Public videos listing not yet implemented",
		"videos":  []models.Video{},
	})
}

// VoteVideo permite a un usuario votar por un video
func (h *RankingHandler) VoteVideo(c *gin.Context) {
	videoIDStr := c.Param("video_id")
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, models.APIResponse{
			Error: "User not authenticated",
		})
		return
	}

	userIDInt, _ := userID.(int64)

	// TODO: Implementar la lógica para registrar un voto en la base de datos
	c.JSON(http.StatusOK, gin.H{
		"message": "Vote registered for video " + videoIDStr,
		"user_id": userIDInt,
	})
}

// GetRankings obtiene el ranking de jugadores
func (h *RankingHandler) GetRankings(c *gin.Context) {
	page := getRankingIntParam(c, "page", 1)
	limit := getRankingIntParam(c, "limit", 50)
	city := c.Query("city")

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 50
	}

	rankings, err := h.rankingService.GetRankings(page, limit, city)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Error: "Failed to retrieve rankings",
		})
		return
	}

	c.JSON(http.StatusOK, rankings)
}

// GetTopRankings obtiene el top de rankings (más eficiente, con caché)
func (h *RankingHandler) GetTopRankings(c *gin.Context) {
	limit := getRankingIntParam(c, "limit", 10)
	city := c.Query("city")

	if limit < 1 || limit > 50 {
		limit = 10
	}

	rankings, err := h.rankingService.GetTopRankings(limit, city)
	if err != nil {
		c.JSON(http.StatusInternalServerError, models.APIResponse{
			Error: "Failed to retrieve top rankings",
		})
		return
	}

	c.JSON(http.StatusOK, rankings)
}

func getRankingIntParam(c *gin.Context, key string, defaultValue int) int {
	if value := c.Query(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}
