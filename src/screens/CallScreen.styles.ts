import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f14',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },

  phoneText: {
    fontSize: 16,
    color: '#b2bec3',
  },

  statusText: {
    fontSize: 18,
    color: '#1dd1a1',
    fontWeight: '600',
    marginTop: 12,
  },

  avatarContainer: {
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: '#1e272e',
    borderWidth: 2,
    borderColor: '#1dd1a1',
    shadowColor: '#1dd1a1',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },

  incomingText: {
    fontSize: 18,
    color: '#d2dae2',
    marginBottom: 20,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },

  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
  },

  accept: {
    backgroundColor: '#10ac84',
    shadowColor: '#10ac84',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  decline: {
    backgroundColor: '#ee5253',
    shadowColor: '#ee5253',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  wideButtonContainer: {
    width: '80%',
    marginTop: 28,
  },

  wideButton: {
    borderRadius: 40,
    paddingVertical: 14,
    alignItems: 'center',
  },

  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
    gap:5
  },

  controlButton: {
    backgroundColor: '#1e272e',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 50,
    alignItems: 'center',
    width: '50%',
    // shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,

  },

  controlText: {
    color: '#dfe6e9',
    fontSize: 15,
    fontWeight: '600',
  },

  endedText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff6b6b',
    marginTop: 80,
  },
});
