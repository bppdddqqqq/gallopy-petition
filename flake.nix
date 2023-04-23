{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs";

  outputs = { self, nixpkgs, ...}@attrs:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
    devShells."${system}".default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs-18_x
        nodePackages.npm
        python38
        autoreconfHook
        libpng
        yarn
        deno
        sqlite
      ];
    };
  };
}
