import { IsMongoId } from "class-validator";

// Dto usado para mandar un id de un rol en un body, para que luego pueda ser removido de un usuario
export class RoleIdDto {
    @IsMongoId()
    role_id: string;
};