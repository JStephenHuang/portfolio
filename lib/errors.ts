type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export const isOk = <T, E>(result: Result<T, E>): result is Success<T> => result.error === null;
export const isErr = <T, E>(result: Result<T, E>): result is Failure<E> => result.error !== null;

export const ok = <T, E>(data: T): Result<T, E> => ({ data: data, error: null });
export const err = <T, E>(error: E): Result<T, E> => {
  return { data: null, error };
};
