# 📜 Contrato Inteligente PrivateInfoStorage

Este repositorio contiene el contrato inteligente `PrivateInfoStorage` desplegado en la **Kiichain Testnet Oro**. El contrato está diseñado para almacenar información privada de manera segura, gestionar el acceso mediante una whitelist y permitir al propietario del contrato actualizar la información privada.

---

## 🚀 Detalles del Despliegue

- **Dirección del Contrato:** `0x9f41f53a27b34624ef4df0c53b6122ebd060552c`
- **URL del contrato:** `https://app.kiichain.io/account/0x9f41f53a27b34624ef4df0c53b6122ebd060552c`
- **Hash de la Transacción:** `0xae6b9548ee73a8327a0d3090a7457a40cd23befdcffa5f23cf97e1823ae02438`
- **Red:** **Kiichain Testnet Oro**
- **Número de Bloque:** `12030276`
- **Dirección del Deployer:** `0xa645379aaa31aeb362ac3818d3aca278925c6721`

---

## 📖 Descripción General

El contrato inteligente `PrivateInfoStorage` incluye las siguientes características:
- **Almacenamiento Privado de Datos:** Una cadena de texto privada (`kiiPrivateInfo`) para guardar información sensible.
- **Control de Acceso:** Solo el propietario o las direcciones en la whitelist pueden interactuar con ciertas funciones.
- **Gestión de Whitelist:** El propietario puede agregar direcciones a una whitelist para otorgar acceso.
- **Actualizaciones Seguras:** Solo el propietario puede actualizar la información privada.
- **Registros de Eventos:** Emite eventos para registrar actualizaciones de la información privada y cambios en la whitelist.

---

## 🛠️ Funcionalidad

### **Funciones Públicas**

1. **`isWhitelisted(address _address) → bool`**
   - **Descripción:** Verifica si una dirección está en la whitelist.
   - **Acceso:** Público.
   - **Devuelve:** `true` si la dirección está en la whitelist, de lo contrario `false`.

2. **`getPrivateInfo() → string`**
   - **Descripción:** Obtiene la información privada almacenada.
   - **Acceso:** Solo direcciones en la whitelist.

3. **`getWhitelist() → address[]`**
   - **Descripción:** Obtiene todas las direcciones de la whitelist.
   - **Acceso:** Público.

---

### **Funciones Exclusivas del Propietario**

1. **`addToWhitelist(address _address)`**
   - **Descripción:** Agrega una dirección a la whitelist.
   - **Acceso:** Solo el propietario.

2. **`updatePrivateInfo(string _newInfo)`**
   - **Descripción:** Actualiza la información privada almacenada en el contrato.
   - **Acceso:** Solo el propietario.

---

### **Eventos**

- **`InfoUpdated(string newInfo)`**
  - Activado cuando se actualiza la información privada.

- **`AddressAdded(address newAddress)`**
  - Activado cuando se agrega una nueva dirección a la whitelist.

---

## 📚 Ejemplo de Flujo de Trabajo

1. **Despliegue del Contrato:**
   - El contrato es desplegado por el propietario utilizando Remix IDE.
   - Durante el despliegue se agregan direcciones iniciales a la whitelist.

2. **Agregar una Dirección a la Whitelist:**
   - El propietario llama a `addToWhitelist(address)` con la dirección deseada.

3. **Actualizar Información Privada:**
   - El propietario llama a `updatePrivateInfo(string)` con la nueva información sensible.

4. **Acceso a Información Privada:**
   - Las direcciones en la whitelist llaman a `getPrivateInfo()` para obtener los datos privados.

5. **Obtener la Whitelist:**
   - Cualquier usuario puede llamar a `getWhitelist()` para ver todas las direcciones en la whitelist.

---

## ⚙️ Instrucciones de Despliegue

### Requisitos Previos
- **Remix IDE:** [https://remix.ethereum.org/](https://remix.ethereum.org/)
- **MetaMask Wallet:** Instalado y conectado a **Kiichain Testnet Oro**.
- **Versión del Compilador:** `0.8.0` o superior.

### Pasos
1. Abre [Remix IDE](https://remix.ethereum.org/).
2. Pega el código del contrato en un archivo nuevo `.sol`.
3. Selecciona el compilador `Solidity` y compila el contrato.
4. Despliega el contrato:
   - Asegúrate de que MetaMask esté conectado a **Kiichain Testnet Oro**.
   - Despliega el contrato utilizando el constructor por defecto.
5. Verifica la dirección del contrato desplegado.

---

## 🛡️ Características de Seguridad

- **Control de Acceso del Propietario:** Las funciones críticas están restringidas al propietario del contrato.
- **Verificación de Whitelist:** Solo las direcciones verificadas tienen acceso a la información sensible.
- **Validación de Entradas:** Las funciones validan las entradas para evitar mal uso (por ejemplo, dirección nula).

---

## 🧪 Pruebas

### Escenarios de Prueba
- **Validación del Despliegue:**
  - Verificar el propietario del contrato y la whitelist inicial.
- **Gestión de Whitelist:**
  - Agregar direcciones válidas e inválidas a la whitelist.
- **Acceso a Datos:**
  - Intentar acceder a la información privada como dirección verificada y no verificada.

---