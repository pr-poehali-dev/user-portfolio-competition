import { useState } from "react";
import { ContestFormData, JurySelectionMode } from "@/types/contest";

const initialFormData: ContestFormData = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  evaluationDeadline: "",
  maxFileSize: 10,
  allowedFormats: ["JPG", "PNG", "PDF", "DOC", "DOCX", "PPTX"],
  videoLinkAllowed: true,
  paymentReceiptRequired: true,
  isPublic: true,
  targetAudience: "all",
};

export const useContestForm = () => {
  const [formData, setFormData] = useState<ContestFormData>(initialFormData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [juryEmails, setJuryEmails] = useState<string[]>(["", "", ""]);
  const [selectedJury, setSelectedJury] = useState<string[]>([]);
  const [jurySelectionMode, setJurySelectionMode] =
    useState<JurySelectionMode>("select");

  const updateFormData = (updates: Partial<ContestFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Введите название конкурса";
    if (!formData.description.trim()) return "Введите описание конкурса";
    if (!formData.startDate || !formData.endDate)
      return "Укажите даты начала и окончания конкурса";
    if (!formData.evaluationDeadline) return "Укажите дедлайн оценки для жюри";

    // Проверка логики дат
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const evalDeadline = new Date(formData.evaluationDeadline);

    if (startDate >= endDate)
      return "Дата окончания должна быть после даты начала";
    if (evalDeadline <= endDate)
      return "Дедлайн оценки должен быть после окончания конкурса";

    if (selectedFiles.length === 0) return "Загрузите положение о конкурсе";

    // Жюри теперь необязательно при создании конкурса
    // if (jurySelectionMode === "select") {
    //   if (selectedJury.length < 3) return "Выберите минимум 3 членов жюри";
    // } else {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   const validJuryEmails = juryEmails.filter(
    //     (email) => email.trim() && emailRegex.test(email.trim()),
    //   );
    //   if (validJuryEmails.length < 3)
    //     return "Добавьте минимум 3 корректных email адреса жюри";
    // }

    return null;
  };

  return {
    formData,
    updateFormData,
    selectedFiles,
    setSelectedFiles,
    juryEmails,
    setJuryEmails,
    selectedJury,
    setSelectedJury,
    jurySelectionMode,
    setJurySelectionMode,
    validateForm,
  };
};
