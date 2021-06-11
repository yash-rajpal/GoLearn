import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useWindowDimensions,
    StatusBar,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

//Libraries
import Icon from 'react-native-vector-icons/Ionicons';
// import {useDispatch, useSelector, useStore} from 'react-redux';

//Theme
import theme from '../../config/theme';

//Components
// import {ToastType} from './Toast';

//Config
import config from '../../config/theme';

//Utils
// import localized_strings from '../../utils/Translation';

//redux
// import {
//     fetchPostSubmittedAns,
// } from '../../redux/ActionCreators';

//context
// import {useToast} from '../../context/ToastProvider';

// crashlytics
// import {crashlyticsLogError, analyticsLogEvent, AnalyticsEvents, Screens} from '../../hooks';

/**
 * Convert array to arrayOfObjects
 */
const convertArray = (array) => {
    let newData = [];
    for (let i = 0; i < array.length; ++i) {
        newData.push({name: array[i], ans: ''});
    }
    return newData;
};

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrZG41NGExMzAwODM0bTY2Y25mOHBqcWciLCJ0eXBlIjoiVGVhY2hlciIsImlhdCI6MTYwMTc0MDkxM30.P5dtl_HoPg_9GU9TZ1EPt3t8LAvO4kz2xJyZsv8DQyw';

