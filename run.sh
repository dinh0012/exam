#!/bin/bash
#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SCRIPT=`readlink -f $0`
DIR=`dirname $SCRIPT`
PROJECT_DIR="$(dirname $(dirname $DIR))"
DOCKER_FILES="-f docker-compose.yml"

cd $PROJECT_DIR/exam
# Create global network
docker network inspect exam &>/dev/null || docker network create --driver bridge exam

export PROJECT_DIR=$PROJECT_DIR
source "$DIR/env"

#run docker-compose
docker-compose $DOCKER_FILES $@
