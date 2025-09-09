package storage

import (
	"mime/multipart"
)

// Storage defines a generic interface for saving, retrieving, and deleting files.
type Storage interface {
    SaveFile(file multipart.File, filename string) (string, error) // returns public URL or path
    DeleteFile(filename string) error
    GetFileURL(filename string) string
    GetProcessedFilePath(videoID string) (string, error)
}
