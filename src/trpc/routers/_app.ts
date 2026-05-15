import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  health: baseProcedure.query(async () => {
    return { status: "ok" };
  }),
});

export type AppRouter = typeof appRouter;

// import { createTRPCRouter } from '../init';
// import { billingRouter } from './billing';
// import { generationsRouter } from './generations';
// import { voicesRouter } from './voices';
// export const appRouter = createTRPCRouter({
//   voices: voicesRouter,
//   generations: generationsRouter,
//   billing: billingRouter,
// });
// // export type definition of API
// export type AppRouter = typeof appRouter;
