import { getMessages } from "../services/messageService";
import { getDeviceId } from "../utils/deviceId";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ArchiveScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState("mine");
  const [deviceId, setDeviceId] = React.useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(65)).current;

  useEffect(() => {
    getDeviceId().then(setDeviceId);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: filter === "mine" ? 0 : 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(widthAnim, {
        toValue: filter === "mine" ? 60 : 100, // "mine" width vs "others" width
        duration: 150,
        useNativeDriver: false, // width animation can't use native driver
      }),
    ]).start();
  }, [filter]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["messages", filter, deviceId],
    queryFn: async () => await getMessages(),
    enabled: !!deviceId,
  });

  // Filter messages client-side
  const filteredMessages = React.useMemo(() => {
    if (!data || !deviceId) return [];
    return filter === "mine"
      ? data.filter((m: { sender_id: string }) => m.sender_id === deviceId)
      : data.filter((m: { sender_id: string }) => m.sender_id !== deviceId);
  }, [data, deviceId, filter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // convert 0 → 12

    return `${month} ${day} ${hours}:${minutes}${ampm}`;
  };

  const renderItem = ({ item, index }: { item: { recipient_name: string; content: string; created_at: string }; index: number }) => (
    <View
      style={{
        width: "48%",
        height: 175,
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 16,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* To field */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "PixelifySans_400Regular",
            color: "#000",
            marginRight: 6,
          }}
        >
          to:
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "PixelifySans_400Regular",
            color: "#000",
            flex: 1,
          }}
          numberOfLines={1}
        >
          {item.recipient_name}
        </Text>
      </View>

      {/* Horizontal line */}
      <View
        style={{
          height: 1,
          backgroundColor: "#000",
          marginTop: 8,
        }}
      />

      {/* Message preview */}
      <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 8 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "PixelifySans_400Regular",
            color: "#000",
            lineHeight: 18,
          }}
          numberOfLines={5}
        >
          {item.content}
        </Text>
      </View>

      {/* Date */}
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "PixelifySans_400Regular",
            color: "#000",
            textAlign: "right",
            marginRight: 5,
          }}
        >
          {formatDate(item.created_at)}
        </Text>
      </View>
    </View>
  );

  return (
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
          <TouchableOpacity onPress={() => router.push("/")}>
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
              archive
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

      {/* Tabs */}
      <View
        style={{
          marginLeft: 50,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 24,
          }}
        >
          <TouchableOpacity onPress={() => setFilter("mine")}>
            <Text
              style={{
                fontSize: 28,
                fontFamily:
                  filter === "mine"
                    ? "PixelifySans_700Bold"
                    : "PixelifySans_400Regular",
                color: "#000",
              }}
            >
              mine
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("others")}>
            <Text
              style={{
                fontSize: 28,
                fontFamily:
                  filter === "others"
                    ? "PixelifySans_700Bold"
                    : "PixelifySans_400Regular",
                color: "#000",
              }}
            >
              others
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sliding underline */}
        <Animated.View
          style={{
            height: 2,
            width: widthAnim,
            backgroundColor: "#000",
            marginTop: 2,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 84], // distance between "mine" and "others" centers
                }),
              },
            ],
          }}
        />
      </View>

      {/* Messages grid */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : data.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "PixelifySans_400Regular",
              color: "#999",
            }}
          >
            no messages yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.created_at.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 50,
          }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
