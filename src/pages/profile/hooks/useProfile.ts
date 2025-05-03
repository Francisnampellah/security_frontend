import { useQuery } from '@tanstack/react-query';

interface Profile {
  id: number;
  email: string;
  name: string;
  role: string;
}

export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return {
        id: 2,
        email: "Bnampellah1@gmail.com",
        name: "Nampellah",
        role: "PHARMACIST"
      };
    }
  });
}; 