import User from "../../entities/user/user.dto";

export interface UserRepositoryPort {
    save(user: User): Promise<User>;
    
    findAll() : Promise<User[]>;

    findById(id: string): Promise<User>;
    
    update(id: string, user: User): void;

    delete(id: string) : void;
    
    findByEmail(email: string): Promise<User>; 
}