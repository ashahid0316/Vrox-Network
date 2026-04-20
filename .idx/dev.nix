{ pkgs, ... }: {
  channel = "unstable"; # Using unstable channel for newer nodejs version
  packages = [
    pkgs.nodejs_22
    pkgs.nodePackages.npm
  ];
  idx = {
    extensions = [
      "vscodevim.vim"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}