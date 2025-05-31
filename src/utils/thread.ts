// utils/thread.ts
export const getThreadId = () => sessionStorage.getItem("langgraph-thread-id");

export const setThreadId = (id: string) => {
  sessionStorage.setItem("langgraph-thread-id", id);
};
