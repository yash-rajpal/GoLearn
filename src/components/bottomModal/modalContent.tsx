import React, { useState } from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { themes } from "../../constants/colors";
import { styles } from "./styles";
const { width } = Dimensions.get("window");
import FilteredComponentLayout from "./filteredComponentLayout";
import { TextInput } from "react-native-gesture-handler";

const ModalContent = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [text, setText] = useState('');
  return (
    <View style={{}}>
      <View style={{ alignSelf: "center", marginTop: 10 }}>
        <Text style={{ fontSize: 28 }}>Create Quiz</Text>
      </View>
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 18, marginLeft: "5%" }}>Name</Text>
        <TextInput
          style={{
            width: "90%",
            borderBottomWidth: 2,
            borderColor: "blue",
            alignSelf: "center",
          }}
          onChangeText = {(t)=>setName(t)}
          placeholder="Enter Name of the Quiz"
        />
        <View style={{ height: "10%" }} />
        <Text style={{ fontSize: 18, marginLeft: "5%" }}>Description</Text>
        <TextInput
          style={{
            width: "90%",
            borderBottomWidth: 2,
            borderColor: "blue",
            alignSelf: "center",
          }}
          onChangeText = {(t)=>setDesc(t)}
          placeholder="Enter Description for the quiz"
        />
        <View style={{ height: "10%" }} />
        <Text style={{ fontSize: 18, marginLeft: "5%" }}>Text</Text>
        <TextInput
          style={{
            width: "90%",
            borderBottomWidth: 2,
            borderColor: "blue",
            alignSelf: "center",
            height: 100,
          }}
          onChangeText = {(t)=>setText(t)}
          placeholder="Enter the content for quiz"
          multiline
        />
        <View style={{ height: "10%" }} />
        <TouchableOpacity
          style={{
            width: 0.5 * width,
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 0.2,
            borderColor: "#e5e5e5",
            padding: 10,
            elevation: 2,
            backgroundColor: "rgba(91, 102, 255, 0.8)",
            alignSelf:'center'
          }}
          onPress={()=> console.log("Testing", name, desc, text)}
        >
          <Text style={{ fontSize: 18, color:'#fff' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const ModalContent = () => {
//   const filterTypes = ['Age', 'Topic', 'Questions Count', 'Class', 'Solved'];
//   const [filter, setfilter] = useState<string>('Age');
//   const [reset, setreset] = useState<boolean>(false);
//   return (
//     <View>
//       <View style={styles.modalTopOption}>
//         <Text style={styles.selectedFont}>Filters</Text>
//         <TouchableOpacity
//           onPress={() => {
//             setreset(!reset);
//           }}>
//           <Text style={styles.unselectedFont}>Reset</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.topModalBorder} />
//       <View
//         style={{
//           flexDirection: 'row',
//           width: width,
//         }}>
//         <View
//           style={{
//             width: width * 0.3,
//           }}>
//           {filterTypes.map((item) => {
//             return (
//               <View
//                 key={item}
//                 style={{
//                   marginTop: '2%',
//                 }}>
//                 <TouchableOpacity
//                   key={item}
//                   style={
//                     filter === item
//                       ? {
//                           ...styles.filterButton,
//                           backgroundColor: themes['light'].buttonDisable,
//                         }
//                       : {...styles.filterButton}
//                   }
//                   onPress={() => {
//                     setfilter(item);
//                   }}>
//                   <Text
//                     style={
//                       filter === item
//                         ? {...styles.selectedFont, textAlign: 'center'}
//                         : {...styles.unselectedFont, textAlign: 'center'}
//                     }>
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//                 <View style={{borderColor: 'balck', borderBottomWidth: 1}} />
//               </View>
//             );
//           })}
//         </View>
//         <View style={styles.modalLeftRightSeperator} />
//         <View>
//           <FilteredComponentLayout type={filter} reset={reset} />
//         </View>
//       </View>
//     </View>
//   );
// };

export default ModalContent;
