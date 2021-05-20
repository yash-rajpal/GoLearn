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
import ThemeModal from '../../../components/quiz/Modal';
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

const PlayContest = ({navigation, route}) => {
    // const {
    //     token,
    //     contestQuestions,
    // } = useSelector(state => ({
    //     token: state.token.token,
    //     contestQuestions: state.contestQuestions,
    // }));
    // const contestQuestions = [{"answer":"C","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"C","id":"ckn77skda04704tptkq3tt07v","index":1,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The main reserves of phosphorus in the biosphere is in the\n\nA.hydrosphereB.atmosphereC.lithosphereD.troposphere","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"C","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"C","id":"ckn77t2vt03604tmpsq8m4w8e","index":2,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The Loktak lake facing environmental problems is situated in\n\nA.OrissaB.AssamC.ManipurD.Kerala","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"C","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"C","id":"ckn77tmiy00804tr1ns4eeh26","index":3,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The market condition when goods and services are not freely available and thus the prices are relatively high is called\n\nA.rights issueB.sinking fundC.seller's marketD.recession","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"A","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"A","id":"ckn77u3am03224ts2w7ydlnbb","index":4,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The headquarter of 'Assam Rifles' at\n\nA.ShillongB.KohimaC.AizawlD.Itanagar","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"A","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"A","id":"ckn77uius00864tr1dtstbum3","index":5,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The language spoken in Sikkim are\n\nA.Nepali, Hindi, Lepcha, BhutaniB.MarathiC.Bengali, TripuriD.Manipuri","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"B","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"B","id":"ckn77v15304844tptaflyjf8q","index":6,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The Heads of Government of the countries which are members of the Commonwealth meet\n\nA.once a yearB.bienniallyC.at intervals of three yearsD.as and when necessary","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"A","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"A","id":"ckn77vg3404864tpttdiqp7me","index":7,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The headquarter of the International court of Justice (UNO) are located at\n\nA.Hague (Netherlands)B.Addis AbabaC.BangkokD.New York, USA","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"C","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"C","id":"ckn77vx7c01974trsfym2sp04","index":8,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The headquarter of all the following international organization are based at Vienna, excepted\n\nA.United Nations Industrial Development OrganizationB.Organization of Petroleum Exporting CountriesC.United Nations Development ProgrammeD.International Atomic Energy Agency","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"A","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"A","id":"ckn77whgx05984tqbs4j5re4v","index":9,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The headquarter of European Court of Justice (ECJ) are situated at\n\nA.LuxembourgB.ParisC.Strasbourg (France)D.San Jose, Costa Rica","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]},{"answer":"A","contestId":"ckn77s75703534tmp4yb9vpnj","explanation":"A","id":"ckn77wwle06044tqb7p090d16","index":10,"numPeopleAnsweredOption":[],"options":["A","B","C","D"],"questionImgUrls":[],"questionText":"The host of first Olympics in 1896 was\n\nA.Athens, GreeceB.Paris, FranceC.London, Great BritainD.Los Angeles, USA","explanationImgUrls":[],"questionStatus":"new","userPhotoUrls":[null]}]
    const contestQuestions = route.params.contestQuestions;
    const contest_questions = contestQuestions;
    console.log("Play quiz questions", contest_questions)
    // const {showToast} = useToast();
    // const dispatch = useDispatch();
    const [animation, setAnimation] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [expandImage, setExpandImage] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    // const {contestId, timer} = navigation.state.params;
    const timer = 30
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

        _startContest();


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
        }
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
                    console.log("Testing")
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

