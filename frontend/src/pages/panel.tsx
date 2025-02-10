// /pages/panel.tsx
import React from "react";
import Panel from "../components/panel"; // Asegúrate de que la ruta es correcta

const PanelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Panel />
    </div>
  );
};

export default PanelPage;
