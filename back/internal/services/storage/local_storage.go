package storage

import (
    "fmt"
    "io"
    "mime/multipart"
    "os"
    "path/filepath"
)

type LocalStorage struct {
    BaseDir string
    BaseURL string // e.g. "http://localhost:8080/uploads"
}

func NewLocalStorage(baseDir, baseURL string) *LocalStorage {
    return &LocalStorage{BaseDir: baseDir, BaseURL: baseURL}
}

func (s *LocalStorage) fullPath(rel string) string {
    clean := filepath.Clean(rel)
    if filepath.IsAbs(clean) {
        return clean
    }
    return filepath.Join(s.BaseDir, clean)
}

func (s *LocalStorage) SaveFile(file multipart.File, filename string) (string, error) {
    full := s.fullPath(filename)
    if err := os.MkdirAll(filepath.Dir(full), 0o755); err != nil {
        return "", fmt.Errorf("failed to create directory for file: %w", err)
    }
    out, err := os.OpenFile(full, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0o644)
    if err != nil {
        return "", fmt.Errorf("failed to create file: %w", err)
    }
    defer out.Close()

    if _, err := io.Copy(out, file); err != nil {
        return "", fmt.Errorf("failed to write file contents: %w", err)
    }
    return s.GetFileURL(filename), nil
}

func (s *LocalStorage) GetFileURL(filename string) string {
    return fmt.Sprintf("%s/%s", s.BaseURL, filename)
}

func (s *LocalStorage) DeleteFile(filename string) error {
    if err := os.Remove(s.fullPath(filename)); err != nil {
        return fmt.Errorf("failed to delete file: %w", err)
    }
    return nil
}

func (s *LocalStorage) GetProcessedFilePath(videoID string) (string, error) {
    path := filepath.Join(s.BaseDir, "processed", videoID+".mp4")
    if _, err := os.Stat(path); err != nil {
        return "", fmt.Errorf("processed file not found: %w", err)
    }
    return path, nil
}
