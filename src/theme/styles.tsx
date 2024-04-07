// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos para NewShippComponent
  newShippContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  newShippTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333', 
    fontWeight: 'bold',
  },
  newShippInputContainer: {
    width: '80%',
  },
  newShippInput: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  newShippButton: {
    marginVertical: 10,
    backgroundColor: '#4caf50',
  },
  newShippButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // Estilos para ShippCardComponent
  shippCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  shippCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Estilos para DetailShippScreen
  detailShippContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  detailShippTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333', 
    fontWeight: 'bold',
  },
  detailShippText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  // Estilos para LoginScreen
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333', 
    fontWeight: 'bold',
  },
  loginInputContainer: {
    width: '80%',
  },
  loginInput: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#4caf50',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loginTextNavigation: {
    marginTop: 15,
    color: '#0645AD',
    fontSize: 16,
  },
  detailOrderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailOrderInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333', 
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textNavigation: {
    marginTop: 15,
    color: '#0645AD',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
  },

  buttonContainer: {
    marginTop: 20,
  },
  
});
