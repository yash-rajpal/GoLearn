import React, {useState} from 'react';
import {
  View,
  Dimensions,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {themes} from '../../constants/colors';
import {styles} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomModal from '../bottomModal';

const {width} = Dimensions.get('window');

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const [visible, SetVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 0.1 * width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5
          name="search"
          size={0.05 * width}
          color={themes['light'].headings}
        />
      </View>
      <View style={{width: 0.7 * width}}>
        <TextInput
          onChange={(
            e: NativeSyntheticEvent<TextInputChangeEventData>,
          ): void => {
            const value = e.nativeEvent.text;
            setQuery(value);
          }}
          placeholderTextColor={themes['light'].inactiveTintColor}
          defaultValue={query}
          placeholder="Search for assignments ..."
        />
      </View>
      <View
        style={{
          width: 0.1 * width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5
          onPress={() => {
            SetVisible(true);
          }}
          name="sliders-h"
          size={0.05 * width}
          color={themes['light'].headings}
        />
      </View>
      <BottomModal visible={visible} SetVisible={SetVisible} />
    </View>
  );
};

export default SearchBar;
