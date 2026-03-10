import { createMessage } from "@/services/messageService";
import KeyboardAvoidingAnimatedView from "../components/KeyboardAvoidingAnimatedView";
import { getDeviceId } from "../utils/deviceId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InsertMessage } from "@/types/messageTypes";

export default function WriteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    getDeviceId().then(setDeviceId);
  }, []);

  const { mutate: saveMessage, isPending } = useMutation({
  mutationFn: () => {
    if (deviceId == null) throw new Error("No device ID");

    let newMessage: InsertMessage = {
        sender_id: deviceId,
        recipient_name: to || "Anonymous",
        content: message,
    }
    console.log("Creating message:", newMessage);
    return createMessage(newMessage);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    router.push("/archive");
  },
  onError: (error) => {
    console.error("Error creating message:", error);
  }
});

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            paddingTop: insets.top,
          }}
        >
          <StatusBar style="dark" />

          {/* Header with back arrow and title */}
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={{
                    uri: "https://ucarecdn.com/69dd56d9-cdb0-447e-8447-b486d7d550ba/-/format/auto/",
                  }}
                  style={{ width: 37, height: 37 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  pointerEvents: "none",
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    fontFamily: "PixelifySans_400Regular",
                    color: "#000",
                  }}
                >
                  write
                </Text>
              </View>
              <View style={{ width: 32 }} />
            </View>
          </View>

          {/* Horizontal line */}
          <View
            style={{
              height: 1,
              backgroundColor: "#000",
              marginTop: 12,
            }}
          />

          {/* Main input area with border */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 300,
                width: 300,
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 8,
                paddingVertical: 14,
                marginTop: 150,
              }}
            >
              {/* To field */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: "PixelifySans_400Regular",
                    color: "#000",
                    paddingLeft: 14,
                    paddingRight: 8,
                  }}
                >
                  to:
                </Text>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 30,
                    fontFamily: "PixelifySans_400Regular",
                    color: "#000",
                  }}
                  value={to}
                  onChangeText={setTo}
                  placeholderTextColor="#999"
                />
              </View>

              {/* Horizontal line */}
              <View
                style={{
                  height: 1,
                  backgroundColor: "#000",
                  marginTop: 12,
                }}
              />

              {/* Message field */}
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 27,
                  fontFamily: "PixelifySans_400Regular",
                  color: "#000",
                  lineHeight: 30,
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}
                placeholder="write your message here..."
                multiline
                value={message}
                onChangeText={setMessage}
                placeholderTextColor="#999"
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Send button */}
          <View
            style={{
              marginTop: 50,
              paddingBottom: insets.bottom + 50,
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => saveMessage()}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={!message || isPending}
              style={{
                width: 135,
                height: 57,
              }}
            >
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                }}
              >
                <Image
                  source={{
                    uri: "https://ucarecdn.com/c2c91501-18f1-4cdc-b085-54b211ce6908/-/format/auto/",
                  }}
                  style={{ position: "absolute", width: 135, height: 57 }}
                  contentFit="contain"
                />
              </Animated.View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "PixelifySans_400Regular",
                    fontSize: 24,
                    letterSpacing: 1,
                  }}
                >
                  send
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingAnimatedView>
  );
}
