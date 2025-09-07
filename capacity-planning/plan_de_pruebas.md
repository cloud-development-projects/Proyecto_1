# Plan de Pruebas de Carga — Entrega 1

## 1. Objetivo
Validar el desempeño y escalabilidad de la plataforma **ANB Rising Stars** midiendo:
- **Throughput** (transacciones por minuto)
- **Tiempo de respuesta** promedio y p95
- **Utilización de recursos** (CPU, RAM, I/O)

El objetivo es garantizar que la aplicación pueda manejar la concurrencia definida en los escenarios sin degradar la experiencia del usuario.

---

## 2. Entorno de Pruebas

| Componente        | Configuración |
|------------------|-------------|
| **SO**           | Ubuntu 24.04 LTS |
| **API/Worker**   | Contenedores Docker, Go 1.22 |
| **Base de datos**| PostgreSQL 16 |
| **Broker**       | Redis 7 (Asynq) |
| **Cliente de prueba** | EC2 `m5.large` (2 vCPU, 8 GB RAM) en us-east-1 |
| **Herramienta**  | [Apache JMeter](https://jmeter.apache.org/) (alternativamente Apache Bench para pruebas rápidas) |

Monitoreo:
- `docker stats` y `pg_stat_activity` para métricas de CPU/memoria/IO.
- Grafana + InfluxDB (opcional) para visualizar métricas en vivo.

---

## 3. Criterios de Aceptación

| Métrica | Objetivo |
|--------|-----------|
| **Tiempo de respuesta promedio** | `< 500ms` para rutas críticas |
| **Throughput** | `> 200 req/min` en escenario de carga normal |
| **Errores HTTP** | `< 1%` del total de peticiones |
| **CPU** | `< 75%` uso sostenido |
| **Memoria** | Sin OOM ni leaks después de 10 min de carga |

---

## 4. Escenarios de Prueba

### Escenario 1 — Ruta Crítica de Usuario
**Flujo:**  
`POST /auth/signup` → `POST /auth/login` → `POST /videos/upload` → `GET /videos`  
- Usuarios concurrentes: **10, 50, 100, 200, 500**
- Validar latencia, throughput y errores en cada incremento.

### Escenario 2 — Procesamiento Batch
Simular cola masiva de videos:
- Encolar **100 tareas** de procesamiento en Asynq simultáneamente.
- Monitorear el tiempo hasta que el **100% de los videos** pasen a estado `processed`.
- Validar que el worker no caiga y que el consumo de CPU se mantenga aceptable.

---

## 5. Parámetros de Configuración
- `docker-compose` en modo producción (`GO_ENV=production`).
- Workers de Asynq: 5 hilos de concurrencia.
- JMeter: ramp-up gradual de usuarios en 30s.
- Métricas recolectadas cada 1s.

---

## 6. Topología de Prueba