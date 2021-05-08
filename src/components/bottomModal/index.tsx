import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import ModalContent from './modalContent';
import {styles} from './styles';

const BottomModal = (props) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  /**
   *  To dismiss/hide the modal.
   *  Sets the visible state in parent component(searchAssignment) as false
   *  and triggers the closing animation.
   */
  const handleDismiss = () => {
    props.SetVisible(false);
    closeAnim.start(props.onDismiss);
  };

  useEffect(() => {
    resetPositionAnim.start();
  }, [resetPositionAnim]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 380) {
          return handleDismiss();
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  return (
    <Modal
      animated
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={handleDismiss}>
      <TouchableOpacity onPress={() => handleDismiss()} style={styles.overlay}>
        <StatusBar translucent backgroundColor="transparent" />
        <Animated.View
          style={{
            ...styles.container,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.sliderIndicatorRow}>
            <View style={styles.sliderIndicator} />
          </View>
          <ModalContent />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomModal;
