const server = async (_request: Request): Promise<Response> => {
  return await new Response("oh hi", { status: 200 });
};

export default server;
