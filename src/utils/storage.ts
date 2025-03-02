/* import { Invoice } from "../types.ts/invoice";

const isElectron = window && (window as any).electron;

async function saveInvoiceToDatabase(invoice: Invoice) {
  if (!isElectron) return;
  await (window as any).electron.invoke("saveInvoice", invoice);
}

async function getInvoicesFromDatabase(): Promise<Invoice[]> {
  if (!isElectron) return [];
  return await (window as any).electron.invoke("getInvoices");
}

function saveInvoiceToLocalStorage(invoice: Invoice) {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

function getInvoicesFromLocalStorage(): Invoice[] {
  return JSON.parse(localStorage.getItem("invoices") || "[]");
}

export const saveInvoice = isElectron ? saveInvoiceToDatabase : saveInvoiceToLocalStorage;
export const getInvoices = isElectron ? getInvoicesFromDatabase : getInvoicesFromLocalStorage;
 */