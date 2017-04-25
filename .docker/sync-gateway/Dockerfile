# Start with the base sync gateway
FROM couchbase/sync-gateway:latest

# Copy the sync-gateway.json into the container
COPY sync-gateway.json /opt/sync_gateway/sync-gateway.json

# Create Volume for data to persist
RUN mkdir -p /opt/sync_gateway/data

# Copy Entry Point
COPY scripts/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]

# Copy the configure script
COPY scripts/configure-node.sh /opt/sync_gateway

# Configure the Sync Gateway and Start it
CMD ["/opt/sync_gateway/configure-node.sh"]

#  port 4984: public port
#  port 4985: admin port
EXPOSE 4984 4985
