module.exports = {
    devServer: {
      proxy: {
        "": {
          target: "http://localhost:5000",
          secure: false
        }
      }
    }
  }