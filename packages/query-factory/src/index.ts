import { QueryClient } from "@tanstack/react-query";
import { createQueryFactory } from "./create-query-factory";

export { createQueryFactory } from "./create-query-factory";

const createQuery = createQueryFactory(new QueryClient());

const useTestQuery = createQuery({
  queryKey: (params: { params: { id: string } }) => ["test", params.params.id],
  queryFn: ({ params }) => {
    return {
      data: "hello",
      testing: "fdskljf",
    };
  },
});

useTestQuery({
  params: { params: { id: "24" } },
  initialData: {
    data: "fdasf",
    testing: "fdasf",
  },
});

const { data } = useTestQuery({ params: { params: { id: "24" } } });
