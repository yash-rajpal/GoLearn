import React, { useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { themes } from "../../constants/colors";
import { styles } from "./styles";
const { width } = Dimensions.get("window");
import FilteredComponentLayout from "./filteredComponentLayout";
import { TextInput } from "react-native-gesture-handler";
import { startQuiz } from "../../api";

const ModalContent = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  if(!loading)
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
          onPress={async ()=> {
            let obj = {
              name,
              desc,
              text : text ? text : "London Wildlife Trust, founded in 1981, is the local nature conservation charity for Greater London. It is one of 46 members of the Royal Society of Wildlife Trusts (known as The Wildlife Trusts), each of which is a local nature-conservation charity for its area. The trust aims to protect London's wildlife and wild spaces, and it manages over 40 nature reserves in Greater London. The trust's oldest reserves include Sydenham Hill Wood (pictured), which was managed by Southwark Wildlife Group before 1982 and was thus already a trust reserve at that date. The campaign to save Gunnersbury Triangle began that same year, succeeding in 1983 when a public inquiry ruled that the site could not be developed because of its value for nature. The trust has some 50 members of staff and 500 volunteers who work together on activities such as water management, chalk grassland restoration, helping people with special needs, and giving children an opportunity to go pond-dipping.2"
            }
            setLoading(true);
            const res = await startQuiz(obj,"bb8c3b567bce1910e2b64c12352b6c2432c2ccc4")
            if(res)

            console.log("Waiting", res)
          }}
        >
          <Text style={{ fontSize: 18, color:'#fff' }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Generating Quiz...</Text>
      <Text>Chunking Data...</Text>
      <ActivityIndicator style={{marginTop:20}} size={50} color="rgba(91, 102, 255, 1)" 
      />
      <Text style={{marginTop:20}}>Please wait while we start the quiz</Text>
    </View>
  )
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
