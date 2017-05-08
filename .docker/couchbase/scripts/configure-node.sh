set -m

/entrypoint.sh couchbase-server &

echo 'Waiting 20 seconds for Couchbase service to start'
sleep 20

# configure the cluster
echo 'Configuring Cluster'
/opt/couchbase/bin/couchbase-cli cluster-init -c localhost:8091 --cluster-username=Administrator --cluster-password=password --cluster-port=8091 --cluster-ramsize=500 --service=data

# create the ecommerce bucket
echo 'Creating ecommerce bucket'
/opt/couchbase/bin/couchbase-cli bucket-create -c localhost:8091 -u Administrator -p password --bucket=ecommerce --bucket-eviction-policy=fullEviction --bucket-type=membase --bucket-priority=high --enable-index-replica=0 --bucket-port=11211 --enable-flush=1 --bucket-replica=1 --bucket-ramsize=200

echo 'Couchbase server is ready'

fg 1