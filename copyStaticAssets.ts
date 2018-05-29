import * as shell from "shelljs";

shell.mkdir("-p", "dist/assets/js");
shell.mkdir("-p", "dist/assets/images");
// shell.mkdir("-p", "dist/assets/fonts");

// shell.cp("-R", "src/assets/fonts", "dist/assets/fonts/");
shell.cp("-R", "src/assets/images", "dist/assets/images/");
shell.cp("node_modules/bootstrap/dist/js/bootstrap.js", "dist/assets/js/");
shell.cp("node_modules/jquery/dist/jquery.slim.js", "dist/assets/js/");
shell.cp("node_modules/popper.js/dist/umd/popper.js", "dist/assets/js/");