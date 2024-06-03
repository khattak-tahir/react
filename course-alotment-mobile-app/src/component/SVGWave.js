import React from "react";
import { View, Text, StyleSheet} from "react-native";
import Svg, { Path } from "react-native-svg";

const SVGWave = ({ customStyles }) => {
 

  const styles = StyleSheet.create({
    texttop: {
      fontSize: 55,
      textAlign: 'center',
      marginTop: 70,
      fontWeight: 'bold',
      color: 'white'
    },
  });

  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: '#1a8739', height: 150 }}>
        <Svg
          height="80%"
          width="100%"
          viewBox={`0 0 1440 330`}
          style={{ position: 'absolute', top: 130 }}
        >
          <Path
            fill="#1a8739"
            fillOpacity="1"
            d={`M0,256L24,256C48,256,96,256,144,234.7C192,213,240,171,288,176C336,181,384,235,432,218.7C480,203,528,117,576,117.3C624,117,672,203,720,229.3C768,256,816,224,864,224C912,224,960,256,1008,234.7C1056,213,1104,139,1152,133.3C1200,128,1248,192,1296,197.3C1344,203,1392,149,1416,122.7L1440,96L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z`}
          />
        </Svg>
        <Text style={styles.texttop}>Welcome!</Text>
      </View>
    </View>
  );
};

export default SVGWave;
