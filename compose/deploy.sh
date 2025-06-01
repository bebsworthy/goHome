#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! docker info &> /dev/null; then
        error "Docker daemon is not running. Please start Docker first."
        exit 1
    fi
}

# Check if docker compose is installed
check_docker_compose() {
    if ! command -v docker compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Initialize the required directories and files
init_setup() {
    info "Creating required directories and files..."
    
    # Create Traefik directories
    mkdir -p traefik/data traefik/config
    
    # Create and set permissions for acme.json
    if [ ! -f traefik/data/acme.json ]; then
        touch traefik/data/acme.json
        chmod 600 traefik/data/acme.json
        info "Created acme.json with correct permissions"
    fi

    # Create Docker network if it doesn't exist
    if ! docker network inspect proxy &> /dev/null; then
        docker network create proxy
        info "Created 'proxy' network"
    else
        warn "'proxy' network already exists"
    fi

    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cp .env.example .env
        chmod 600 .env
        info "Created .env file with default values"
        warn "Please update values in .env file"
    fi

    if [ ! -f docker-server.env ]; then
        cp docker-server.env.example docker-server.env
        chmod 600 .env
        info "Created docker-server.env file with default values"
        warn "Please update values in docker-server.env file"
    fi

    if [ ! -f docker-postgres.env ]; then
        cp docker-postgres.env.example docker-postgres.env
        chmod 600 .env
        info "Created docker-postgres.env file with default values"
        warn "Please update values in docker-postgres.env file"
    fi

     if [ ! -f traefik/config/traefik.yml ]; then
        cp traefik/config/traefik.yml.example traefik/config/traefik.yml
        chmod 600 .env
        info "Created traefik/config/traefik.yml file with default values"
        warn "Please update values in traefik/config/traefik.yml file"
    fi
}

# Deploy the application
deploy() {
    # Check if .env exists and has required variables
    if [ ! -f .env ]; then
        error ".env file not found. Run './deploy.sh init' first"
        exit 1
    fi

    info "Building and deploying the application..."
    docker compose pull
    docker compose up --build -d
    
    if [ $? -eq 0 ]; then
        info "Deployment successful!"
        info "Please wait a few minutes for Let's Encrypt certificates to be issued"
        echo
        info "You can check the logs with: ./deploy.sh logs"
        info "Access your application at: https://${DOMAIN:-yourdomain.com}"
        info "Access Traefik dashboard at: https://traefik.${DOMAIN:-yourdomain.com}/dashboard/"
    else
        error "Deployment failed. Check the logs for more information."
        exit 1
    fi
}

# Show logs
show_logs() {
    local service=$1
    if [ -z "$service" ]; then
        docker compose logs -f
    else
        docker compose logs -f "$service"
    fi
}

# Stop the application
stop() {
    info "Stopping the application..."
    docker compose down
}

# Restart the application
restart() {
    info "Restarting the application..."
    docker compose restart
}

# Update the application
update() {
    info "Updating the application..."
    git pull
    docker compose pull
    docker compose up --build -d
}

# Show help message
show_help() {
    echo "Usage: $0 COMMAND [OPTIONS]"
    echo
    echo "Commands:"
    echo "  init                   Initialize required directories and files"
    echo "  deploy                 Build and deploy the application"
    echo "  logs [SERVICE]         Show logs (optionally for a specific service)"
    echo "  stop                   Stop the application"
    echo "  restart                Restart the application"
    echo "  update                 Update the application (git pull + rebuild)"
    echo "  status                 Show status of all containers"
    echo
    echo "Examples:"
    echo "  $0 init"
    echo "  $0 deploy"
    echo "  $0 logs"
    echo "  $0 logs gohome"
}

# Main script execution
case "$1" in
    init)
        check_docker
        check_docker_compose
        init_setup
        ;;
    deploy)
        check_docker
        check_docker_compose
        deploy
        ;;
    logs)
        show_logs "$2"
        ;;
    stop)
        docker compose down
        ;;
    restart)
        docker compose restart
        ;;
    update)
        update
        ;;
    status)
        docker compose ps
        ;;
    *)
        show_help
        ;;
esac 