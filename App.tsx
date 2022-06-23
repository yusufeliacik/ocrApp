import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import {PERMISSIONS, request} from 'react-native-permissions';

export default function App() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<
    Types.MlkitOcrResult | undefined
  >();
  const [image, setImage] = React.useState<ImagePickerResponse | undefined>();

  const requestPermission = async () => {
    await request(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      })!,
    );

    launchGallery();
  };

  const launchGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response: ImagePickerResponse) => {
        console.log(response, 'response');
        if (!response.assets) {
          throw new Error('oh!');
        }
        try {
          setImage(response);
          setResult(await MlkitOcr.detectFromUri(response.assets[0].uri));
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          setLoading(true);
          requestPermission();
        }}
        title="Start"
      />
      {image && (
        <View style={{width: '100%'}}>
          <Image
            style={{width: '100%', height: 250}}
            source={{uri: image.assets?.[0].uri}}
          />
        </View>
      )}
      {result && (
        <View>
          {result?.map((item, index) => (
            <Text key={index}>{item.text}</Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 2,
  },
});
