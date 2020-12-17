#include "HX711.h"  
#define DOUT  D5
#define CLK  D6
 
HX711 scale(DOUT, CLK);
float calibration_factor = -306600; 
 

void setup() {
  Serial.begin(9600);
  scale.set_scale();
  scale.tare(); 
 
  long zero_factor = scale.read_average(); 
  Serial.println(zero_factor);
}
 
void loop() {

 
  scale.set_scale(calibration_factor); 
  Serial.print((-1)*scale.get_units(), 6);
  Serial.println();

}
