import { View, Text, Dimensions, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    return (
        <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 20 }}>Trending Now</Text>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8 }}
                snapToInterval={width * 0.6 + 16} // width of card + margin
                decelerationRate="fast"
            />
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={{ marginHorizontal: 8 }}>
                <Image
                    source={item.img ? { uri: item.img } : require('../../assets/images/icon.png')}
                    style={{
                        width: width * 0.6,
                        height: height * 0.38,
                        borderRadius: 24
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};
