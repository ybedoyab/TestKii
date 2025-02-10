// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivateInfoStorage {
    string private kiiPrivateInfo; // Información privada almacenada
    address public owner; // Propietario del contrato
    address[] public whitelist; // Lista de direcciones permitidas

    // Evento para registrar actualizaciones
    event InfoUpdated(string newInfo);
    event AddressAdded(address newAddress);

    constructor() {
        owner = msg.sender;

        // Direcciones iniciales de la whitelist con checksum correcto
        whitelist = [
            0x5Ec605060d810669fd7134494C4AF17ab438CC92, // Dirección obligatoria
            0x3D3A40cBa3Ef5cc620bC580de1eD1246cda7Dba4,
            0x7FAc1ad8d4f84759e64E3F40C9bdE17530C85609,
            0x8Ac44dC60c487FB6CdE46a3C807EAb349FA98537,
            0xa9C18Dc07f70D76C9e5fa431A1f5d23Eaf1ef6B4,
            0xf3a8473d6DC4Ed0a3f09772ff7b9bF4231eF337e,
            0x9cBD9c658789Feafb4CC7d9261485eb3E36eabC5,
            0x2eac9D76c9F92ae60C06c32fee3e6F1AbD7c5F33,
            0x8fbCd403bF4be1eCC39c4C3a5d61b7ee5B31f435,
            0x6aC1b7fAc78477dcadb7F86Aa7d4c45ee2e6472B,
            0x4aF7b73Dc5C67e5aFcD37Bc3c1Bc47F3Cd96b758
        ];
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            unicode"Solo el propietario puede ejecutar esta función."
        );
        _;
    }

    modifier onlyWhitelisted() {
        require(isWhitelisted(msg.sender), unicode"No estás en la whitelist.");
        _;
    }

    // Verifica si una dirección está en la whitelist
    function isWhitelisted(address _address) public view returns (bool) {
        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _address) {
                return true;
            }
        }
        return false;
    }

    // Agregar una dirección a la whitelist
    function addToWhitelist(address _address) public onlyOwner {
        require(
            _address != address(0),
            unicode"La dirección no puede ser la dirección nula."
        );
        require(
            !isWhitelisted(_address),
            unicode"La dirección ya está en la whitelist."
        );
        whitelist.push(_address);
        emit AddressAdded(_address);
    }

    // Actualizar la información privada
    function updatePrivateInfo(string memory _newInfo) public onlyOwner {
        kiiPrivateInfo = _newInfo;
        emit InfoUpdated(_newInfo);
    }

    // Obtener la información privada (solo para whitelist)
    function getPrivateInfo()
        public
        view
        onlyWhitelisted
        returns (string memory)
    {
        return kiiPrivateInfo;
    }

    // Obtener todas las direcciones de la whitelist
    function getWhitelist() public view returns (address[] memory) {
        return whitelist;
    }
}
