import boto
import json
import time
import datetime
import boto.kinesis
from boto import kinesis
from boto.kinesis.exceptions import ResourceNotFoundException
from random import randint
from smbus import SMBus

bus = SMBus(1)
print("Read the A/D and put record Kinesis")
print("Ctrl C to stop")
bus.write_byte(0x48, 0)
last_reading =-1

ACCESS_KEY="AKIAIMV6XL4QVZA5GB2Q"
SECRET_KEY="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"
region_name="us-west-2"


kinesis =boto.kinesis.connect_to_region(region_name,aws_access_key_id = ACCESS_KEY,aws_secret_access_key = SECRET_KEY)
streamName="sound"
partitionKey="IoTExample"
shardCount=1
global stream

def readSoundSensor():
     return bus.read_byte(0x48)

def runController():
    sound=readSoundSensor()
    timestamp=datetime.datetime.utcnow()
    record=str(timestamp)+":"+str(sound)
    print "Putting record in stream:"+record
    response=kinesis.put_record(stream_name=streamName,data=record,partition_key=partitionKey)
    print ("-=put seqNum:",response['SequenceNumber'])

def get_or_create_stream(stream_name, shard_count):
    stream=None
    try:
        stream=kinesis.describe_stream(streamName)
        print(json.dumps(stream,sort_keys=True,indent=2,separators=(',',':')))
    except ResourceNotFoundException as enfe:
        while(stream is None) or (stream['StreamStatus'] is not 'ACTIVE'):
            print('Could not find ACTIVE stream:0 trying to create.'.format(stream_name))
            stream=kinesis.create_stream(stream_name,shard_count)
            time.sleep(0.5)
    return stream

def setupController():
    global stream
    stream=get_or_create_stream(streamName,shardCount)
    
setupController()
while True:
    runController()
    time.sleep(1)
