import React, {useState} from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import {themes} from '../../constants/colors';
import {styles} from './styles';
const {width} = Dimensions.get('window');
import FilteredComponentLayout from './filteredComponentLayout';

const ModalContent = () => {
  const filterTypes = ['Age', 'Topic', 'Questions Count', 'Class', 'Solved'];
  const [filter, setfilter] = useState<string>('Age');
  const [reset, setreset] = useState<boolean>(false);
  return (
    <View>
      <View style={styles.modalTopOption}>
        <Text style={styles.selectedFont}>Filters</Text>
        <TouchableOpacity
          onPress={() => {
            setreset(!reset);
          }}>
          <Text style={styles.unselectedFont}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topModalBorder} />
      <View
        style={{
          flexDirection: 'row',
          width: width,
        }}>
        <View
          style={{
            width: width * 0.3,
          }}>
          {filterTypes.map((item) => {
            return (
              <View
                key={item}
                style={{
                  marginTop: '2%',
                }}>
                <TouchableOpacity
                  key={item}
                  style={
                    filter === item
                      ? {
                          ...styles.filterButton,
                          backgroundColor: themes['light'].buttonDisable,
                        }
                      : {...styles.filterButton}
                  }
                  onPress={() => {
                    setfilter(item);
                  }}>
                  <Text
                    style={
                      filter === item
                        ? {...styles.selectedFont, textAlign: 'center'}
                        : {...styles.unselectedFont, textAlign: 'center'}
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
                <View style={{borderColor: 'balck', borderBottomWidth: 1}} />
              </View>
            );
          })}
        </View>
        <View style={styles.modalLeftRightSeperator} />
        <View>
          <FilteredComponentLayout type={filter} reset={reset} />
        </View>
      </View>
    </View>
  );
};

export default ModalContent;
