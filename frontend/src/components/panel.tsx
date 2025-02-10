"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../abi.json"; // Importar el ABI del contrato

// Cargar la dirección y el ABI desde las variables de entorno
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = abi;

const Panel: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [privateInfo, setPrivateInfo] = useState<string | null>(null);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newInfo, setNewInfo] = useState<string>("");

  // Conectar a la wallet del usuario
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
      return;
    }

    try {
      const browserProvider = new ethers.providers.Web3Provider(window.ethereum); // ethers v6
      const signer = await browserProvider.getSigner();
      const accounts = await browserProvider.listAccounts();

      setProvider(browserProvider);
      setAccount(accounts[0] || null);

      const deployedContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(deployedContract);

      // Verifica si el usuario es el propietario
      const owner = await deployedContract.owner();
      setIsOwner(owner.toLowerCase() === accounts[0]?.toLowerCase());

      // Verifica si el usuario está en la w"hitelist
      const whitelisted = await deployedContract.isWhitelisted(accounts[0]);
      setIsWhitelisted(whitelisted);

      alert(`Conectado a la wallet: ${accounts[0]}`);
    } catch (error) {
      console.error("Error al conectar a la wallet:", error);
      alert("No se pudo conectar a la wallet.");
    }
  };

  // Obtener información privada del contrato
  const fetchPrivateInfo = async () => {
    if (!contract) return;

    try {
      const info = await contract.getPrivateInfo();
      setPrivateInfo(info);
    } catch (error) {
      console.error("Error al obtener la información privada:", error);
      alert("No tienes acceso a la información privada o ocurrió un error.");
    }
  };

  // Obtener la lista de direcciones de la whitelist
  const fetchWhitelist = async () => {
    if (!contract || !isOwner) return;

    try {
      const list = await contract.getWhitelist();
      setWhitelist(list);
    } catch (error) {
      console.error("Error al obtener la whitelist:", error);
      alert("Ocurrió un error al obtener la whitelist.");
    }
  };

  // Actualizar la información privada
  const updatePrivateInfo = async () => {
    if (!contract || !isOwner) return;

    try {
      const tx = await contract.updatePrivateInfo(newInfo);
      await tx.wait();
      alert("Información privada actualizada correctamente.");
      setNewInfo(""); // Limpia el campo del formulario
    } catch (error) {
      console.error("Error al actualizar la información privada:", error);
      alert("No se pudo actualizar la información privada.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Panel de Usuario</h1>

      {/* Botón para conectar la wallet */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {account ? `Wallet Conectada: ${account.slice(0, 6)}...${account.slice(-4)}` : "Conectar Wallet"}
      </button>

      {/* Mostrar información privada si el usuario está en la whitelist */}
      {isWhitelisted && privateInfo && (
        <div className="mt-4 p-4 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold">Información Privada:</h2>
          <p className="text-gray-700">{privateInfo}</p>
        </div>
      )}

      {/* Botón para obtener información privada */}
      {isWhitelisted && (
        <button
          onClick={fetchPrivateInfo}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Ver Información Privada
        </button>
      )}

      {/* Mostrar formulario para actualizar información privada (solo propietario) */}
      {isOwner && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Actualizar Información Privada</h2>
          <input
            type="text"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
            className="px-4 py-2 border rounded-md w-full mb-2"
            placeholder="Nueva información privada"
          />
          <button
            onClick={updatePrivateInfo}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Actualizar Información
          </button>
        </div>
      )}

      {/* Mostrar la lista de direcciones de la whitelist (solo propietario) */}
      {isOwner && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Direcciones en la Whitelist</h2>
          <button
            onClick={fetchWhitelist}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          >
            Ver Whitelist
          </button>
          {whitelist.length > 0 && (
            <ul className="mt-4 list-disc list-inside">
              {whitelist.map((address, index) => (
                <li key={index} className="text-gray-700">
                  {address}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Panel;
