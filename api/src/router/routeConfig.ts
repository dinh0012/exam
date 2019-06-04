export type Method = "get" | "post" | "put" | "delete"

interface RouteConfig {
    method: Method;
    path: string;
    actionController: string;
}

export const routes: RouteConfig[] = [
    {
        actionController: "IndexController@index",
        method: "get",
        path: "/",
    },
    {
        actionController: "IndexController@helloWorld",
        method: "get",
        path: "/hello",
    },
];
