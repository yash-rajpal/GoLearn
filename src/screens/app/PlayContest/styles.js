/*---------------------------------------------------------------*
 *   @author: Harish Kumar                                       *
 *   @licence: Copyright, All Rights Reserved to Ajnasoft        *
 *   @flow                                                       *
 *---------------------------------------------------------------*/

import {Dimensions, StyleSheet} from 'react-native';
//theme
import theme from '../../../config/theme';
//Window Dimensions
const {width, height} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    animView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
        zIndex: 1200,
        backgroundColor: theme.colors.white,
    },
    animation: {
        width: 300,
        height: 300,
    },
    gallery: {
        width: width,
        height: height,
        ...StyleSheet.absoluteFill,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    galleryImage: {
        width: width * 0.9,
        height: height * 0.9,
    },
    closeHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 15,
        paddingTop: 10,
        zIndex: 100,
    },
    closeBtn: {
        padding: 10,
        // backgroundColor: '#eee',
    },
    modalContent: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    modalTxt: {
        color: theme.colors.theme,
        fontSize: theme.sizes.fontMd,
        fontFamily: theme.font.bold,
        textAlign: 'center',
        lineHeight: 30,
    },
    modalFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    btnDefault: {
        width: '45%',
        height: theme.sizes.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        borderRadius: 32,
    },
    btnDefaultTxt: {
        fontSize: theme.sizes.fontSm,
        color: theme.colors.theme,
        fontFamily: theme.font.regular,
    },
    bgTheme: {
        backgroundColor: theme.colors.theme,
    },
    clrWhite: {
        color: theme.colors.white,
    },
    center: {
        flex: 1,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: theme.sizes.fontMd,
        color: theme.colors.theme,
        fontFamily: theme.font.bold,
        marginBottom: 15,
    },
    backBtn: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: theme.colors.theme,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: theme.sizes.fontMd,
        color: theme.colors.white,
        fontFamily: theme.font.bold,
    },
    maskView: {
        width: '100%',
        ...StyleSheet.absoluteFill,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});

export default styles;
