const settings = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#E62B1E',
    secondary: '#0a0a0a',
    accent: '#fff',
    muted: 'rgba(0, 0, 0, 0.7)',
    cardBg: '#fff',
    borderColor:"#E62B1E",
    buttonAccent: "#fff",
    labelText: "#777",
    inputBorder: "#aaa",
    inputBackground: "#fff",
    socialIcons:"#E62B1E",
    socialIconsHover:"#E62B1E",
    modes: {
      dark: {
        text: '#f5f5f5',
        background: '#000',
        primary: '#E62B1E',
        accent: '#E62B1E',
        muted: 'rgba(255, 255, 255, 0.7)',
        buttonAccent: '#fff',
        cardBg: '#252525',
        borderColor:"#888",
        labelText: "#777",
        inputBorder: "#777",
        inputBackground: "#333",
        socialIcons:"rgba(255,255,255,0.7)",
        socialIconsHover:"#fff",
      },
    }
  },
  links: {
    postLink: {
      color: 'muted',
      '&:hover': {
        color: 'text'
      }
    },
    button: {
      bg: 'primary',
      color: 'buttonAccent'
    }
  }
}

export default settings