const chromeMock = {
  webview: {
    hostObjects: {
      scriptObject: {
        ApplicationLoaded: jest.fn(),
      },
    },
  },
};
  
module.exports = chromeMock;