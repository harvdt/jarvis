import paho.mqtt.client as mqtt
import json
import logging
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.iot import IoTMessage
from app.models.tree import Tree
from app.services.tree import process_iot_pollination
from app.services.log import create_log
from app.schemas.log import LogCreate

logger = logging.getLogger(__name__)

class MQTTService:
    def __init__(self, db: Session):
        self.db = db
        self.client = mqtt.Client()
        self.client.username_pw_set("hapis", "Dito1234")
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_disconnect = self.on_disconnect

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Connected to MQTT broker")
            # Subscribe to the topic where IoT data is published
            client.subscribe("iot/detections")  # Adjust topic as needed
        else:
            logger.error(f"Failed to connect to MQTT broker with code {rc}")

    def on_disconnect(self, client, userdata, rc):
        logger.info(f"Disconnected from MQTT broker with code {rc}")

    def on_message(self, client, userdata, msg):
        try:
            payload = json.loads(msg.payload.decode())
            logger.info(f"Received MQTT message: {payload}")

            # Store the raw IoT message
            self.store_iot_message(payload)

            # Process the detections
            self.process_detections(payload)

        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse MQTT message: {e}")
        except Exception as e:
            logger.error(f"Error processing MQTT message: {e}")

    def store_iot_message(self, payload):
        """Store the raw IoT message in the database"""
        iot_message = IoTMessage(
            timestamp=datetime.fromtimestamp(payload["timestamp"] / 1000),  # Convert milliseconds to seconds
            camera=payload["camera"],
            detections=payload["detections"]
        )
        self.db.add(iot_message)
        self.db.commit()
        logger.info(f"Stored IoT message from camera {payload['camera']}")

    def process_detections(self, payload):
        """Process the detections and update tree status"""
        camera_id = payload["camera"]
        detections = payload["detections"]

        # Find the tree associated with this camera
        tree = self.db.query(Tree).filter(Tree.camera_id == camera_id).first()
        if not tree:
            logger.warning(f"No tree found for camera {camera_id}")
            return

        # Process each detection
        for detection in detections:
            class_name = detection["class_name"]
            confidence = detection["confidence"]

            # Only process if confidence is high enough
            if confidence < 0.5:  # Adjust threshold as needed
                continue

            # Determine flower and pollination status based on class_name
            if class_name == "matang":
                flower_status = True
                pollination_status = True
            elif class_name == "bukan-matang":
                flower_status = False
                pollination_status = False
            else:
                logger.warning(f"Unknown class_name: {class_name}")
                continue

            # Update tree status
            tree.flower_status = flower_status
            tree.pollination_status = pollination_status

            # Create log entry
            status_text = []
            if flower_status:
                status_text.append("ripe flower detected")
            if pollination_status:
                status_text.append("pollination completed")

            log_message = f"MQTT IoT update from camera {camera_id}: {', '.join(status_text) if status_text else 'no status changes'} (confidence: {confidence:.2f})"

            create_log(self.db, LogCreate(
                message=log_message,
                plantation_id=tree.plantation_id,
                timestamp=datetime.utcnow()
            ))

            self.db.commit()
            logger.info(f"Updated tree {tree.id} with flower_status={flower_status}, pollination_status={pollination_status}")

    def connect(self):
        """Connect to the MQTT broker"""
        try:
            self.client.connect("f18da0e8cc234ccb8b7339a0dad6b1bf.s1.eu.hivemq.cloud", 8883, 60)
            self.client.loop_start()
            logger.info("MQTT service started")
        except Exception as e:
            logger.error(f"Failed to connect to MQTT broker: {e}")

    def disconnect(self):
        """Disconnect from the MQTT broker"""
        self.client.loop_stop()
        self.client.disconnect()
        logger.info("MQTT service stopped")