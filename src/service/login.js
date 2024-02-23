import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const UseCreateLoginAuthentication = (mutationConfig) => {
  const queryClient = useQueryClient();

  return useMutation(
    (dto) => axios.post(dto, "http://localhost:1337/api/auth/local"),
    {
      ...(mutationConfig ?? {}),
      onSuccess: (response, request, context) => {
        if (response.status === 201) {
          localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
          window.location.reload();
          queryClient.setQueryData("user", response.data);
        }

        mutationConfig?.onSuccess?.(response, request, context);
      },
    }
  );
};
