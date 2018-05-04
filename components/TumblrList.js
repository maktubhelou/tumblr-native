import React, { Component } from 'react';
import { View,
         Text,
         FlatList,
         StyleSheet,
         ActivityIndicator,
         ListFooterComponent } from 'react-native';
import TumblrPost from './TumblrPost';
import TumblrPostDetails from './TumblrPostDetails';

export default class TumblrList extends Component {


  render() {
    const props = this.props.screenProps;
    return (
      <FlatList
        data={props.posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={(postItem) => {
          return <TumblrPost post={postItem.item} 
                            loadDetails={() => this.props.navigation.navigate('TumblrPostDetails')} />
        }}
        refreshing={props.loading}
        onEndReached={props.loadMore}
        onEndReachedThreshold={0.05}
        refreshing={props.loading}
        ListFooterComponent={() =>
          <View>
              <ActivityIndicator size="large" />
          </View>
        }
      />
    );
  }
}

