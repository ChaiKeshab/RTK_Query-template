import apiSlice from "./apiSlice";

export interface UserData {
    roles: {
        [role: string]: number;
    };
    _id: string;
    username: string;
    password: string;
    refreshToken: string[];
    __v: number;
}

type GetUsersReturn = UserData[];

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<GetUsersReturn, void>({
            query: () => '/users',
            keepUnusedDataFor: 5,
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice
