import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TumblrList from './components/TumblrList';
import { TEST_DATA } from './datajson.js';
import { StackNavigator } from 'react-navigation';
import TumblrPostDetails from './components/TumblrPostDetails';

const apiUrl = 'https://api.tumblr.com/v2/blog/itzahann/posts/photo';
const apiKey = '779RldqZK31ib4Bz6dOfqiIMRaZ874ySoHjk0PkQAJhUBdtR0b';
const Routes = StackNavigator({
  TumblrList: { 
    screen: TumblrList,
    navigationOptions:  {
      title:  'Welcome to Tumblr',
    }
  },
  TumblrPostDetails: {screen: TumblrPostDetails },
});

export default class App extends React.Component {
    constructor() {
      super();
      this.state = {
          posts: [],
          loading: false,
          page: 0,
          }
      this.loadMore = this.loadMore.bind(this);
    }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    this.fetchWithPage(0);
  }
  
  async fetchWithPage(pageNum) {
    const response = await fetch(`${apiUrl}?api_key=${apiKey}&limit=4&offset=${pageNum * 4}`);
    const data = await response.json();
    this.setState({
        posts: this.state.posts.concat(data.response.posts),
        loading: false,
    }); 
  }

  async loadMore() { 
    const newPage = this.state.page + 1; 
    await this.fetchWithPage(newPage); 
    this.setState({ page: newPage });
  } 
  

  render() {
    return (
      <View style={styles.container}>
        {/* <TumblrList posts={this.state.posts}
                   loadMore={this.loadMore} 
                   loading={this.state.loading}/> */}
        <Routes 
        screenProps={{
          posts: this.state.posts,
          loadMore: this.loadMore,
          loading: this.state.loading
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
