import User from "../../entities/user/user.dto";

export interface UserServicePort {
    save(user: User): void;
    
    findAll() : Promise<User[]>;

    getById(id: string): Promise<User>;
    
    update(id: string, user: User): void;

    delete(id: string) : void;
    
    findByEmail(email: string): Promise<User>; 
}