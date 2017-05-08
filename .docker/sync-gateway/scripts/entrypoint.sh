#!/bin/bash
set -e

[[ "$1" == "sync_gateway" ]] && {
      echo "Starting Couchbase Sync Gateway -- Web UI available at http://<ip>:4984"
}

exec "$@"