export interface CasMapper<M,C> {
    fromDomain(data:M):C;
    toDomain(user:C):M;
}