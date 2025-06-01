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

check_init_setup() {
    if [ ! -f docker-compose.yml ]; then
        error "docker-compose.yml file not found. Run './deploy.sh init' first."
        exit 1
    fi

    if [ ! -d traefik/data ] || [ ! -f traefik/data/acme.json ]; then
        error "Traefik setup is not initialized. Run './deploy.sh init' first."
        exit 1
    fi

    if [ ! -f .env ]; then
        error ".env file not found. Run './deploy.sh init' first."
        exit 1
    fi

    if [ ! -f docker-server.env ]; then
        error "docker-server.env file not found. Run './deploy.sh init' first."
        exit 1
    fi

    if [ ! -f docker-postgres.env ]; then
        error "docker-postgres.env file not found. Run './deploy.sh init' first."
        exit 1
    fi

    if [ ! -f traefik/config/traefik.yml ]; then
        error "Traefik configuration file not found. Run './deploy.sh init' first."
        exit 1
    fi
}

vimdiff_reminder() {
    echo "
--------------------------------------------
WORKING WITH FOLDS
za Toggles a text fold open/closed.
zo Unfolds (opens) a fold.
zc Closes (folds) a fold.
zR Unfolds all folds.
zM Folds up all folds.
zn Turns off the text folding feature.
zN Turns text the folding feature back on.

# WORKING WITH DIFFS
]c Navigates to the next change.
[c Navigates to the previous change.
dp Puts/gives the change at your cursor to the other file.
do Obtains/gets the change from the other file.
--------------------------------------------------
"
}

# --- Core Function: check_and_vimdiff ---
# Checks if two files are different and launches vimdiff if they are.
#
# @param $1: Path to the first file
# @param $2: Path to the second file
# @return 0 if files are the same or vimdiff was launched successfully.
#         1 if incorrect arguments are provided to the function.
#         2 if one or both files are not found.
#         Other non-zero values if diff encounters an error.
check_and_vimdiff() {
    # Check if two arguments (file paths) are provided to the function
    if [ "$#" -ne 2 ]; then
        info "Usage: check_and_vimdiff <file1> <file2>" >&2 # Send usage error to stderr
        return 1 # Return an error code
    fi

    local file1="$1" # Use local variables within the function
    local file2="$2"

    # Check if both files exist
    if [ ! -f "$file1" ]; then
        error "Error: File '$file1' not found." >&2
        return 2 # Return an error code
    fi

    if [ ! -f "$file2" ]; then
        error "Error: File '$file2' not found." >&2
        return 2 # Return an error code
    fi

    # Use diff -q to quietly check for differences
    # diff -q exits with 0 if files are the same, 1 if different, >1 for errors
    diff -q "$file1" "$file2" > /dev/null
    local diff_status=$? # Store the exit status of diff

    # Check the exit status of diff
    if [ "$diff_status" -eq 1 ]; then # 1 means files are different

        info "Files '$file1' and '$file2' are different."
        diff --side-by-side "$file1" "$file2"
        read -p "Edit in vimdiff (y/N): " ready
        if [[ "$ready" =~ ^[Yy]$ ]]; then
            vimdiff_reminder
            read -p "Press Enter to continue..."
            echo "Files '$file1' and '$file2' are different. Launching vimdiff..."
            vimdiff "$file1" "$file2"
        fi
    elif [ "$diff_status" -eq 0 ]; then # 0 means files are the same
        info "Files '$file1' and '$file2' are the same."
    else # Other non-zero status means diff encountered an error
        info "Error during diff operation (status: $diff_status) for '$file1' and '$file2'." >&2
        return "$diff_status" # Propagate diff's error status
    fi

    return 0 # Success
}

review() {
    # for each that we createdin init_setup, we will check if it is different with diff
    # and open it for review in vimdiff
    info "Reviewing configuration files..."

    # Check if the user has vimdiff installed
    if ! command -v vimdiff &> /dev/null; then
        error "vimdiff is not installed. Please install vimdiff first."
        exit 1
    fi

    # As the user if he is ready to review the files default to Yes
    check_and_vimdiff .env examples/.env.example 
    check_and_vimdiff docker-server.env examples/docker-server.env 
    check_and_vimdiff docker-postgres.env examples/docker-postgres.env 
    check_and_vimdiff traefik/config/traefik.yml examples/traefik/config/traefik.yml 
    check_and_vimdiff docker-compose.yml examples/docker-compose.yml 
    info "Configuration files reviewed. Please make sure to update them as needed."
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
        cp examples/.env.example .env
        chmod 600 .env
        info "Created .env file with default values"
        warn "Please update values in .env file"
    fi

    if [ ! -f docker-server.env ]; then
        cp examples/docker-server.env docker-server.env
        chmod 600 .env
        info "Created docker-server.env file with default values"
        warn "Please update values in docker-server.env file"
    fi

    if [ ! -f docker-postgres.env ]; then
        cp examples/docker-postgres.env docker-postgres.env
        chmod 600 .env
        info "Created docker-postgres.env file with default values"
        warn "Please update values in docker-postgres.env file"
    fi

     if [ ! -f traefik/config/traefik.yml ]; then
        cp -r examples/traefik .
        chmod 600 .env
        info "Created traefik/config/traefik.yml file with default values"
        warn "Please update values in traefik/config/traefik.yml file"
    fi

     if [ ! -f docker-compose.yml ]; then
        cp examples/docker-compose.yml docker-compose.yml
        chmod 600 .env
        info "Created docker-compose.yml file with default values"
        warn "You do not need to update this file, but you can if you want to customize the deployment"
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

# Update the application
clean() {
    # confirm with user
    read -p "Are you sure you want to clean up all configuration files and directories? This cannot be undone. (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        info "Cleanup aborted."
        exit 0
    fi
    info "Cleaning up all configuration files and directories..."
    rm -f docker-compose.yml
    rm -rf traefik
    rm -f .env
    rm -f docker-server.env
    rm -f docker-postgres.env
    info "Cleaned up all configuration files and directories"
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
    echo "  clean                  Clean up all configuration files and directories"
    echo "  review                 Review configuration files with vimdiff"
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
        check_init_setup
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
    clean)
        clean
        ;;
    review)
        check_init_setup
        review
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        ;;
esac 