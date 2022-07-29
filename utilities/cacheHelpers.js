import AsyncStorage from "@react-native-async-storage/async-storage";

// export const getCache = async (key, dataType = "object") => {
//   let cachedData;
//   try {
//     console.log(`Getting cache with key ${key}`);
//     cachedData = await AsyncStorage.getItem(key).then((res) => {
//       if (dataType === "object") {
//         return res ? JSON.parse(res) : null;
//       }
//       return res;
//     });
//   } catch (e) {
//     console.log(`Failed to get cache with key ${key}`);
//     return false;
//   }
//   return cachedData;
// };

export async function getCache(key, dataType = "object") {
  try {
    const response = await AsyncStorage.getItem("@favoriteStores");
    if (!response) {
      return dataType === "object" ? {} : "";
    }
    return dataType === "object"
      ? await { data: JSON.parse(response) }
      : response;

    // console.log(`Getting cache with key ${key}`);
    // cachedData = await AsyncStorage.getItem(key).then((res) => {
    //   if (dataType === "object") {
    //     return res ? JSON.parse(res) : null;
    //   }
    //   return res;
    // });
  } catch (e) {
    console.log(`Failed to get cache with key ${key}`);
    return false;
  }

  // const response = await AsyncStorage.getItem("@favoriteStores");
  // const listOfTasks = (await JSON.parse(response)) || [];
  // console.log(listOfTasks);
}

export const setCache = async (key, data, dataType = "object") => {
  let value = dataType === "object" ? JSON.stringify(data) : data;
  value = data === null ? null : value;

  try {
    console.log(`Setting cache with key ${key}`);
    return await AsyncStorage.setItem(key, value).then(() => value || null);
  } catch (e) {
    console.log(`Failed to set cache with key ${key}`);
    return false;
  }
};

export const removeCache = async (key) => {
  try {
    console.log(`Removing cache with key ${key}`);
    return await AsyncStorage.removeItem(key).then(() => true);
  } catch (e) {
    console.log(`Failed to remove cache with key ${key}`);
    return false;
  }
};
