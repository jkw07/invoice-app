export function useClientsActions() {
    const handleEdit = (id: number) => {
  console.log(id);
};

const handleDelete = (id: number) => {
  console.log(id);
};
    return {handleEdit, handleDelete}
}