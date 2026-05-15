import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}!`,
      };
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
