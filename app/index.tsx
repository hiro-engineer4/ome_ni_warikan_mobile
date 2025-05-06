import { ScrollView, View } from 'react-native'
import Calculation from '../components/Calculation'

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
      <View>
        <Calculation />
      </View>
    </ScrollView>
  )
}
