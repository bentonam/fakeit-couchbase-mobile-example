#!/bin/bash

set -m

echo 'Waiting 20 seconds for Couchbase service to start and warm up'

sleep 20

echo 'Starting the Sync Gateway Service'
/entrypoint.sh sync_gateway /opt/sync_gateway/sync-gateway.json

echo 'Couchbase Sync Gateway is ready'
