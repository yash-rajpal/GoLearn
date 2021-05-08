import React from 'react';
import {View, SafeAreaView, StatusBar, FlatList} from 'react-native';
import {themes} from '../../../constants/colors';
import {styles} from './styles';
import SearchBar from '../../../components/searchBar';
import CardLayout from '../../../components/cardlayout';

export interface Props {}

export interface Data {
  title: string;
  type: string;
  noOfQuestions: number;
  Class: string;
  Description: string;
  Rating: number;
  pdfURL: string;
}

const SearchAssignment = ({navigation}) => {
  let dataObj: Data[] = [
    {
      title: 'Assignment 1',
      type: 'Addition',
      noOfQuestions: 10,
      Class: 'III',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      Rating: 4.5,
      pdfURL: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    },
    {
      title: 'Assignment 2',
      type: 'Addition',
      noOfQuestions: 10,
      Class: 'III',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      Rating: 4.5,
      pdfURL: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    },
    {
      title: 'Assignment 3',
      type: 'Addition',
      noOfQuestions: 10,
      Class: 'III',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      Rating: 4.5,
      pdfURL: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    },
    {
      title: 'Assignment 4',
      type: 'Addition',
      noOfQuestions: 10,
      Class: 'III',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      Rating: 4.5,
      pdfURL: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={themes['light'].backgroundLight}
      />
      <View style={styles.header}>
        <SearchBar />
      </View>
      <FlatList<Data>
        data={dataObj}
        contentContainerStyle={styles.body}
        keyExtractor={(item) => item.title}
        renderItem={(item) => (
          <CardLayout datasent={item['item']} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchAssignment;
