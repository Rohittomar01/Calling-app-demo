import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CONTACTS, Contact } from '../data/contacts';
import { useNavigation } from '@react-navigation/native';
import { useCall } from '../context/CallContext';
import { styles } from './ContactList.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const PAGE_SIZE = 12;

export default function ContactList() {
  const navigation = useNavigation<any>();
  const { startOutgoingCall, triggerIncoming, state } = useCall();

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const data = useMemo(() => CONTACTS.slice(0, page * PAGE_SIZE), [page]);

  // 📞 Handle outgoing call
  const onCall = (contact: Contact) => {
    startOutgoingCall(contact);
    navigation.navigate('CallScreen', { name:contact.name, type: 'outgoing', phone:contact.phone });
  };

  // 📲 Simulate incoming call → navigate directly to call screen
  const simulateIncoming = () => {
    const c = CONTACTS[Math.floor(Math.random() * CONTACTS.length)];
    triggerIncoming(c);
    navigation.navigate('CallScreen', { contact: c, type: 'incoming' });
  };

  // 🔁 Load more contacts
  const loadMore = () => {
    if (loadingMore || data.length >= CONTACTS.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      setPage(p => p + 1);
      setLoadingMore(false);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CallLogs')}>
          <Text style={styles.callLogsText}>Call Logs</Text>
        </TouchableOpacity>
      </View>

      {/* Contact List */}
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        contentContainerStyle={{paddingHorizontal:5}}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>

            <TouchableOpacity
              onPress={() => onCall(item)}
              style={styles.callIconContainer}
            >
              <Ionicons name="call" size={26} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={() =>
          loadingMore && <ActivityIndicator style={{ margin: 16 }} />
        }
      />

      {/* Bottom Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={simulateIncoming}
          style={styles.simulateButton}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.simulateText}>Simulate Incoming Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
