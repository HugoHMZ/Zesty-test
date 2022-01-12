import React from 'react';
import { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Image,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, setText] = React.useState('');
  const [names, setNames] = React.useState([]);
  //const [posts, setPosts] = React.useState([]);


  const Publish = () => {
    if (text != '') {
      names.push(text)
      Alert.alert('Publication réussi !')
    }
    else
      Alert.alert('Vous devez rentrer une phrase')

  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            placeholder="Quoi de neuf?"
          />
          <View style={styles.publish}>
            <Button
              title="Publier"
              style={styles.publish}

              onPress={() => Publish()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

{/* <Section title="Step One">
            Edit App.js to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  publish: {
    paddingLeft: 100,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
