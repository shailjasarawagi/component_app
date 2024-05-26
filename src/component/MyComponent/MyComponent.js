import React, { useState, useEffect, useRef } from "react";
import {
 Text,
 View,
 TouchableOpacity,
 FlatList,
 TextInput, StyleSheet
} from "react-native";

const MyComponent = ({ data }) => {
 const [selectedItems, setSelectedItems] = useState([]);
 const [dataSource, setDataSource] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const inputRef = useRef(null);

 useEffect(() => {
  if (Array.isArray(data)) {
   setDataSource(data);
  } else {
   console.error("Data prop is not an array:", data);
   setDataSource([]);
  }
 }, [data]);

 const debouncedSearchTerm = useDebounce(searchTerm, 1000);

 useEffect(() => {
  if (Array.isArray(data)) {
   if (debouncedSearchTerm === "") {
    setDataSource(data);
   } else {
    setDataSource(data?.filter((item) => item.name.includes(debouncedSearchTerm)));
   }
  }
 }, [debouncedSearchTerm, data]);

 const handleSelect = (item) => {
  setSelectedItems((currentSelectedItems) => {
   if (!currentSelectedItems.includes(item)) {
    return [...currentSelectedItems, item];
   }
   return currentSelectedItems;
  });
 };

 const handleClear = () => {
  inputRef.current.clear();
  setSearchTerm("");
 };

 return (
  <View style={styles.container}>
   <TextInput
    ref={inputRef}
    onChangeText={setSearchTerm}
    value={searchTerm}
    placeholder="Search the item"
    style={styles.textInput}
   />
   <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
    <Text >Clear</Text>
   </TouchableOpacity>
   <FlatList
    data={dataSource}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
     <TouchableOpacity
      onPress={() => handleSelect(item)}
      style={[
       styles.item,
       selectedItems.includes(item) && styles.selectedItem,
      ]}
     >
      <Text >{item.name}</Text>
      <Text>
       {selectedItems.includes(item) ? "Selected" : "Not selected"}
      </Text>
     </TouchableOpacity>
    )}
   />
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  padding: 16,
 },
 textInput: {
  borderColor: 'black',
  borderWidth: 1,
  marginBottom: 20,
 },
 clearButton: {
  backgroundColor: '#dcdcdc',
  padding: 10,
  alignItems: 'center',
 },

 item: {
  padding: 16,
  borderBottomWidth: 1,
 },
 selectedItem: {
  backgroundColor: '#d0f0c0',
 },

});

const useDebounce = (value, delay) => {
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
  const handler = setTimeout(() => {
   setDebouncedValue(value);
  }, delay);

  return () => {
   clearTimeout(handler);
  };
 }, [value, delay]);

 return debouncedValue;
};

export default MyComponent