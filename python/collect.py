import json
import time
import datetime
import smbus
from pymongo import MongoClient 

bus = smbus.SMBus(1)
print("Read the A/D")
print("Ctrl C to stop")

address = 0x48

try:
    client = MongoClient("mongodb://52.25.49.72:27017/capstone")
    print "successfully!"
except pymongo.errors.ConnectionFailure,e:
    print "Could not connect to MongoDB: %s" % e
db = client.capstone.sensor
user = "Capstoneteam10"
row = {}

def readLightSensor():
    bus.write_byte(address,0x40)
    bus.read_byte(address) # dummy read to start conversion
    temp = bus.read_byte(address)
    return temp
   

def runLightSensor():
    light = str(readLightSensor())
    timestamp=datetime.datetime.utcnow()
    record = str(timestamp)+":"+light
    print "Light: " +record
    return light
    

def readSoundSensor():
    bus.write_byte(address,0x41)
    bus.read_byte(address) # dummy read to start conversion
    temp = bus.read_byte(address)
    return temp

def runSoundSensor():
    sound = str(readSoundSensor())
    timestamp=datetime.datetime.utcnow()
    record = str(timestamp)+":"+sound
    print "Sound: " +record
    return sound

while(True):
   lightvalue = runLightSensor()   
   time.sleep(0.5)
   soundvalue = runSoundSensor()
   time.sleep(0.5)
   currenttime = str(datetime.datetime.utcnow())
   row = {'username':user, 'time':currenttime, 'lightrecord':lightvalue, 'soundrecord':soundvalue}
   print row  
   db.insert(row)   

client.close()

