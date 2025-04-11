// src/app/dashboard/page.tsx
"use client";

import Sidebar from "@/components/ui/Sidebar";
import Modal from "@/components/ui/modal";
import { useAuth } from "@/contexts/AuthContext";
import {
  archiveVehicle,
  createVehicle,
  deleteVehicle,
  getVehicles,
  getVehicleStats,
  unarchiveVehicle,
  updateVehicle,
  Vehicle,
} from "@/lib/services/vehicles.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    inactive: number;
  } | null>(null);
  const [newVehicle, setNewVehicle] = useState({ name: "", plate: "" });
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetchVehicles();
    fetchStats();
  }, []);

  async function fetchVehicles() {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  }

  async function fetchStats() {
    try {
      const data = await getVehicleStats();
      setStats({
        total: data.total,
        active: data.active,
        inactive: data.inactive,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewVehicle({ name: "", plate: "" });
  };

  const handleCreateVehicle = async () => {
    try {
      await createVehicle(newVehicle);
      closeModal();
      fetchVehicles();
      fetchStats();
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
    }
  };

  const handleEditVehicle = async () => {
    if (!editingVehicle) return;

    try {
      await updateVehicle(editingVehicle.id, {
        name: editingVehicle.name,
        plate: editingVehicle.plate,
      });
      setEditingVehicle(null);
      fetchVehicles();
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
    }
  };

  const handleToggleStatus = async (vehicle: Vehicle) => {
    try {
      if (vehicle.status) {
        await archiveVehicle(vehicle.id);
      } else {
        await unarchiveVehicle(vehicle.id);
      }
      fetchVehicles();
      fetchStats();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este veículo permanentemente?"
      )
    ) {
      return;
    }

    try {
      await deleteVehicle(vehicleId);
      fetchVehicles();
      fetchStats();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.welcomeMessage}>
            Olá {user ? user.name : "usuário"},
          </h1>
          <p className={styles.dashboardSubtitle}>
            Cadastre e Gerencie seus veículos
          </p>

          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/Inbox.svg"
                  alt="Ícone Total"
                  width={37}
                  height={37}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>Total</h3>
                <p>{stats ? stats.total : "0"}</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/Checkmark.svg"
                  alt="Ícone Ativos"
                  width={37}
                  height={37}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>Ativos</h3>
                <p>{stats ? stats.active : "0"}</p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Image
                  src="/User.svg"
                  alt="Ícone Inativos"
                  width={37}
                  height={37}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>Inativos</h3>
                <p>{stats ? stats.inactive : "0"}</p>
              </div>
            </div>
          </div>

          <button className={styles.openModalBtn} onClick={openModal}>
            <div className={styles.btnIcon}>
              <Image
                src="/circle-plus.svg"
                alt="Ícone de Adicionar"
                width={24}
                height={24}
              />
            </div>
            Cadastrar Veículo
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Veículo</th>
                <th>Placa</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.plate}</td>
                  <td className={styles.statusCell}>
                    <span
                      className={`${styles.status} ${
                        vehicle.status ? styles.active : styles.inactive
                      }`}
                    >
                      <span className={styles.statusIndicator}></span>
                      {vehicle.status ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        title="Editar"
                        onClick={() => setEditingVehicle(vehicle)}
                      >
                        <Image
                          src="/pencil.svg"
                          alt="Editar"
                          width={16}
                          height={16}
                        />
                      </button>

                      <button
                        className={styles.actionBtn}
                        title={vehicle.status ? "Arquivar" : "Desarquivar"}
                        onClick={() => handleToggleStatus(vehicle)}
                      >
                        <Image
                          src={"archive.svg"}
                          alt={vehicle.status ? "Arquivar" : "Desarquivar"}
                          width={16}
                          height={16}
                        />
                      </button>

                      <button
                        className={styles.actionBtn}
                        title="Excluir"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
                        <Image
                          src="/trash-2.svg"
                          alt="Excluir"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de Criação */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Cadastrar Novo Veículo"
        onSubmit={handleCreateVehicle}
      >
        <label htmlFor="vehicleName">Nome do Veículo:</label>
        <input
          type="text"
          id="vehicleName"
          placeholder="Digite o nome do veículo"
          value={newVehicle.name}
          onChange={(e) =>
            setNewVehicle((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <label htmlFor="vehiclePlate">Placa do Veículo:</label>
        <input
          type="text"
          id="vehiclePlate"
          placeholder="Digite a placa do veículo"
          value={newVehicle.plate}
          onChange={(e) =>
            setNewVehicle((prev) => ({ ...prev, plate: e.target.value }))
          }
        />
      </Modal>

      {/* Modal de Edição */}
      <Modal
        isOpen={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
        title="Editar Veículo"
        onSubmit={handleEditVehicle}
      >
        {editingVehicle && (
          <>
            <label htmlFor="editName">Nome do Veículo:</label>
            <input
              type="text"
              id="editName"
              value={editingVehicle.name}
              onChange={(e) =>
                setEditingVehicle({ ...editingVehicle, name: e.target.value })
              }
            />

            <label htmlFor="editPlate">Placa do Veículo:</label>
            <input
              type="text"
              id="editPlate"
              value={editingVehicle.plate}
              onChange={(e) =>
                setEditingVehicle({ ...editingVehicle, plate: e.target.value })
              }
            />
          </>
        )}
      </Modal>
    </div>
  );
}