import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles"; // type-only import

export const getTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9", // ممكن تغييره للأزرق الغامق والفاتح
      },
      secondary: {
        main: mode === "light" ? "#ff5722" : "#ff8a65", // بدل الوردي، نستخدم برتقالي حيوي
      },
      background: {
        default: mode === "light" ? "#e3f2fd" : "#121212", // خلفية light أفتح
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",   // خلفية الورقة
      },
    },
  });
