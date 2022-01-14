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
  Pressable,
  Appearance
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      names: [],
      posts: [],
      k: 0,
      currentTheme: Appearance.getColorScheme(),
    }
  }

  componentDidMount() {
    Appearance.addChangeListener(this.onAppThemeChanged);
  };

  componentWillUnmount() {
    Appearance.addChangeListener(this.onAppThemeChanged);
  };

  onAppThemeChanged = (theme) => {
    const currentTheme = theme;
    this.setState({ currentTheme: currentTheme });
  };

  changeTitle = (e) => {
    this.setState({ input: e });
  }

  Publish = () => {
    //check if we are creating a post with a non empty title
    if (this.state.input != '') {
      this.setState(prevState => ({
        names: [...prevState.names, this.state.input]
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
          <Text style={styles.title}>{this.state.input}</Text>
          <Image
            style={{ width: 305, height: 215 }}
            source={{ uri: response }}
          />
        </View>
      //add the new Post to the Posts list
      this.setState(prevState => ({
        posts: [elem, ...prevState.posts],
        k: this.state.k + 1,
      }))
    })
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: this.state.currentTheme === "dark" ? '#dcdcdc' : Colors.white, height: '100%' }}>
        <StatusBar barStyle={this.state.currentTheme === "dark" ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ backgroundColor: this.state.currentTheme === "dark" ? '#dcdcdc' : Colors.white }}>
          <View
            style={{
              backgroundColor: this.state.currentTheme === "dark" ? '#dcdcdc' : Colors.white,
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(e) => this.changeTitle(e)}
              placeholder="Quoi de neuf ?"
              placeholderTextColor={this.state.currentTheme === "dark" ? '#696969' : '#dcdcdc'}
            />
            <View style={styles.publish}>
              <Pressable onPress={() => this.Publish()} hitSlop={{ left: 20, right: 20 }}>
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
    marginLeft: 'auto',
    marginRight: 'auto',
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
  publishText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
