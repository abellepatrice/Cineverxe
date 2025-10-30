import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


var {width,height} = Dimensions.get('window');
export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item)=>{
        navigation.navigate('Movie', item)
    }

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 20 }}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width*0.62}
        itemWidth={400}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {

    return(
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={require('../../assets/images/icon.png')}
                style={{
                    width: width*0.6,
                    height: height*0.4,
                    borderRadius: 24
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}