const PlayContestHeader = (props) => {
    const {data, index, qTimer} = props;
    const {height: windowHeight, width: windowWidth} = useWindowDimensions();
    // const {token, submitAnswer} = useSelector(({token, submitAnswer}) => ({
    //     token: token.token,
    //     submitAnswer: submitAnswer,
    // }));
    // const dispatch = useDispatch();
    // const store = useStore();
    // const {showToast, showLoading} = useToast();
    const [timer, setTimer] = React.useState(qTimer);
    const [showSolution, setShowSolution] = React.useState(false);
    const [ansOptions, setAnsOptions] = React.useState(convertArray(data.options));
    const [stopQuestTimer, setStopQuestTimer] = React.useState(false);
    const [isCorrect, setIsCorrect] = React.useState();
    const [solutionOptions, setSolutionOptions] = React.useState();
    const [ansPercent, setAnsPercent] = React.useState();
    // const [submittedAns, setSubmittedAns] = React.useState();
    /*--------- Start// Commented due time not enough to evaluate solution -------*/
    // const [nextInterval, setNextInterval] = React.useState();
    // const [stopNextInterval, setStopNextInterval] = React.useState();
    /*--------- End// Commented due time not enough to evaluate solution -------*/
    const [toggleQuestion, setToggleQuestion] = React.useState(false);
    // const [toggleQuestion, setToggleQuestion] = React.useState(false);


    React.useEffect(() => {
        let isSubscribed = true;
        // console.log(route.params);
        const interval = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000);
        if (stopQuestTimer) {
            clearInterval(interval);
        }
        if (isSubscribed) {
            if (timer === 0) {
                clearInterval(interval);
                _skipQuestion();
            }
        }
        return () => {
            isSubscribed = false;
            clearInterval(interval);
        };
    }, [timer]);
    /*--------- Start// Commented due time not enough to evaluate solution -------*/
    // React.useEffect(() => {
    //     let interval;
    //     if (nextInterval) {
    //         interval = setInterval(() => {
    //             setNextInterval(nextInterval => nextInterval - 1);
    //         }, 1000);
    //     }
    //     if (stopNextInterval) {
    //         clearInterval(interval);
    //     }
    //     if (nextInterval === 0) {
    //         props.renderNext(index + 1);
    //     }
    //     return () => clearInterval(interval);
    // }, [nextInterval]);
    /*--------- End// Commented due time not enough to evaluate solution -------*/

    // React.useEffect(() => {
    //     let isSubscribed = true;
    //     if (isSubscribed) {
    //         if (!submitAnswer.isLoading && submitAnswer.submitted_ans) {
    //             showLoading(false);
    //             /*--------- End// Commented due time not enough to evaluate solution -------*/
    //             // setNextInterval(7);
    //             /*--------- End// Commented due time not enough to evaluate solution -------*/
    //         } else {
    //             if (submitAnswer.errMess) {
    //                 // crashlyticsLogError(submitAns.errMess)
    //                 showLoading(false);
    //                 // console.log(submitAnswer.errMess);
    //                 if (submitAnswer.errMess && submitAnswer.errMess.message === 'Contest is already submitted') {
    //                     console.log(submitAnswer.errMess);
    //                 } else {
    //                     showToast(ToastType.Error, submitAnswer.errMess.hasOwnProperty('message') ? submitAnswer.errMess.message : submitAns.errMess, 2000);
    //                 }
    //                 // alert('error');
    //             }
    //         }
    //     }
    //     return () => isSubscribed = false;
    // }, [submitAnswer]);
    // console.log('token', token);


    // Getting sum of numbers
    /**
     * get index of answer and update user chosen option and correctAnswer to array
     * Calculate percentage for selected and correct option
     * @filter filter the user chosen option along with correctAnswer Option
     */
    const _getAnswer = (index) => {
        // dispatch(fetchPostSubmittedAns(contestId, {questionId: data.id, response: ansOptions[index].name}, token));
        setStopQuestTimer(true);
        // showLoading(true);
        let ansIndex = data.options.indexOf(data.answer);
        // console.log(ansIndex);
        const newAnsOptions = ansOptions.map((item, i) => ({
            ...item,
            ans: i === index ? ansOptions[i].name === data.answer ? item.ans = 'correct' : 'wrong' : i === ansIndex ? item.ans = 'correct' : item.ans = '',
        }));
        // console.log(newAnsOptions);
        setAnsOptions(newAnsOptions);
        if (ansOptions[index].name === data.answer) {
            // console.log(newAnsOptions.filter(item => item.ans === 'correct'));
            setSolutionOptions(newAnsOptions.filter(item => item.ans === 'correct'));
            if (data.numPeopleAnsweredOption.length) {
                let numPeopleAnswered = data.numPeopleAnsweredOption.reduce((a, b) => {
                    return a + b;
                }, 0);
                // console.log('Play_numPeopleAnsweredOption', data.numPeopleAnsweredOption);
                // console.log('Play_contest_numPeopleAnswered', numPeopleAnswered);
                const corrAnsOption = Math.ceil((100 * parseInt(data.numPeopleAnsweredOption[ansIndex])) / parseInt(numPeopleAnswered));
                // console.log('Play_contest_correctOption', corrAnsOption);
                if (numPeopleAnswered > 0) {
                    setAnsPercent({correctPercent: corrAnsOption});
                } else {
                    setAnsPercent({correctPercent: 0});
                }
            }
            setIsCorrect(true);
            setShowSolution(true);
            //
            props.setTotalCorrect(Number(props.totalCorrect)+1);
            console.log("Correct Set", Number(props.totalCorrect))
        } else {
            // console.log(newAnsOptions.filter(item => item.ans === 'correct' || item.ans === 'wrong'));
            setSolutionOptions(newAnsOptions.filter(item => item.ans === 'correct' || item.ans === 'wrong'));
            if (data.numPeopleAnsweredOption.length) {
                let numPeopleAnswered = data.numPeopleAnsweredOption.reduce((a, b) => {
                    return a + b;
                }, 0);
                // console.log('Play_numPeopleAnsweredOption', data.numPeopleAnsweredOption);
                // console.log('Play_contest_numPeopleAnswered', numPeopleAnswered);
                const corrAnsOption = Math.ceil((100 * parseInt(data.numPeopleAnsweredOption[ansIndex])) / parseInt(numPeopleAnswered));
                const wrnAnsOption = Math.ceil((100 * parseInt(data.numPeopleAnsweredOption[index])) / parseInt(numPeopleAnswered));
                // console.log('Play_contest_corrAnsOption', corrAnsOption);
                // console.log('Play_contest_wrnAnsOption', wrnAnsOption);
                if (numPeopleAnswered > 0) {
                    setAnsPercent({
                        wrongPercent: wrnAnsOption,
                        correctPercent: corrAnsOption,
                    });
                } else {
                    setAnsPercent({
                        wrongPercent: 0,
                        correctPercent: 0,
                    });
                }
            }
            setIsCorrect(false);
            setShowSolution(true);
            //
            props.setTotalInCorrect(Number(props.totalInCorrect) + 1);
            console.log("Incorret set", Number(props.totalInCorrect))
        }
    };
    /**
     * Render Next Question
     */
    const _nextQuest = () => {
        /*--------- End// Commented due time not enough to evaluate solution -------*/
        // setStopNextInterval(true);
        /*--------- End// Commented due time not enough to evaluate solution -------*/
        props.renderNext(index + 1);
    };

    /*
     * Skip Question
     */
    const _skipQuestion = () => {
        // analyticsLogEvent(AnalyticsEvents.QuestionSkipped, {
        //     screenName: Screens.PlayContest,
        //     timeStamp: new Date().toISOString(),
        // });
        props.renderNext(index + 1);
        // dispatch(fetchPostSubmittedAns(contestId, {questionId: data.id, response: ''}, token));
    };
    /*
     * Report Question
     */
    const _report = () => {
        // console.log('report');
    };
    // console.log(solutionOptions);
    return (
        // <React.Fragment>
        <View style={[styles.card, {width: windowWidth}]}>
            <StatusBar barStyle={'light-content'} backgroundColor={theme.colors.contestBg}/>
            {/*-------Start Header------------*/}
            <View style={[styles.cardBody, {height: windowHeight * 0.4}]}>
                <View style={styles.cardHeader}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.questHeaderTxt}>Q . {index + 1}</Text>
                    </View>
                    <View style={styles.timer}>
                        <Image source={require('../../assets/Images/clock.png')} style={styles.righticon}/>
                        <Text style={styles.timerTxt}>00: {timer < 10 ? '0' + timer : timer}</Text>
                    </View>
                </View>
            </View>
            {/*-------End Header----------------------*/}
            {/*-------Start Question Block------------*/}
            <View style={styles.questBlock}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.questContainer}>
                        {data.questionText ? (
                            <View style={styles.contentCenter}>
                                {toggleQuestion && <Text style={styles.qHeading}>Solution</Text>}
                                <Text
                                    style={styles.questTxt}>{toggleQuestion ? data.explanation : data.questionText}</Text>
                            </View>
                        ) : (
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.questImg}
                                    source={{
                                        uri: toggleQuestion ? data.explanationImgUrls[0] : data.questionImgUrls[0],
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        )}

                    </View>
                </ScrollView>
                <View style={styles.questFooter}>
                    {/*<TouchableOpacity style={styles.leftOption} onPress={() => alert('report')}>*/}
                    {/*    /!*<Icon name="bug" color={theme.colors.contestBg} size={20}/>*!/*/}
                    {/*    <Text style={styles.reportTxt}>Read More</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {data && data.explanationImgUrls.length || data.questionImgUrls.length ? (
                        <TouchableOpacity style={[styles.rightOption]}
                                          onPress={() => props.expandImage(toggleQuestion ? data.explanationImgUrls[0] : data.questionImgUrls[0])}>
                            <Image source={require('../../assets/Images/expand.png')}
                                   style={styles.expandIcon}/>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            {/*------------End Question Block -------------*/}
            {/*----------Start Solutions Block-------------*/}
            <View style={[styles.questionContainer, {height: windowHeight * 0.6}]}>
                <ScrollView style={{flex: 1}}
                            contentContainerStyle={{paddingBottom: 50}}
                            showsVerticalScrollIndicator={false}>
                    {showSolution ? (
                        <View style={styles.solutionView}>
                            {data && data.numPeopleAnsweredOption.length ? (
                                <View style={styles.infoBox}>
                                    <View style={styles.infoRow}>
                                        <Icon name="information-circle" color={'#222455'} size={25}/>
                                        <Text style={styles.txtInfo}>{ansPercent && ansPercent.correctPercent}% students
                                            got
                                            this answer</Text>
                                    </View>
                                </View>
                            ) : null}
                            {solutionOptions && solutionOptions.map((item, i) => (
                                <TouchableWithoutFeedback key={i} style={[styles.listItem]}>
                                    <View
                                        style={[styles.listItem, styles.optionsRow, item.ans === 'correct' ? {
                                            backgroundColor: 'green',
                                            borderColor: 'green',
                                        } : {backgroundColor: 'red', borderColor: 'red'}]}>
                                        <Text style={[styles.listItemText, styles.colorWhite]}>{item.name}</Text>
                                        <View style={styles.flexEnd}>
                                            {/*<View style={styles.imageRow}>*/}
                                            {/*    <Image*/}
                                            {/*        source={{uri: 'https://storage.googleapis.com/saarthi-ds-prod/user-profile-pics/defaultUserPic.png'}}*/}
                                            {/*        style={[styles.imageLapse, {position: 'absolute', right: 0}]}/>*/}
                                            {/*    <Image*/}
                                            {/*        source={{uri: 'https://storage.googleapis.com/saarthi-ds-prod/user-profile-pics/defaultUserPic.png'}}*/}
                                            {/*        style={[styles.imageLapse, {position: 'absolute', right: 10}]}/>*/}
                                            {/*    <Image*/}
                                            {/*        source={{uri: 'https://storage.googleapis.com/saarthi-ds-prod/user-profile-pics/defaultUserPic.png'}}*/}
                                            {/*        style={[styles.imageLapse, {position: 'absolute', right: 20}]}/>*/}
                                            {/*</View>*/}
                                            {/*<Text style={styles.pTxt}>20%</Text>*/}
                                            {data && data.numPeopleAnsweredOption.length ? (<Text
                                                style={styles.pTxt}>{item.ans === 'correct' ? ansPercent && ansPercent.correctPercent : ansPercent && ansPercent.wrongPercent} % </Text>) : null}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                            <View style={styles.sBlock}>
                                <View
                                    style={[styles.sIcon, isCorrect ? {backgroundColor: 'green'} : {backgroundColor: 'red'}]}>
                                    <Icon name={isCorrect ? 'ios-checkmark-sharp' : 'md-close-sharp'}
                                          color={theme.colors.white} size={20}/>
                                </View>
                                <Text style={[styles.textDanger, isCorrect ? {color: 'green'} : {color: 'red'}]}>
                                    {isCorrect ? "Correct Ans" : "opps_wrong_ans"}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.optionsBtm}>
                            {ansOptions && ansOptions.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.listItem, item.ans === 'wrong' && {
                                            borderColor: 'red',
                                            borderWidth: 2,
                                        }, item.ans === 'correct' && {borderColor: 'green', borderWidth: 2}]}
                                        onPress={() => _getAnswer(index)}>
                                        <Text
                                            style={[styles.listItemText, item.ans === 'wrong' && {
                                                color: 'red',
                                            }, item.ans === 'correct' && {color: 'green'}]}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                    {/*----------End Solutions Block-------------*/}
                    {/*----------Start Actions Block-------------*/}
                    {showSolution ? (
                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.btnOutLine}
                                              onPress={() => setToggleQuestion(!toggleQuestion)}>
                                <Text style={styles.btnOutLineTxt}>Solution</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOutFill} onPress={_nextQuest}>
                                <Text style={styles.btnOutFillTxt}>Next</Text>
                                {/*<Text style={styles.textSm}>{nextInterval} to next question</Text>*/}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.btnRow, {justifyContent: 'flex-end'}]}>
                            <TouchableOpacity style={styles.btnOutLine} onPress={_skipQuestion}>
                                <Text style={styles.btnOutLineTxt}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {/*----------End Actions Block-------------*/}
                </ScrollView>
            </View>
        </View>
        // </React.Fragment>
    );
};

