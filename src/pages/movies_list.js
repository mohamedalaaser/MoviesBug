import { Text,SafeAreaView, FlatList,ActivityIndicator, Button, View, StatusBar  } from 'react-native';
import React, { useState, useEffect } from 'react';
import getMovies from '../services/tmdb_api';
import MovieCard from '../components/movie_card';

export default function MoviesListPage() {


  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMoviesFirstPage = async () => {
    try {
      setIsLoading(true);  
      const fetchedData = await getMovies(1);
      setIsLoading(false);
      setPage(fetchedData.page);
      setTotalPages(fetchedData.total_pages);
      setData(fetchedData.results);
      setIsError(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const refreshList = async () => {
    try {
      setIsRefreshing(true);  
      const fetchedData = await getMovies(1);
      setIsRefreshing(false);
      setPage(fetchedData.page);
      setTotalPages(fetchedData.total_pages);
      setData(fetchedData.results);
      setIsError(false);
    } catch (err) {
      setIsRefreshing(false);
      setIsError(true);
    }
  };

  const getMorePages = async () => {
    try {
      setIsLoadingMore(true);  
      const fetchedData = await getMovies(page+1);
      setIsLoadingMore(false);
      setPage(fetchedData.page);
      setTotalPages(fetchedData.total_pages);
      setData([...data, ...fetchedData.results]);
      setIsError(false);
    } catch (err) {
      isLoadingMore(false);
      setIsError(true);
    }
  };


  
  useEffect(() => {
    getMoviesFirstPage();
  },[]);

  return (
       <SafeAreaView style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
         
      {
      isError?(
      <View>
      <Text>Something went wrong</Text>
      <Button
      onPress={async ()=> await getMoviesFirstPage()}
      title="Refresh"
      />
      </View>
      ):
      isLoading?<ActivityIndicator size="large"></ActivityIndicator>:
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (<MovieCard item={item}/>)}
      onEndReached={async () => page<totalPages && await getMorePages()}
      ListFooterComponent={() => isLoadingMore && <ActivityIndicator size="large"></ActivityIndicator>}
      onRefresh={async () => await refreshList()}
      refreshing={isRefreshing}
      />
      }
  </SafeAreaView>


  );
}


