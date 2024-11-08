
export function useNavbar() {
  const navbarItems = [
    {
      label: "Overview",
      name: '/Despesas/overview'    
    },
    {
      label: "Despesas",
      name: '/Despesas/lista'    
    },
    {
      label: "Config",
      name: '/Despesas/config'    
    }
  ];

  return {
    navbarItems,
  };
}
