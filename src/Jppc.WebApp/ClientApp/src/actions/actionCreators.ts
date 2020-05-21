import { Action } from 'redux';

export interface IAction<TType> extends Action {
  type: TType;
}

export interface IPayloadedAction<TType, TPayload> extends Action {
  type: TType;
  payload: TPayload;
}

export function createAction<TAction extends IAction<TAction['type']>> (
  type: TAction['type']
): () => IAction<TAction['type']> {
  return () => ({
    type
  });
}

export function createPayloadedAction<TAction extends IPayloadedAction<TAction['type'], TAction['payload']>> (
  type: TAction['type']
): (
  payload: TAction['payload']
) => IPayloadedAction<TAction['type'], TAction['payload']> {
  return (payload: TAction['payload']) => ({
    type,
    payload
  });
}
