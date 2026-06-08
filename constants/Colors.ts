export const Colors = {
  // ==========================================
  // BASE COLORS (Your Core Color Palette)
  // ==========================================
  brand: {
    // --- Deep & Dark Blues ---
    primaryDark: "#03045e",     // Extremely dark blue. Ideal for main backgrounds in Dark Mode or high-priority titles.
    darkBlue: "#023e8a",        // Rich dark blue. Perfect for Cards, Containers, or Active states in Dark Mode.
    royalBlue: "#0077b6",       // Vibrant royal blue. Best choice for Primary action buttons, links, and accents.
    deepNavy: "#003049",        // Deep navy tone. The absolute best color for standard readable body text in Light Mode.

    // --- Vibrant & Medium Blues ---
    cyanDark: "#0096c7",        // Deep cyan. Works well for secondary headings, icons, or highlighted sub-sections.
    cyanBright: "#00b4d8",      // Bright, glowing cyan. Excellent for active tabs or interactive elements in Dark Mode.
    blueLight: "#48cae4",       // Mild light blue. Great for search bars, unfocused input fields, or secondary tags.
    denim: "#669bbc",           // Balanced denim blue. Perfect for secondary buttons, borders, or informational badges.

    // --- Soft Backgrounds & Accents ---
    iceBlue: "#90e0ef",         // Very soft pastel blue tint. Suitable for subtle backgrounds and decorative elements.
    paleBlue: "#ade8f4",        // Very light blue hue. Ideal for text input borders, section dividers, and grid lines.
    backgroundLight: "#caf0f8", // Ultra-light blue. Designed to be the main canvas/screen background color for Light Mode.

    // --- Warm Accents (Alerts & Contrast) ---
    crimson: "#780000",         // Rich crimson red. Reserved for critical errors, system alerts, or unread notification counts.
    ruby: "#c1121f",            // Vibrant ruby red. The perfect color choice for 'Delete', 'Log Out', or destructive buttons.
    cream: "#fdf0d5",           // Soft aesthetic cream. High-contrast choice for cards in Light Mode, or text in Dark Mode.
  },
  
  // ==========================================
  // LIGHT THEME (Optimized Mapping for Light UI)
  // ==========================================
  light: {
    text: "#003049",            // Used for primary typography and labels (maps to deepNavy)
    background: "#caf0f8",      // Overall canvas background for your screens (maps to backgroundLight)
    card: "#ffffff",            // Pure white background for list items, feed cards, and floating surfaces
    primary: "#0077b6",         // The dominant color for main call-to-actions like login/submit buttons (maps to royalBlue)
    secondary: "#669bbc",       // Used for cancel buttons, auxiliary actions, or secondary tags (maps to denim)
    error: "#c1121f",           // Used for displaying inline validation errors or error icons (maps to ruby)
    border: "#ade8f4",          // Subtle color for text inputs, cards, and list item borders (maps to paleBlue)
    notification: "#780000",    // Vibrant dot indicators or badges for unread messages/notifications (maps to crimson)
  },

  // ==========================================
  // DARK THEME (Optimized Mapping for Dark/Night UI)
  // ==========================================
  dark: {
    text: "#fdf0d5",            // Soft cream text that is easy on the eyes against dark backgrounds (maps to cream)
    background: "#03045e",      // Base screen canvas background color (maps to primaryDark)
    card: "#023e8a",            // Elevates card items to separate them from the primary background (maps to darkBlue)
    primary: "#00b4d8",         // Highly visible glowing primary action button color (maps to cyanBright)
    secondary: "#48cae4",       // Easy-to-see color choice for secondary buttons in the dark (maps to blueLight)
    error: "#c1121f",           // Retains red visibility across dark surfaces for error feedback (maps to ruby)
    border: "#0077b6",          // Border outlines that clearly define bounding surfaces in dark environments (maps to royalBlue)
    notification: "#780000",    // Solid red accenting for alerts in dark mode layouts (maps to crimson)
  }
};
