import boto
import json
import time
import datetime
import boto.kinesis
from boto.kinesis.exceptions import ResourceNotFoundException
from boto.kinesis.exceptions import ProvisionedThroughputExceededException

ACCESS_KEY="AKIAIMV6XL4QVZA5GB2Q"
SECRET_KEY="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"
region_name="us-west-2"


kinesis =boto.kinesis.connect_to_region(region_name,aws_access_key_id = ACCESS_KEY,aws_secret_access_key = SECRET_KEY)
streamName="sound"
partitionKey="IoTExample"
shardCount=1
iterator_type='LATEST'

stream=kinesis.describe_stream(streamName)
print(json.dumps(stream,sort_keys=True,indent=2,separators=(',',':')))
shards=stream['StreamDescription']['Shards']
print('# Shard Count:', len(shards))

def processRecords(records):
    for record in records:
        text=record['Data'].lower()
        print 'Processing record with data:' + text

i=0
response=kinesis.get_shard_iterator(streamName,shards[0]['ShardId'], 'TRIM_HORIZON',starting_sequence_number=None)
next_iterator=response['ShardIterator']
print('Gettinng next records using iterator:', next_iterator)
while i<4000:
    try:
       response=kinesis.get_records(next_iterator,limit=1)
             #print response
       if len(response['Records'])>0:
             #print 'Number of records fetched:' + str(len(response['Records']))
             processRecords(response['Records'])

       next_iterator=response['NextShardIterator']
       time.sleep(1)
       i=i+1

    except ProvisionedThroughputExceededException as ptee:
       print(ptee.message)
       time.sleep(5)