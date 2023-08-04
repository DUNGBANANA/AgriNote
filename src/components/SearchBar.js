import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import search from '../assets/search.png';

import Fuse from 'fuse.js';

const {width} = Dimensions.get('window');

const SearchBar = ({data, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = text => {
    console.log("====>>>>", text)
    setSearchTerm(text);
    if (text) {
      const fuse = new Fuse(data, {keys: ['plot_name', 'plot_code']});
      const results = fuse.search(text);
      const searchResults = results.map((result, index) => result.item);
      // console.log("====>",searchResults)

      onSearch(searchResults);
    } 
    else {
      onSearch(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm theo tên"
          onChangeText={handleSearch}
          value={searchTerm}
          placeholderTextColor="black"
          style={styles.searchText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
  searchText: {
    flex: 1,
    fontStyle: 'italic',
    paddingLeft: 6,
    color: 'black',
  },
});

export default SearchBar;
