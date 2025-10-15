import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { Contact } from '../data/contacts';

const { width } = Dimensions.get('window');

type Props = {
  visible: boolean;
  contact?: Contact | null;
  onAccept: () => void;
  onReject: () => void;
};

export default function IncomingCallModal({ visible, contact, onAccept, onReject }: Props) {
  const translateX = React.useRef(new Animated.Value(0)).current;

  const pan = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => translateX.setValue(gesture.dx),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > width * 0.25) {
          Animated.timing(translateX, { toValue: width, duration: 200, useNativeDriver: true }).start(onAccept);
        } else if (gesture.dx < -width * 0.25) {
          Animated.timing(translateX, { toValue: -width, duration: 200, useNativeDriver: true }).start(onReject);
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }
      }
    })
  ).current;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Animated.View style={[styles.card, { transform: [{ translateX }] }]} {...pan.panHandlers}>
          <Text style={styles.title}>Incoming Call</Text>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.phone}>{contact?.phone}</Text>
          <Text style={styles.hint}>Swipe right to accept, left to reject</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  name: { fontSize: 22, fontWeight: '800' },
  phone: { marginTop: 8, color: '#666' },
  hint: { marginTop: 12, color: '#999' }
});
