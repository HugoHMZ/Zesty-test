import React, { Component } from 'react';
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
  Pressable
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      names: [],
      posts: [],
      theme: '',
      k: 0,
    }
  }

  componentDidMount() {
    async () => {
      const theme = useColorScheme() === "dark" ? styles.dark : styles.light;
      this.setState({ theme });
    };
  }

  changeTitle = (e) => {
    this.setState({ text: e });
  }

  Publish = () => {
    if (this.state.text != '') {
      this.setState(prevState => ({
        names: [...prevState.names, this.state.text]
      }))
      this.createPostsLists();
    }
    else
      Alert.alert('Vous devez rentrer une phrase')
  }

  getCoffeeImg = () => {
    return fetch('https://coffee.alexflipnote.dev/random.json')
      .then((response) => response.json())
      .then((json) => {
        return json.file;
      })
      .catch((error) => {
        console.log('Error while fetching coffee img, using default img\n' + error);
        return 'error'
      });
  };

  createPostsLists = () => {
    var img = 'https://coffee.alexflipnote.dev/Bg47hfAWxjA_coffee.jpg'
    this.getCoffeeImg().then(response => {
      //check if the api request succeeded
      //otherwise, use the default img
      if (response == 'error')
        response = img
      var elem =
        <View key={this.state.k} style={styles.post}>
          <Text>{this.state.text}</Text>
          <Image
            style={{ width: 305, height: 215 }}
            source={{ uri: response }}
          />
        </View>
      //add the new Post to the Posts list
      this.setState(prevState => ({
        posts: [...prevState.posts, elem],
        k: this.state.k + 1,
      }))
    })
  }


  render() {
    return (
      <SafeAreaView style={this.backgroundStyle}>
        <StatusBar barStyle={this.isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={this.backgroundStyle}>

          <View
            style={{
              backgroundColor: this.isDarkMode ? Colors.black : Colors.white,
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => this.changeTitle(e)}
              placeholder="Quoi de neuf ?"
            />
            <View style={styles.publish}>
              <Pressable  onPress={() => this.Publish()} hitSlop={{left: 20, right: 20}}>
                <Text style={styles.publishText}>{"Publier"}</Text>
              </Pressable>
            </View>
            {this.state.posts}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

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
    width: 110,
    marginLeft: 240,
    marginTop: 10,
    marginRight: 40,
    backgroundColor: '#ffed4e',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  post: {
    marginBottom: 30,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  publishText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
