import { useFonts } from "expo-font";

export function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    Orbitron: require("./../assets/fonts/Orbitron-VariableFont_wght.ttf"),
  });

  return fontsLoaded;
}
