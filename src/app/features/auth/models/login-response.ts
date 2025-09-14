import { UserScopeInfo } from "./user-scope-info";

export interface LoginResponse{
    token: string;
    user: UserScopeInfo;
}