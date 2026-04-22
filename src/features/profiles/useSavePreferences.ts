import { QUERY_KEYS } from '@/lib/queryKeys';
import { saveUserPreferences } from '@/services/apiProfiles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useSavePreferences() {
  const queryClient = useQueryClient();

  const {
    isPending: isSavingPreferences,
    mutate: savePreferences,
    error: savePreferencesError,
  } = useMutation({
    mutationFn: saveUserPreferences,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      toast.success('Preferences successfully saved');
    },

    onError: (error) => toast.error(error.message),
  });

  return { isSavingPreferences, savePreferences, savePreferencesError };
}
