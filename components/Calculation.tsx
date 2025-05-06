import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type Result = {
  omeExam: number
  sukunameExam: number
  payExam: number
  changeExam: number
}

export default function Calculation() {
  const [omePeopleNum, setOmePeopleNum] = useState('1')
  const [sukunamePeopleNum, setSukunamePeopleNum] = useState('1')
  const [num, setNum] = useState('0')
  const [results, setResults] = useState<Result | null>(null)

  const calculate = () => {
    const ome = parseInt(omePeopleNum.replace(/,/g, '')) || 0;
    const sukuname = parseInt(sukunamePeopleNum.replace(/,/g, '')) || 0;
    const total = parseInt(num.replace(/,/g, '')) || 0;
    const all = ome + sukuname;
  
    if (all === 0 || total === 0) {
      setResults({
        omeExam: 0,
        sukunameExam: 0,
        payExam: 0,
        changeExam: 0,
      });
      return;
    }
  
    let sukunameExam = 0;
    let omeExam = 0;
  
    if (ome === 0) {
      // 多めが0 → 100%割り勘で分配
      sukunameExam = Math.ceil(total / sukuname / 100) * 100;
    } else if (sukuname === 0) {
      // 少なめが0 → 全額を多めで負担
      omeExam = Math.ceil(total / ome / 100) * 100;
    } else {
      // 通常ロジック（80/20分割）
      sukunameExam = Math.floor((total * 0.8) / all / 100) * 100;
      omeExam = Math.ceil(
        (total - sukunameExam * sukuname) / ome / 100,
      ) * 100;
    }
  
    const payExam = omeExam * ome + sukunameExam * sukuname;
    const changeExam = Math.max(payExam - total, 0);
  
    setResults({ omeExam, sukunameExam, payExam, changeExam });
  };  

  const formatNumber = (value: string) => {
    const number = value.replace(/,/g, '').replace(/[^0-9]/g, '');
    if (number === '') return '';
    return parseInt(number).toLocaleString();
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>多め ni ワリカン</Text>

      {/* 多めに払う人 */}
      <View style={styles.inputGroup}>
        <View style={styles.imageLabel}>
          <Image source={require('../assets/images/fat.png')} style={styles.icon} />
          <Text style={styles.label}>多めに払う人</Text>
        </View>
        <TextInput
          style={styles.input}
          value={omePeopleNum}
          keyboardType="numeric"
          onChangeText={setOmePeopleNum}
        />
      </View>

      {/* 少なめに払う人 */}
      <View style={styles.inputGroup}>
        <View style={styles.imageLabel}>
          <Image source={require('../assets/images/ojigi.png')} style={styles.icon} />
          <Text style={styles.label}>少なめに払う人</Text>
        </View>
        <TextInput
          style={styles.input}
          value={sukunamePeopleNum}
          keyboardType="numeric"
          onChangeText={setSukunamePeopleNum}
        />
      </View>

      {/* 合計金額 */}
      <View style={styles.inputGroup}>
        <View style={styles.imageLabel}>
          <Image source={require('../assets/images/yen.png')} style={styles.icon} />
          <Text style={styles.label}>合計金額</Text>
        </View>
        <TextInput
          style={styles.input}
          value={num}
          keyboardType="numeric"
          onChangeText={(text) => {
            const clean = text.replace(/,/g, '').replace(/[^0-9]/g, '');
            setNum(formatNumber(clean));
          }}
        />
      </View>

      {/* ボタン */}
      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>計算する！</Text>
      </TouchableOpacity>

      {/* 結果表示 */}
      {results && (
        <View style={styles.resultContainer}>
          <View style={styles.resultBlock}>
            <View style={styles.imageLabel}>
              <Image source={require('../assets/images/fat.png')} style={styles.icon} />
              <Text style={styles.label}>多めに払う人</Text>
            </View>
            <Text style={styles.resultText}>
              <Text style={styles.highlight}>{results.omeExam.toLocaleString()}円</Text>
            </Text>
          </View>

          <View style={styles.resultBlock}>
            <View style={styles.imageLabel}>
              <Image source={require('../assets/images/ojigi.png')} style={styles.icon} />
              <Text style={styles.label}>少なめに払う人</Text>
            </View>
            <Text style={styles.resultText}>
              <Text style={styles.highlight}>{results.sukunameExam.toLocaleString()}円</Text>
            </Text>
          </View>

          <View style={styles.resultBlock}>
            <View style={styles.imageLabel}>
              <Image source={require('../assets/images/yen.png')} style={styles.icon} />
              <Text style={styles.label}>支払金額</Text>
            </View>
            <Text style={styles.resultText}>
              <Text style={styles.highlight}>{results.payExam.toLocaleString()}円</Text>
            </Text>
          </View>

          <View style={styles.resultBlock}>
            <View style={styles.imageLabel}>
              <Image source={require('../assets/images/yen.png')} style={styles.icon} />
              <Text style={styles.label}>おつり</Text>
            </View>
            <Text style={styles.resultText}>
              <Text style={styles.highlight}>{results.changeExam.toLocaleString()}円</Text>
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 48,
  },
  inputGroup: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 16,
  },
  imageLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#EB6100',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 40,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '100%',
    maxWidth: 500,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  resultBlock: {
    marginBottom: 16,
  },
  resultText: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  highlight: {
    color: '#EB6100',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
