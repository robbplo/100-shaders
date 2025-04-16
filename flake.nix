{
  inputs = {
    systems.url = "github:nix-systems/default";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    {
      self,
      nixpkgs,
      systems,
      flake-parts,
      ...
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import systems;
      perSystem =
        { config, system, pkgs, lib, ... }:
        {
          devShells.default = pkgs.mkShell {
            packages = with pkgs; [
              glslviewer
            ];
          };
        };
    };
}
