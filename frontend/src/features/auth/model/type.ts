export type Auth = {
    email: string;
    name: string;
    accessToken: string;
    authorities: Authority[]
}

type Authority = {
    authority: string;
}