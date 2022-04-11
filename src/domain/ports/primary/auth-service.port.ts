import User from "../../../domain/entities/user/user.dto";

export interface AuthServicePort {
    validateUser(userEmail: string, userPassword: string): Promise<User>;  
    login(user: any): void;
}