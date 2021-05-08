import React, {useEffect, useRef} from 'react';
import {Dimensions, StatusBar, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';

const drawRect = (
  ctx,
  rect: {x: number; y: number; height: number; width: number},
  ratio: number,
) => {
  const {x, y, width, height} = rect;
  ctx.beginPath();
  ctx.rect(x * ratio, y * ratio, width, height);
  ctx.stroke();
};

// const googleToCanvasRect = (rect: BoundingBox) => {
//   const googleRect = rect.vertices;
//   const x0 = googleRect[0].x ? googleRect[0].x : 0;
//   const y0 = googleRect[0].y ? googleRect[0].y : 0;

//   const x1 = googleRect[2].x ? googleRect[2].x : 0;
//   const y1 = googleRect[2].y ? googleRect[2].y : 0;

//   const width = Math.abs(x1 - x0);
//   const height = Math.abs(y1 - y0);
//   return {
//     x: x0,
//     y: y0,
//     width,
//     height,
//   };
// };

const AnnotateImage = ({
  bounds,
  image,
  navigation,
}: {
  bounds: {x: number; y: number; height: number; width: number}[];
  image: string;
  navigation: any;
}) => {
  const canvasRef = useRef<Canvas>(null!);
  const {width, height} = Dimensions.get('window');

  const backAction1 = () => {
    navigation.navigate('ViewAssignment');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction1);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {width, height} = Dimensions.get('window');
    const canvasImage = new CanvasImage(canvasRef.current);
    canvasImage.crossOrigin = '';
    const canvas = canvasRef.current;
    canvasImage.addEventListener('load', () => {
      console.log('image loaded');
      const {height: H, width: W} = canvasImage;
      console.log('image height and width', height, width, H, W);
      canvas.height = H > height ? height - 50 : H;
      canvas.width = W > width ? width - 30 : W;
      const ctx = canvas.getContext('2d');

      //
      var hRatio = canvas.width / W;
      var vRatio = canvas.height / H;
      var ratio = Math.min(hRatio, vRatio);

      ctx.drawImage(canvasImage, 0, 40, W, H, 0, 0, W * ratio, H * ratio);
      bounds.forEach((bound) => {
        drawRect(ctx, bound, ratio);
      });
    });
    canvasImage.src = 'data:image/png;base64,' + image;
  }, [bounds, height, width, image]);

  return (
    <SafeAreaView style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <Canvas ref={canvasRef} />
    </SafeAreaView>
  );
};

export default AnnotateImage;
