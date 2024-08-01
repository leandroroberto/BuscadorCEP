import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';

import api from './src/service/api'

export default function App() {


  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [userCep, setUserCep] = useState(null)

  async function buscar() {
    if (cep == '' || cep.length < 8) {
      alert('Digite um cep válido!')
      setCep('')
      return
    }

    try {
      const response = await api.get(`/${cep}/json`)
      setUserCep(response.data)
      Keyboard.dismiss()
    } catch (error) {
      console.log('Erro:' + error)
    }

  }

  function limpar() {
    setCep('')
    setUserCep(null)
    inputRef.current.focus()
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 04844300'
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType='numeric'
          maxLength={8}
          ref={inputRef}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity onPress={buscar} style={[styles.botao, { backgroundColor: '#1d75cd' }]}>
          <Text style={styles.btnTexto}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={limpar} >
          <Text style={styles.btnTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {userCep &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>Cep: {userCep.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {userCep.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {userCep.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {userCep.localidade}</Text>
          <Text style={styles.itemText}>Estado: {userCep.uf}</Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#e2e3e1'
  },

  title: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },

  btnArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15
  },

  botao: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#cd3e1d'
  },

  btnTexto: {
    fontSize: 20,
    color: '#FFF'
  },

  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  itemText: {
    fontSize: 25,
    textAlign: 'center'
  }
});
