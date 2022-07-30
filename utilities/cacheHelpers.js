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

export async function getCache(
  key,
  callback1 = null,
  callback2 = null,
  params = null,
  fallback = null
) {
  const result = await AsyncStorage.getItem(key).then((res) => {
    if (res) {
      return callback1(JSON.parse(res));
    }

    if (fallback) {
      return setCache(key, fallback, callback1);
    }

    if (callback2) {
      return callback2(params);
    }

    return null;
  });

  return result;
}
