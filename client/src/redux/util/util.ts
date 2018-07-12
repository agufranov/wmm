export interface FetchState<TData> { loading: boolean, data: TData }
export type InferPayloadType<TState> = TState extends FetchState<infer T> ? T : null
