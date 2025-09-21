import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import { Stack } from "expo-router";

const ctx = createCtx();

const RootLayout = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: "#50acff",
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerBackTitleVisible: false,
            statusBarStyle: "light",
          }}
        />
        <Stack.Screen
          name="forecast-days"
          options={{
            headerTitle: "",
            statusBarStyle: "dark",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="error"
          options={{
            statusBarStyle: "dark",
            headerShown: false,
          }}
        />
      </Stack>
    </reatomContext.Provider>
  );
};

export default RootLayout;
