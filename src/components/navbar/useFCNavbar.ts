
export type PageItems = {
  label: string
  name: string
}

export function useNavbar(pageItems: PageItems[]) {
  return {
    pageItems,
  };
}
