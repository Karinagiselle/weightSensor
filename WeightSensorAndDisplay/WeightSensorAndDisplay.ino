#include "HX711.h"
#include <ESP8266WiFi.h>;
//#include <WiFiClient.h>;
#include <ThingSpeak.h>;
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

HX711 scale;

float calibration_factor = 2300; // this calibration factor is adjusted according to my load cell
int units;
float ounces;

// WIFI connection
const char* ssid     = "BT-R9A5QC";
const char* password = "iT7MkGvYdvi7Nk";

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
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Ready");
  
  lcd.init();
  lcd.backlight();
  lcd.print("NodeMCU Wg Scale");
  
  scale.begin(D5, D6);
  scale.set_scale();
  scale.tare();  //Reset the scale to 0

  long zero_factor = scale.read_average(); //Get a baseline reading
  Serial.print("Zero factor: "); //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  Serial.println(zero_factor);

}

void loop() 

{

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
}
