// The app uses a single type family (WorkSans) for both headings and body text —
// the Exo2 weights previously used for headings were never registered as separate
// static files on either platform (only one variable-weight Exo2 file was linked),
// so they silently fell back to the system font. WorkSans is fully linked in all
// six weights below and renders correctly everywhere.
const AppFonts = {
    body_light: "WorkSans-Light",
    body_regular: "WorkSans-Regular",
    body_medium: "WorkSans-Medium",
    body_semiBold: "WorkSans-SemiBold",
    body_bold: "WorkSans-Bold",
    body_extraBold: "WorkSans-ExtraBold",
};

export default AppFonts;
