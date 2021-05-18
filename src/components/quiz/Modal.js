import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';

const ThemeModal = ({visible, children, modalStyles, onClose, hideModal}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay} onStartShouldSetResponder={hideModal}>
                <View style={[styles.modalView, {...modalStyles}]}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default ThemeModal;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        position: 'absolute',
        minHeight: 300,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
});
