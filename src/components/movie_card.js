import { memo } from "react"
import { Text, View,Image } from 'react-native';

const MovieCard = memo(
({item}) =>(
<View style={{ 
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 15,}}>
      <Image
        style={{width:100, height:100}}
        source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
      />
      <Text style={{fontSize: 32}}>{item.title}</Text>
      <Text >{item.release_date}</Text>
      <Text >{item.overview}</Text>
    </View>
)
);


export default MovieCard;