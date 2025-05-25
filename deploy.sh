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
}

# Configure domain settings
configure_domain() {
    local domain=$1
    local email=$2

    if [ -z "$domain" ] || [ -z "$email" ]; then
        error "Domain and email are required"
        echo "Usage: $0 configure yourdomain.com your@email.com"
        exit 1
    fi

    info "Configuring domain settings..."
    
    # Update docker-compose.yml
    sed -i.bak "s/traefik\.yourdomain\.com/traefik.$domain/g" docker-compose.yml
    sed -i.bak "s/yourdomain\.com/$domain/g" docker-compose.yml
    
    # Update traefik.yml
    sed -i.bak "s/your-email@example\.com/$email/g" traefik/config/traefik.yml
    
    info "Domain configured to: $domain"
    info "Admin dashboard will be available at: traefik.$domain"
    info "Let's Encrypt email set to: $email"
}

# Deploy the application
deploy() {
    info "Building and deploying the application..."
    docker compose pull
    docker compose up --build -d
    
    if [ $? -eq 0 ]; then
        info "Deployment successful!"
        info "Please wait a few minutes for Let's Encrypt certificates to be issued"
        echo
        info "You can check the logs with: ./deploy.sh logs"
        info "Access your application at: https://yourdomain.com"
        info "Access Traefik dashboard at: https://traefik.yourdomain.com"
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
    echo "  init                    Initialize required directories and files"
    echo "  configure DOMAIN EMAIL  Configure domain and email settings"
    echo "  deploy                  Build and deploy the application"
    echo "  logs [SERVICE]         Show logs (optionally for a specific service)"
    echo "  stop                   Stop the application"
    echo "  restart                Restart the application"
    echo "  update                 Update the application (git pull + rebuild)"
    echo "  status                 Show status of all containers"
    echo
    echo "Examples:"
    echo "  $0 init"
    echo "  $0 configure example.com admin@example.com"
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
    configure)
        configure_domain "$2" "$3"
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