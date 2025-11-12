FROM python:3.10-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock* ./

# Install dependencies
RUN uv sync --frozen --no-cache

# Copy alembic configuration
COPY alembic.ini ./
COPY alembic ./alembic

# Copy the rest of the application
COPY . .

# Run the application
CMD ["sh", "-c", "uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]