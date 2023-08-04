import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const COLORS = {
    // base colors
    main: "#598f55",
    bg: "#FFF7D9",
    btn: "#824E2B",
    btn2: "#87b460",
    headerModal: "#26a69a",
    primary: "#194868", 
    secondary: "#FF615F",  
    txtContent: "#367d37",
    mainBlue: "#00529c",
    visible: '#DDDDDD',
    headerCategory : "#f3e3d2",
    greenVis: "#B5F5C0",
    input: "#e8f2d7",
    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#F5F7F9",
    lightGray2: '#FAFBFD',
    gray: "#BEC1D2",
    blue: '#42B0FF',
    darkgray: '#898C95',
    yellow: '#FFD573',
    lightBlue: '#95A9B8',
    darkgreen: '#008159',
    peach: '#FF615F',
    purple: '#8e44ad',
    red: '#FF0000',
    inactive:'#999999',
    listItem: "#f7f7f7",
    bgInput: "#eef5e5"
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    padding2: 36,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h5: 18,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-regular", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;