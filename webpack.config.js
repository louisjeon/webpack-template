const path = require("path");
const HtmlPlugin = require("html-webpack-plugin"); // 생성자함수이므로 파스칼케이스
const CopyPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    resolve: {
      extensions: [".js"],
      alias: {
        // alias: 별칭
        "~": path.resolve(__dirname, "src"),
      },
    },
    entry: "./src/main.js", // 여러개로 하고 싶을 경우 객체로 {main: './main.js', sub: './sub.js'}와 같이 작성 가능하지만 보통 한개로 가능
    output: {
      // path: '',
      // filename: "",
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /.s?css$/,
          use: [
            // 아래쪽 로더부터 실행됨
            "style-loader", // 분석된 css를 html에 넣어줌
            "css-loader", // css문법 분석
            "postcss-loader", // 공급업체접두사 부착
            "sass-loader", // sass문법 분석
          ],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: "./src/index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
    ],
    devServer: {
      port: 8080, // 기본값
      open: true, // npm run dev시 자동으로 브라우저에 포트 창을 열어줌
      historyApiFallback: true, // window.history객체에는 해당 탭에서 지나온 사이트들의 history가 남는데, 이 옵션은 라우터의 hash모드 대신 history모드를 켜는 데에 필요함
    },
  };
};
