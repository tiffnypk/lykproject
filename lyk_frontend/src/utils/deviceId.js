import * as SecureStore from "expo-secure-store";

export async function getDeviceId() {
  let deviceId = await SecureStore.getItemAsync("device_id");
  if (!deviceId) {
    deviceId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    await SecureStore.setItemAsync("device_id", deviceId);
  }
  return deviceId;
}
