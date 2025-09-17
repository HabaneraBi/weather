import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import { Stack } from "expo-router";

const ctx = createCtx();

export default function RootLayout() {
  return (
    <reatomContext.Provider value={ctx}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="forecast-days" options={{ title: "Forecast" }} />
      </Stack>
    </reatomContext.Provider>
  );
}
