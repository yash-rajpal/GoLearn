/*---------------------------------------------------------------*
 *   @author: Harish Kumar                                       *
 *   @licence: Copyright, All Rights Reserved to Saarthiapp      *
 *   @flow                                                       *
 *---------------------------------------------------------------*/
import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    BackHandler,
    ActivityIndicator,
} from 'react-native';

//Libraries
// import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {NavigationEvents} from 'react-navigation';


//Styles
import styles from './styles';

//Components
import PlayContestHeader from '../../../components/quiz/PlayContestHeader';
import {ThemeModal} from '../../../components/quiz/Modal';
// import {ToastType} from '../../../components/common/Toast'

//Utils
// import localized_strings from '../../../utils/Translation';

//theme
import theme from '../../../config/theme';


//redux
// import {
//     fetchContestQuestions,
// } from '../../../redux/ActionCreators';

//context
// import {useToast} from '../../../context/ToastProvider';

// analytics and crashlytics
// import {analyticsLogEvent, AnalyticsEvents, Screens} from '../../../hooks';
// import config from '../../../config/theme';

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrZG41NGExMzAwODM0bTY2Y25mOHBqcWciLCJ0eXBlIjoiVGVhY2hlciIsImlhdCI6MTYwMTc0MDkxM30.P5dtl_HoPg_9GU9TZ1EPt3t8LAvO4kz2xJyZsv8DQyw';

const PlayContest = ({navigation}) => {
    // const {
    //     token,
    //     contestQuestions,
    // } = useSelector(state => ({
    //     token: state.token.token,
    //     contestQuestions: state.contestQuestions,
    // }));
    const contestQuestions = require('../../../constants/questions_dummy.json')
    const {contest_questions} = contestQuestions;
    // const {showToast} = useToast();
    // const dispatch = useDispatch();
    const [animation, setAnimation] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [expandImage, setExpandImage] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    // const {contestId, timer} = navigation.state.params;
    const timer = 3000
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
        // navigation.setParams({tabBarVisible: false});
        // console.log('PlayContest', store.getState());
        setQuestionIndex(0);
        setAnimation(true);
        setTimeout(() => {
            setAnimation(false);
        }, 4000);
        //API CAll Fetch Quiz
        // dispatch(fetchContestQuestions(contestId, token));

        //backhandler
        const backAction = () => {
            setModalVisible(!modalVisible);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => {
            // Remove the listener when you are done
            // navFocus.remove();
            backHandler.remove();
        };
    }, []);

    React.useEffect(() => {
        if (contestQuestions.errMess) {
            // showToast(ToastType.Error, contestQuestions.errMess.hasOwnProperty('message') ? contestQuestions.errMess.message : contestQuestions.errMess, 2000)
            console.log("Error bhaag salle")
        }
        _startContest();
    }, [contestQuestions])

    /**
     * Render contest questions
     */
    const _renderNextQuestion = i => {
        console.log('next' + i);
        if (questionIndex < contest_questions.length - 1) {
            setQuestionIndex(i);
        } else {
            // alert('navigate');
            // navigation.navigate('ContestFeedback', {
            //     contestId: contestId,
            // });
            setLoading(true);
        }
    };
    /**
     * Navigate Home
     */
    const _navigatePrev = () => {
        // analyticsLogEvent(
        //     questionIndex > 0 ?
        //         AnalyticsEvents.ExitContestPlayedOne :
        //         AnalyticsEvents.ExitContestNoPlay, {
        //         screenName: Screens.PlayContest,
        //         timeStamp: new Date().toISOString(),
        //     });
        setModalVisible(!modalVisible);
        // navigation.navigate('Home');
    };
    /**
     * Navigation Focus
     */
    const _startContest = () => {
        // dispatch(fetchContestQuestions(contestId, token));
        // console.log('playId', contestId);
        setQuestionIndex(0);
        setAnimation(true);
        setLoading(false);
        setTimeout(() => {
            setAnimation(false);
        }, 4000);
    };
    return (
        <SafeAreaView style={styles.container}>
            {loading || contestQuestions.isLoading ?
                <View style={styles.maskView}>
                    <ActivityIndicator size="large" color={theme.colors.primary}/>
                </View> : null}
            {expandImage ? (
                <View style={styles.gallery} onStartShouldSetResponder={() => setExpandImage(null)}>
                    <View style={styles.closeHeader}>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setExpandImage(null)}
                                          activeOpacity={1}>
                            <Icon name="close" color={theme.colors.white} size={25}/>
                        </TouchableOpacity>
                    </View>
                    <Image source={{uri: expandImage}} style={styles.galleryImage} resizeMode="contain"/>
                </View>
            ) : null}
            <ThemeModal visible={modalVisible} hideModal={() => setModalVisible(!modalVisible)}
                        modalStyles={{borderRadius: 8, width: '85%', minHeight: 150}}>
                <View style={styles.modalContent}>
                    <Text
                        style={styles.modalTxt}>
                        {/* {localized_strings.sure_quit} */}
                        quit
                    </Text>
                </View>
                <View style={styles.modalFooter}>
                    <TouchableOpacity style={styles.btnDefault} onPress={_navigatePrev}>
                        <Text
                            style={styles.btnDefaultTxt}>
                            {/* {localized_strings.quit} */}
                            quit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnDefault, styles.bgTheme]}
                                      onPress={() => setModalVisible(!modalVisible)}>
                        <Text
                            style={[styles.btnDefaultTxt, styles.clrWhite]}>
                            {/* {localized_strings.keep_playing} */}
                            keep playing
                        </Text>
                    </TouchableOpacity>
                </View>
            </ThemeModal>
            {animation ? (
                <View style={styles.animView}>
                    <LottieView source={require('../../../assets/loading.json')} autoPlay
                                style={styles.animation}/>
                </View>
            ) : (
                contest_questions && contest_questions.length ? contest_questions.map((item, i) => {
                    return (
                        i === questionIndex ? (
                            <PlayContestHeader data={item}
                                               index={i}
                                               renderNext={_renderNextQuestion}
                                               expandImage={(img) => setExpandImage(img)}
                                               qTimer={timer}/>
                        ) : null
                    );
                }) : <View style={styles.center}>
                    <Text style={styles.heading}>Oops no contest data found</Text>
                    <TouchableOpacity onPress={() => console.log("Go Home")} style={styles.backBtn}>
                        <Text style={styles.btnTxt}>Go To Home</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* <NavigationEvents
                onDidFocus={() => _startContest()}
            /> */}
        </SafeAreaView>
    );
};

export default PlayContest;

