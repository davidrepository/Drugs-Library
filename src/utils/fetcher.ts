export const fetcher = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const data = await response.json();
      const error = new Error(
        data.error?.message || "An error occurred"
      ) as any;
      error.code = data.error?.code || response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      const newError = new Error(error?.message || "An error occurred") as any;
      newError.code = "CONNECTION_LOST";
      throw newError;
    } else {
      throw error;
    }
  }
};
