import { Enterprise } from '../../entities/enterprise';

export interface IEnterpriseData {
    id?: number;
    slug: string;
    cnpj?: string | null;
    cpf?: string | null;
    address?: string | null;
    organization_id: number;
    created_at?: Date;
    updated_at?: Date | null;
}

export interface IEnterpriseRepository {
    findById(id: number): Promise<Enterprise | null>;
    findBySlug(slug: string): Promise<Enterprise | null>;
    findByCnpj(cnpj: string): Promise<Enterprise | null>;
    findByCpf(cpf: string): Promise<Enterprise | null>;
    create(enterpriseData: IEnterpriseData): Promise<Enterprise>;
    update(enterpriseData: IEnterpriseData): Promise<Enterprise>;
    inactivate(id: number): Promise<void>;
}