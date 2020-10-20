import { Auth } from './../domain/auth';
import { async } from '@angular/core/testing';
import * as fromAuth from './auth.reducer';
import { reducer } from './auth.reducer';
import * as authActions from '../actions/auth.action';

describe('Test AuthReducer', () => {
  describe('未定义的Action', () => {
    it('应该返回一个默认状态', async () => {
      const action = {} as any;
      const result = reducer(undefined, action);

      expect(result).toEqual(fromAuth.initialState);
    });
  });

  describe('登录成功', () => {
    it('应该返回一个Err为undefined userId 不为空的 Auth 对象', () => {
      const user = { id: '1', email: '123@qq.com' };
      const result = reducer(
        undefined,
        authActions.LoginSuccess({
          token: '',
          user,
        })
      ) as Auth;

      expect(result.err).toBeUndefined();
      expect(result.user).toEqual(user);
    });
  });
});
