export const getPaginationInfo = (page: number, limit: number, count: number) => {
    return {
        page: +page,
        limit: +limit,
        totalCount: count,
        totalPages: Math.ceil(count / limit),
    };
};