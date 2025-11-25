migrate-create:
	docker-compose exec hackaton-backend sh -c "cd /app && uv run alembic revision --autogenerate -m 'New Migration $(shell date +%Y-%m-%d_%H-%M-%S)'"

migrate-up:
	docker-compose exec hackaton-backend sh -c "cd /app && uv run alembic upgrade head"

seed:
	docker-compose exec hackaton-backend sh -c "cd /app && PYTHONPATH=/app uv run python app/scripts/seed_db.py"

docker-up:
	docker-compose --env-file .env -f docker-compose.yml up -d

docker-down:
	docker-compose --env-file .env -f docker-compose.yml down