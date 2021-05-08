import React, {useState} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import {themes} from '../../constants/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');

const carouselImages = [
  {
    img: require('../../assets/Images/Login/loginCarousel.png'),
  },
  {
    img: require('../../assets/Images/Login/otpCarousel.png'),
  },
  {
    img: require('../../assets/Images/Login/otpCarousel.png'),
  },
];

const _renderItem = ({item}) => {
  return (
    <View style={{alignSelf: 'center'}}>
      <Image source={item.img} style={styles.topImage} resizeMode="contain" />
    </View>
  );
};

const pagination = (activeSlide: number) => {
  return (
    <Pagination
      dotsLength={carouselImages.length}
      activeDotIndex={activeSlide}
      dotStyle={styles.dotStyle}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};
const CarouselComponent = () => {
  const [activeSlide, setactiveSlide] = useState<number>(0);
  return (
    <View>
      <Carousel
        data={carouselImages}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        autoplay
        loopClonesPerSide={3}
        loop
        autoplayInterval={4000}
        onBeforeSnapToItem={(index) => {
          setactiveSlide(index);
        }}
        onSnapToItem={(index) => {
          setactiveSlide(index);
        }}
        removeClippedSubviews={true}
        firstItem={activeSlide}
      />
      {pagination(activeSlide)}
    </View>
  );
};

const Layout = (props) => {
  const {children} = props;
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: themes['light'].backgroundDark}}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={themes['light'].backgroundDark} />
        <KeyboardAvoidingView behavior="height">
          <ScrollView>
            <View style={styles.top}>
              <CarouselComponent />
            </View>
            <View style={styles.bottom}>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: themes['light'].backgroundDark,
                }}
              />
              <View
                style={{
                  height: 0.46 * height,
                  backgroundColor: themes['light'].backgroundLight,
                  borderTopLeftRadius: width * 0.18,
                }}>
                {children}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Layout;
