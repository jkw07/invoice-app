export {};

declare global {
  interface Window {
    api: {
       getClients: () => Promise<unknown[]>;
      createClient: (
        name: string,
        address: string,
        email: string,
        phone: string,
        id: number
      ) => void;
    };
  }
}

//declare module "better-sqlite3";