export default PlayContestHeader;

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        height: 'auto',
    },
    cardBody: {
        width: '100%',
        backgroundColor: theme.colors.contestBg,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'center',
        padding: 15,
    },
    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // backgroundColor: 'green',
    },
    itemLeft: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    timer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 3,
    },
    righticon: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    timerTxt: {
        fontFamily: theme.font.regular,
        fontSize: theme.sizes.fontSm,
        color: theme.colors.white,
        marginLeft: 5,
    },
    questHeaderTxt: {
        fontFamily: theme.font.regular,
        fontSize: theme.sizes.fontSm,
        color: theme.colors.white,
        borderColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
    },
    questBlock: {
        flex: 1,
        height: 220,
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        position: 'absolute',
        top: 70,
        left: 10,
        right: 10,
        borderColor: theme.colors.contestBg,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 10,
    },
    questTxt: {
        fontFamily: theme.font.regular,
        fontSize: theme.sizes.fontMd,
        color: theme.colors.contestBg,
        textAlign: 'center',
    },
    optionsBtm: {
        flex: 1,
        marginTop: 70,
        paddingHorizontal: 15,
    },
    btnRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    btnOutLine: {
        borderColor: theme.colors.contestBg,
        borderWidth: 1,
        // padding: 15,
        width: 120,
        height: theme.sizes.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
    },
    btnOutLineTxt: {
        fontFamily: theme.font.bold,
        fontSize: theme.sizes.fontSm + 2,
        color: theme.colors.contestBg,
    },
    btnOutFill: {
        borderColor: theme.colors.contestBg,
        borderWidth: 1,
        backgroundColor: theme.colors.contestBg,
        // padding: 15,
        width: 120,
        height: theme.sizes.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
    },
    btnOutFillTxt: {
        fontFamily: theme.font.bold,
        fontSize: theme.sizes.fontSm + 2,
        color: theme.colors.white,
    },
    listItem: {
        width: '100%',
        height: config.sizes.height + 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.contestBg,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    listItemText: {
        paddingLeft: 15,
        fontSize: 14,
        fontFamily: config.font.bold,
        color: config.colors.contestBg,
    },
    correctAns: {
        borderColor: 'green',
    },
    wrongAns: {
        borderColor: 'red',
    },
    solutionView: {
        flex: 1,
        marginTop: 70,
        paddingHorizontal: 15,
    },
    optionsRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    colorWhite: {
        color: theme.colors.white,
    },
    flexEnd: {
        // flex: 0.3,
        flexDirection: 'row',
        // justifyContent: 'flex-end'
        // backgroundColor: 'blue',
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    imageLapse: {
        width: 25,
        height: 25,
        borderRadius: 50,
        borderColor: theme.colors.white,
        borderWidth: 3,
    },
    pTxt: {
        color: theme.colors.white,
        fontSize: theme.sizes.fontSm,
        fontFamily: theme.font.bold,
    },
    sBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    textDanger: {
        textAlign: 'center',
        color: 'red',
        fontFamily: theme.font.bold,
        fontSize: theme.sizes.fontSm,
        // paddingHorizontal: 10,
    },
    sIcon: {
        width: 30,
        height: 30,
        borderRadius: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    infoBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    infoRow: {
        // width: '80%',
        backgroundColor: '#c6c4ff',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        marginBottom: 15,
    },
    txtInfo: {
        fontSize: theme.sizes.fontSm,
        // fontFamily: theme.font.regular,
        color: '#222455',
    },
    questFooter: {
        // width: '100%',
        // flex:1,
        // bottom: 0,
        position: 'absolute',
        right: 10,
        left: 10,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 50,
        height: 40,
        // paddingHorizontal: 10,
        // backgroundColor: 'grey',
    },
    leftOption: {
        height: '100%',
        // width: 100,
        // height: '100%',
        // backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightOption: {
        width: 100,
        height: '100%',
        // backgroundColor: 'green',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    expandIcon: {
        width: 20,
        height: 20,
    },
    textSm: {
        color: theme.colors.white,
        fontFamily: theme.font.regular,
        fontSize: theme.sizes.fontXs,
    },
    questContainer: {
        flex: 1,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    reportTxt: {
        color: theme.colors.contestBg,
        fontSize: theme.sizes.fontSm,
        fontFamily: theme.font.regular,
    },
    qHeading: {
        color: theme.colors.contestBg,
        fontFamily: theme.font.bold,
        fontSize: theme.sizes.fontMd,
        textAlign: 'center',
        marginBottom: 10,
    },
    questImage: {
        width: '100%',
        height: 300,
    },
    imgContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        borderRadius: 8,
    },
    questImg: {
        width: 300,
        height: 180,
        borderRadius: 8,
    },
    contentCenter: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    questionContainer: {
        width: '100%',
        height: 350,
        paddingTop: 0,
    },
});
