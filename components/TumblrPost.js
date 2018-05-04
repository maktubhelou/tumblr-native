import React, { Component } from 'react';
import { View, 
         Text,
         FlatList,
         StyleSheet,
         Image,
         TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 400
  }
});

export default class TumblrPost extends Component {

  render() { 
    console.log(this.props);
    const img = { uri: this.props.post.photos[0].original_size.url }; 
    console.log(this.props.post.photos[0].original_size.url);
    return ( 
      <TouchableHighlight onPress={this.props.loadDetails}>
        <View style={styles.container}> 
          <Image style={styles.image} source={img} /> 
        </View>
      </TouchableHighlight>
    );
  }
}

