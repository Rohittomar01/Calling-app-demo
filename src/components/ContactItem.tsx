import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact } from '../data/contacts';

type Props = {
  contact: Contact;
  onCall: (c: Contact) => void;
};

export default function ContactItem({ contact, onCall }: Props) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => onCall(contact)} style={styles.callBtn}>
        <Text style={{ color: 'white' }}>Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  phone: { color: '#666', marginTop: 4 },
  callBtn: { backgroundColor: '#0a84ff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }
});
