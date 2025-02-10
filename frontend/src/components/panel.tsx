"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../config/ContextProvider"; // Importar el contexto global de la wallet
import abi from "../../abi.json"; // Importar el ABI del contrato
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Cargar la dirección del contrato desde las variables de entorno
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = abi;

const Panel: React.FC = () => {
  const { account, disconnectWallet } = useWallet(); // Acceso al contexto global de la wallet
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [privateInfo, setPrivateInfo] = useState<string | null>(null);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newInfo, setNewInfo] = useState<string>("");

  useEffect(() => {
    if (account) {
      initializeContract();
    }
  }, [account]);

  // Inicializar contrato
  const initializeContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const deployedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      setContract(deployedContract);

      // Verificar si el usuario es el propietario
      const owner = await deployedContract.owner();
      setIsOwner(owner.toLowerCase() === account?.toLowerCase());

      // Verificar si el usuario está en la whitelist
      const whitelisted = await deployedContract.isWhitelisted(account);
      setIsWhitelisted(whitelisted);
    } catch (error) {
      console.error("Error al inicializar el contrato:", error);
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
      setNewInfo(""); // Limpiar campo de formulario
    } catch (error) {
      console.error("Error al actualizar la información privada:", error);
      alert("No se pudo actualizar la información privada.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10">
      {/* Dialog para conectar wallet */}
      {!account && (
        <Dialog open={!account}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conecta tu Wallet</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-4">
              Para acceder al panel, por favor conecta tu wallet.
            </p>

            {/* @ts-expect-error msg */}
            <appkit-button className="mt-7 mx-7" />
          </DialogContent>
        </Dialog>
      )}

      {account && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información de la wallet */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Wallet conectada:{" "}
                <span className="font-semibold text-blue-500">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </p>
              <Button
                onClick={() => disconnectWallet()}
                className="mt-4"
                variant="secondary"
              >
                Desconectar Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Información privada */}
          {isWhitelisted && (
            <Card>
              <CardHeader>
                <CardTitle>Información Privada</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{privateInfo || "No hay información disponible."}</p>
                <Button
                  onClick={fetchPrivateInfo}
                  className="mt-4"
                  variant="secondary"
                >
                  Ver Información Privada
                </Button>
              </CardContent>
            </Card>
          )}

          {!isWhitelisted && (
            <Card>
              <CardHeader>
                <CardTitle>No estás en la Whitelist</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  No tienes acceso a la información privada porque no estás en
                  la whitelist.
                </p>
              </CardContent>
            </Card>
          )}

          {isOwner && (
            <Card>
              <CardHeader>
                <CardTitle>Actualizar Información Privada</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="new-info">Nueva información</Label>
                <Input
                  id="new-info"
                  value={newInfo}
                  onChange={(e) => setNewInfo(e.target.value)}
                  placeholder="Escribe nueva información"
                  className="mb-4"
                />
                <Button onClick={updatePrivateInfo} variant="secondary">
                  Actualizar Información
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Mostrar whitelist (solo propietario) */}
          {isOwner && (
            <Card>
              <CardHeader>
                <CardTitle>Whitelist</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={fetchWhitelist}
                  className="mb-4"
                  variant="secondary"
                >
                  Ver Whitelist
                </Button>
                {whitelist.length > 0 && (
                  <ul className="list-disc list-inside">
                    {whitelist.map((address, index) => (
                      <li key={index} className="text-gray-700">
                        {address}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Panel;
