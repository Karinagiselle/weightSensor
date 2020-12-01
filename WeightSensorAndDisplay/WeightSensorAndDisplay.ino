#include "HX711.h"
#include <ESP8266WiFi.h>;
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

HX711 scale;

float calibration_factor = 2300; // this calibration factor is adjusted according to my load cell
int units;
float ounces;

// WIFI connection
const char* ssid     = "BT-R9A5QC";
const char* password = "iT7MkGvYdvi7Nk";
const char *mqttServer = "192.168.1.172"; //Use your local IP not 127.0.0.1 or localhost
const int mqttPort = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() 
{
  Serial.begin(115200);
  Wire.begin(D2, D1);

  // Connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
   delay(500);
   Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Ready");

  client.setServer(mqttServer, mqttPort);
//  client.setCallback(callback);
  
  lcd.init();
  lcd.backlight();
  lcd.print("NodeMCU Wg Scale");
  
  scale.begin(D5, D6);
  scale.set_scale();
  scale.tare();  //Reset the scale to 0

  long zero_factor = scale.read_average(); //Get a baseline reading
  Serial.print("Zero factor: "); //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  Serial.println(zero_factor);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    WiFi.mode(WIFI_STA);
    if (client.connect("ESP8266Client" )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }

}

void loop() 

{
  client.loop();
  scale.set_scale(calibration_factor); //Adjust to this calibration factor

  Serial.print("Reading: ");
  lcd.clear();
    
  units = scale.get_units(), 10;

  if (units < 0)
  {
    units = 0;
  }
 
  if (units == 0)
  {
       lcd.print("Weight :");
       lcd.print(units);
       lcd.print("  g");
       Serial.print(units);
       Serial.print(" grams"); 
       Serial.print(" calibration_factor: ");
       Serial.print(calibration_factor);
       Serial.println();
       delay(1000);
   } 
  
  if (units > 0)
  {
       lcd.print("Weight :");
       lcd.print(units);
       lcd.print("  g");
       Serial.print(units);
       Serial.print(" grams"); 
       Serial.print(" calibration_factor: ");
       Serial.print(calibration_factor);
       Serial.println();
       delay(1000);
  }

  Serial.println("Sending data to topic...");
  String unitsString = String(units);
  char unitsToSend[unitsString.length() + 1];
  unitsString.toCharArray(unitsToSend, unitsString.length() + 1);

  client.publish("esp/welcome", unitsToSend);
}
