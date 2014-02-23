function Sides($root, player) {
    switch (player) {
        case "computer":
            return new ComputerSide($root);
            break;

        case "player":
        default:
            return new PlayerSide($root);
    }
}