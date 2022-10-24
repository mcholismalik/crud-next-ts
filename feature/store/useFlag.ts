import create from 'zustand';

interface IFlag {
  isError: boolean;
  token: string;
  isTokenExpired: boolean;
  isOpenAuthDialog: boolean;
  setIsError: (isError: boolean) => void;
  setToken: (token: string) => void;
  setIsTokenExpired: (isTokenExpired: boolean) => void;
  setIsOpenAuthDialog: (isOpenAuthDialog: boolean) => void;
}

export const useFlagStore = create<IFlag>((set) => ({
  isError: false,
  token: '',
  isTokenExpired: false,
  isOpenAuthDialog: false,
  setIsError: (isError: boolean) => {
    set((state) => ({
      isError
    }));
  },
  setToken: (token: string) => {
    set((state) => ({
      token
    }));
  },
  setIsTokenExpired: (isTokenExpired: boolean) => {
    set((state) => ({
      isTokenExpired
    }));
  },
  setIsOpenAuthDialog: (isOpenAuthDialog: boolean) => {
    set((state) => ({
      isOpenAuthDialog
    }));
  }
}));
