import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  Pressable,
  Appearance
} from 'react-native';
import { styles } from './Styles.js'

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

  isDarkMode = () => {
    if (this.state.currentTheme === "dark")
      return true
    else
      return false
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
      <SafeAreaView style={[
        this.isDarkMode() ? styles.darkBg : styles.lightBg, { height: '100%' }]
      }>
        <StatusBar barStyle={this.isDarkMode() ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={
            this.isDarkMode() ? styles.darkBg : styles.lightBg
          }>
          <View
            style={
              this.isDarkMode() ? styles.darkBg : styles.lightBg
            }>
            <TextInput
              style={styles.input}
              onChangeText={(e) => this.changeTitle(e)}
              placeholder="Quoi de neuf ?"
              placeholderTextColor={this.isDarkMode() ? '#696969' : '#dcdcdc'}
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

export default App;
