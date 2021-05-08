import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {themes} from '../../constants/colors';
import {styles} from './styles';

const Box = ({item, setsubFilter, subfilter, type}) => {
  return (
    <TouchableOpacity
      style={
        item === subfilter[type]
          ? {
              ...styles.subFilters,
              backgroundColor: themes['light'].buttonDisable,
            }
          : {...styles.subFilters}
      }
      onPress={() => {
        let tempState = {...subfilter};
        tempState[type] = item;
        setsubFilter(tempState);
      }}>
      <Text style={{textAlign: 'center'}}>{item}</Text>
    </TouchableOpacity>
  );
};
const FilteredComponentLayout = ({type, reset}) => {
  type initialFilterType = {
    Age: string;
    Topic: string;
    Class: string;
    Solved: string;
    'Questions Count': string;
  };

  const initialSubFilterState = {
    Age: '3',
    Topic: 'Addition',
    Class: 'I',
    Solved: 'Solved',
    'Questions Count': '10',
  };

  const [subFilter, setsubFilter] = useState<initialFilterType>(
    initialSubFilterState,
  );
  useEffect(() => {
    setsubFilter(initialSubFilterState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const AGE = ['3', '4', '5', '6', '7', '8'];
  const CLASS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const SOLVED = ['Solved', 'Unsolved'];
  const TOPIC = [
    'Addition',
    'Subtraction',
    'Multiplication',
    'Division',
    'Greater Than',
    'Less Than',
  ];
  const QUESTION_COUNT = ['10', '20', '30'];
  const allTypes = {
    Age: AGE,
    Class: CLASS,
    Solved: SOLVED,
    Topic: TOPIC,
    'Questions Count': QUESTION_COUNT,
  };
  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      {allTypes[type].map((item: React.ReactNode, index: any) => {
        if (index % 2 === 0)
          return (
            <View style={{flexDirection: 'row'}} key={index}>
              <Box
                item={allTypes[type][index]}
                setsubFilter={setsubFilter}
                subfilter={subFilter}
                type={type}
              />
              {index + 1 !== allTypes[type].length ? (
                <Box
                  item={allTypes[type][++index]}
                  setsubFilter={setsubFilter}
                  subfilter={subFilter}
                  type={type}
                />
              ) : null}
            </View>
          );
      })}
    </View>
  );
};

export default FilteredComponentLayout;
