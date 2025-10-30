import { View, Text } from 'react-native'
import React from 'react'
export default function MovieList({ title }) {

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>{title}</Text>
      <Text style={{ color: '#bbb' }}>Movie list content will go here</Text>
    </View>
  )
}
