# start with couchbase
FROM couchbase:latest

# copy the configure script
COPY scripts/configure-node.sh /opt/couchbase

# execute the configure-node.sh script
CMD ["/opt/couchbase/configure-node.sh"]