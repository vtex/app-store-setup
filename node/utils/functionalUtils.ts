export const pipeP = <A>(...funcs: Array<(arg0: A) => Promise<A>>) => (
  input: A
) => funcs.reduce((chain, func) => chain.then(func), Promise.resolve(input))
