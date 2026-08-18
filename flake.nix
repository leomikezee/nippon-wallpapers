{
  description = "Puppeteer development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            chromium
          ];

          # Tell Puppeteer to skip downloading Chrome and use the Nix one
          shellHook = ''
            export PUPPETEER_SKIP_DOWNLOAD=true
            export PUPPETEER_EXECUTABLE_PATH=${pkgs.chromium}/bin/chromium
          '';
        };
      }
    );
}
