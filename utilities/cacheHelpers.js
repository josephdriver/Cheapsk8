import AsyncStorage from "@react-native-async-storage/async-storage";

// Log cache for debugging
export async function logCache(key) {
  const result = await AsyncStorage.getItem(key).then((res) => res);
  console.log(result);
  return result;
}

// Clear cache for debugging
export async function clearCache(key, callback, params) {
  const result = await AsyncStorage.removeItem(key).then(() => {
    callback(params);
  });
  console.log(`${key} stores reset`);
  return result;
}

export async function setCache(key, value, callback = null, type = "object") {
  const parsedValue = type === "object" ? JSON.stringify(value) : value;
  const result = await AsyncStorage.setItem(key, parsedValue).then(() => {
    if (callback !== null) {
      callback(value);
    }
  });
  return result;
}

export async function getCache(key, callback = null, fallback = null) {
  const result = await AsyncStorage.getItem(key).then((res) => {
    if (res) {
      if (callback !== null) {
        return callback(JSON.parse(res));
      }
    }
    if (fallback) {
      return setCache(key, fallback, callback);
    }
    return null;
  });

  return result;
}

export const removeCache = async (key) => {
  try {
    console.log(`Removing cache with key ${key}`);
    return await AsyncStorage.removeItem(key).then(() => true);
  } catch (e) {
    console.log(`Failed to remove cache with key ${key}`);
    return false;
  }
};
