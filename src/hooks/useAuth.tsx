import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserRole =
  | "educator"
  | "teacher"
  | "student"
  | "parent"
  | "jury"
  | "admin";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  emailConfirmed?: boolean;
  adminApproved?: boolean;
  position?: string;
  institution?: string;
  ageOrGrade?: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  confirmEmail: (token: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  getPendingUsers: () => User[];
  approveUser: (userId: string) => Promise<boolean>;
  rejectUser: (userId: string) => Promise<boolean>;
  getAllParticipants: () => User[];
  getAllUsers: () => User[];
  updateUserRole: (userId: string, newRole: UserRole) => Promise<boolean>;
  updateUserProfile: (
    userId: string,
    profileData: Partial<User>,
  ) => Promise<boolean>;
  toggleJuryStatus: (userId: string) => Promise<boolean>;
  deleteUser: (userId: string) => void;
  deleteContest: (contestId: string) => void;
  getJuryUsers: () => User[];
  assignJuryToContest: (
    contestId: number,
    juryIds: string[],
  ) => Promise<boolean>;
  removeJuryFromContest: (
    contestId: number,
    juryId: string,
  ) => Promise<boolean>;
  getContestJury: (contestId: number) => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Встроенный администратор
const ADMIN_CREDENTIALS = {
  email: "aigulrizat@mail.ru",
  password: "shkola098890",
  user: {
    id: "admin-1",
    fullName: "Главный администратор",
    email: "aigulrizat@mail.ru",
    role: "admin" as UserRole,
    emailConfirmed: true,
    adminApproved: true,
  },
};

// Мок данные для демонстрации
const mockUsers: User[] = [
  {
    id: "1",
    fullName: "Иван Петров",
    email: "ivan@example.com",
    role: "teacher",
    emailConfirmed: true,
    adminApproved: true,
    institution: "МБОУ СОШ №15",
  },
  {
    id: "2",
    fullName: "Мария Сидорова",
    email: "maria@example.com",
    role: "educator",
    emailConfirmed: true,
    adminApproved: true,
    institution: "МБДОУ Детский сад №7",
  },
  {
    id: "3",
    fullName: "Анна Иванова",
    email: "anna@example.com",
    role: "student",
    emailConfirmed: true,
    adminApproved: true,
    institution: "МБОУ Гимназия №3",
  },
];

// Список неподтвержденных пользователей
const pendingUsers: User[] = [
  {
    id: "pending-1",
    fullName: "Елена Козлова",
    email: "elena@example.com",
    role: "teacher",
    emailConfirmed: true,
    adminApproved: false,
    institution: "МБОУ СОШ №22",
  },
  {
    id: "pending-2",
    fullName: "Дмитрий Волков",
    email: "dmitry@example.com",
    role: "educator",
    emailConfirmed: true,
    adminApproved: false,
    institution: "МБДОУ Детский сад №12",
  },
  {
    id: "pending-3",
    fullName: "Олег Смирнов",
    email: "oleg@example.com",
    role: "parent",
    emailConfirmed: false,
    adminApproved: false,
    institution: "МБОУ СОШ №8",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Проверка встроенного администратора
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setUser(ADMIN_CREDENTIALS.user);
      localStorage.setItem("user", JSON.stringify(ADMIN_CREDENTIALS.user));
      return true;
    }

    // Проверка остальных пользователей
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      const canLogin = foundUser.emailConfirmed && foundUser.adminApproved;

      if (canLogin) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      }
    }

    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Проверка на существующий email
    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      return false;
    }

    // Создание нового пользователя
    const newUser: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      role: data.role as UserRole,
      emailConfirmed: false,
      adminApproved: false,
    };

    // В реальном проекте здесь будет отправка email
    console.log("Отправка email подтверждения на:", data.email);

    // Добавляем в список ожидающих подтверждения
    pendingUsers.push(newUser);

    return true;
  };

  const confirmEmail = async (token: string): Promise<boolean> => {
    // В реальном проекте здесь будет проверка токена
    console.log("Подтверждение email с токеном:", token);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const getPendingUsers = () => {
    return pendingUsers.filter((user) => !user.adminApproved);
  };

  const approveUser = async (userId: string): Promise<boolean> => {
    const userIndex = pendingUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      const user = pendingUsers[userIndex];
      user.adminApproved = true;
      user.emailConfirmed = true;

      // Перемещаем в основной список пользователей
      mockUsers.push(user);
      pendingUsers.splice(userIndex, 1);

      return true;
    }
    return false;
  };

  const rejectUser = async (userId: string): Promise<boolean> => {
    const userIndex = pendingUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      pendingUsers.splice(userIndex, 1);
      return true;
    }
    return false;
  };

  const deleteUser = (userId: string) => {
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1);
    }

    const pendingIndex = pendingUsers.findIndex((u) => u.id === userId);
    if (pendingIndex !== -1) {
      pendingUsers.splice(pendingIndex, 1);
    }
  };

  const deleteContest = (contestId: string) => {
    // Implementation for deleting contest
    console.log("Deleting contest:", contestId);
  };

  const getJuryUsers = (): User[] => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    return users.filter((user) => user.role === "jury" && user.adminApproved);
  };

  // Добавляем функции для работы с конкурсами
  const createContest = (contestData: any): boolean => {
    try {
      const contests = JSON.parse(localStorage.getItem("contests") || "[]");
      const newContest = {
        ...contestData,
        id: Date.now(),
        participants: 0,
        totalWorks: 0,
        evaluatedWorks: 0,
      };
      contests.push(newContest);
      localStorage.setItem("contests", JSON.stringify(contests));
      return true;
    } catch (error) {
      console.error("Ошибка создания конкурса:", error);
      return false;
    }
  };

  const getContests = () => {
    return JSON.parse(localStorage.getItem("contests") || "[]");
  };

  const assignJuryToContest = async (
    contestId: number,
    juryIds: string[],
  ): Promise<boolean> => {
    try {
      const contestJury = JSON.parse(
        localStorage.getItem("contestJury") || "{}",
      );
      contestJury[contestId] = juryIds;
      localStorage.setItem("contestJury", JSON.stringify(contestJury));
      return true;
    } catch (error) {
      console.error("Ошибка назначения жюри:", error);
      return false;
    }
  };

  const removeJuryFromContest = async (
    contestId: number,
    juryId: string,
  ): Promise<boolean> => {
    try {
      const contestJury = JSON.parse(
        localStorage.getItem("contestJury") || "{}",
      );
      if (contestJury[contestId]) {
        contestJury[contestId] = contestJury[contestId].filter(
          (id: string) => id !== juryId,
        );
        localStorage.setItem("contestJury", JSON.stringify(contestJury));
      }
      return true;
    } catch (error) {
      console.error("Ошибка удаления жюри:", error);
      return false;
    }
  };

  const getContestJury = (contestId: number): User[] => {
    const contestJury = JSON.parse(localStorage.getItem("contestJury") || "{}");
    const juryIds = contestJury[contestId] || [];
    return mockUsers.filter((user) => juryIds.includes(user.id));
  };

  const getAllUsers = () => {
    return [...mockUsers, ...pendingUsers];
  };

  const updateUserRole = async (
    userId: string,
    newRole: UserRole,
  ): Promise<boolean> => {
    const userInMock = mockUsers.find((u) => u.id === userId);
    const userInPending = pendingUsers.find((u) => u.id === userId);

    if (userInMock) {
      userInMock.role = newRole;
      return true;
    }

    if (userInPending) {
      userInPending.role = newRole;
      return true;
    }

    return false;
  };

  const updateUserProfile = async (
    userId: string,
    profileData: Partial<User>,
  ): Promise<boolean> => {
    const userInMock = mockUsers.find((u) => u.id === userId);
    const userInPending = pendingUsers.find((u) => u.id === userId);

    if (userInMock) {
      Object.assign(userInMock, profileData);
      return true;
    }

    if (userInPending) {
      Object.assign(userInPending, profileData);
      return true;
    }

    return false;
  };

  const toggleJuryStatus = async (userId: string): Promise<boolean> => {
    const user =
      mockUsers.find((u) => u.id === userId) ||
      pendingUsers.find((u) => u.id === userId);

    if (user) {
      // Если пользователь уже жюри, убираем статус
      if (user.role === "jury") {
        // Возвращаем к предыдущей роли (по умолчанию teacher)
        user.role = user.position?.includes("воспитатель")
          ? "educator"
          : "teacher";
      } else {
        // Назначаем жюри
        user.role = "jury";
      }
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        confirmEmail,
        logout,
        isAuthenticated: !!user,
        getPendingUsers,
        approveUser,
        rejectUser,
        getAllParticipants: () => [
          ...mockUsers,
          ...pendingUsers,
          ADMIN_CREDENTIALS.user,
        ],
        getAllUsers,
        updateUserRole,
        updateUserProfile,
        toggleJuryStatus,
        deleteUser,
        deleteContest,
        getJuryUsers,
        assignJuryToContest,
        removeJuryFromContest,
        getContestJury,
        createContest,
        getContests,
        createContest,
        getContests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
