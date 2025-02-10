> **Nota:** Este proyecto es parte de una prueba técnica para el puesto de Frontend en Kii.

# PrivateStorage App

PrivateStorage es una aplicación descentralizada (DApp) diseñada para ofrecer almacenamiento seguro y control total sobre la privacidad de los datos utilizando tecnología blockchain.

## 🚀 Funcionalidades Principales

1. **Privacidad garantizada:** Los datos del usuario están completamente protegidos y accesibles únicamente a través de la autenticación con wallet.
2. **Control total:** Los usuarios pueden gestionar su propia información privada y decidir quién tiene acceso.
3. **Seguridad descentralizada:** La aplicación utiliza contratos inteligentes desplegados en la blockchain para garantizar la integridad y la seguridad de los datos.

---

## 🛠️ Stack Tecnológico (Actualizado)

### **Frontend**
- **Framework:** [Next.js (15.1.6)](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **UI:**
  - [shadcn/ui (0.0.4)](https://shadcn.dev)
  - [Radix UI (Dialog, Navigation Menu, Tooltip, etc.)](https://www.radix-ui.com/)
  - [Tailwind CSS (3.4.17)](https://tailwindcss.com/) + [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
  - Animaciones con [Framer Motion](https://www.framer.com/motion/)
- **Conexión Web3:**
  - [wagmi (2.14.11)](https://wagmi.sh/) + [ethers (5.7.2)](https://docs.ethers.org/)
  - [AppKit (1.6.7)](https://reown.com/appkit) + [AppKit Adapter Wagmi](https://reown.com)
  - [viem (2.22.23)](https://viem.sh/)
  - [web3modal (1.9.12)](https://web3modal.com/)
- **Swiper:** [Swiper (11.2.2)](https://swiperjs.com/) para sliders interactivos.

### **Blockchain**
- **Contratos Inteligentes:**
  - Lenguaje: Solidity
  - Red: **Kiichain Testnet Oro** (Chain ID: `1336`)
  - Proveedor RPC: `https://json-rpc.dos.sentry.testnet.v3.kiivalidator.com`
- **Conexión con Wallets:** Compatible con MetaMask y otros proveedores.

### **Herramientas de desarrollo**
- **Gestión del estado asíncrono:** [TanStack React Query (5.66.0)](https://tanstack.com/query/v5)
- **Linter:** ESLint (9) + [eslint-config-next](https://nextjs.org/docs/basic-features/eslint)
- **Compilador:** TypeScript (5)
- **Estilos Autoprefixer:** [Autoprefixer (10.4.20)](https://github.com/postcss/autoprefixer)
- **CLI:** [ts-node](https://github.com/TypeStrong/ts-node) para ejecutar scripts TypeScript.


---

## 🌐 Despliegue y Configuración

### 1. **Requisitos previos**

- Node.js (v16 o superior)
- NPM o Yarn
- Wallet compatible con Ethereum (por ejemplo, MetaMask)

### 2. **Clonar el repositorio**

```bash
git clone https://github.com/ybedoyab/TestKii.git
cd TestKii
```

### 3. **Instalar dependencias**

```bash
npm install
```

### 4. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido: (Solicitarme esto si eres reclutador)

```env
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

### 5. **Iniciar la aplicación**

```bash
npm run dev
```

Esto iniciará la aplicación en modo desarrollo. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

---

🧩 **Créditos y Contacto**

Desarrollado por Yulian Bedoya.  
Si tienes alguna pregunta o sugerencia, no dudes en contactarme en ybedoyab@unal.edu.co