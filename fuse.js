const { FuseBox, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  plugins: [WebIndexPlugin()],
});
fuse.dev(); // launch http server
fuse
  .bundle("app")
  .instructions(" > examples/example-1.tsx")
  .hmr()
  .watch();
fuse.run();