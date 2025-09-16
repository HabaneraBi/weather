import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import { Stack } from "expo-router";

export default function RootLayout() {
  const ctx = createCtx();
  return (
    <reatomContext.Provider value={ctx}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </reatomContext.Provider>
  );
}
