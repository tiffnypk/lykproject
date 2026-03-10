import { Image } from "expo-image";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useRouter } from "expo-router";

import { StatusBar } from "@/node_modules/expo-status-bar/build/StatusBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="dark" />

      <View style={{ gap: 100 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => router.push("/write")}
        >
          <Image
            source="https://ucarecdn.com/55304a3d-130b-4c5c-8d5e-6c0f1ebb4bcb/-/format/auto/"
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "PixelifySans_400Regular",
              color: "#000000",
              marginTop: 5,
            }}
          >
            write
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => router.push("/archive")}
        >
          <Image
            source="https://ucarecdn.com/f0be95e4-ae87-4cc6-8d35-448db1bde887/-/format/auto/"
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontSize: 30,
              fontFamily: "PixelifySans_400Regular",
              color: "#000000",
              marginTop: 5,
            }}
          >
            archive
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
