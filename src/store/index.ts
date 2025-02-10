import { configureStore } from '@reduxjs/toolkit';

//apis
import { authApi } from './apis/authApi';
import { userApi } from './apis/userApi';
import { purchaseAPI } from '@/pages/mortgage/apis/purchaseAPI';
import { refinanceAPI } from '@/pages/mortgage/apis/refinanceAPI';
import { onboardAPI } from '@/pages/onboarding/api/onboardAPI';
import { coreAPI } from '@/store/apis/coreApi';
import { lodgeReturnAPI } from '@/pages/tax/apis/lodgeReturnAPI';
//slices
import auth from './slices/auth/authSlice';
import common from './slices/common/commonSlice';
import { profileAPI } from '@/pages/profile/api/profileAPI';
import { dashboardAPI } from './apis/dashboardApi';
import { dealAPI } from '@/pages/mortgage/apis/dealAPI';
import { ragAPI } from './apis/ragAPI';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [purchaseAPI.reducerPath]: purchaseAPI.reducer,
    [refinanceAPI.reducerPath]: refinanceAPI.reducer,
    [onboardAPI.reducerPath]: onboardAPI.reducer,
    [lodgeReturnAPI.reducerPath]: lodgeReturnAPI.reducer,
    [coreAPI.reducerPath]: coreAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [dealAPI.reducerPath]: dealAPI.reducer,
    [ragAPI.reducerPath]:ragAPI.reducer,
    auth: auth,
    common: common,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      purchaseAPI.middleware,
      refinanceAPI.middleware,
      onboardAPI.middleware,
      lodgeReturnAPI.middleware,
      coreAPI.middleware,
      profileAPI.middleware,
      dashboardAPI.middleware,
      dealAPI.middleware,
      ragAPI.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
