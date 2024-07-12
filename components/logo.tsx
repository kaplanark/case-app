import * as React from 'react';
import { View, Image } from 'react-native';

export function Logo(): React.ReactElement {
    return (
      <View>
        <Image
          style={{
            width: 96,
            height: 42,
            objectFit: "contain",
            resizeMode: "contain",
          }}
          source={require("~/assets/images/logo.png")}
        ></Image>
      </View>
    );
  }